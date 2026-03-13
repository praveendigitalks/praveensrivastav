// src/app/FrontViews/subscriptionplans/subscriptionplans.component.ts
import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  NgZone,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  SubscriptionService,
  SubscriptionPlanDto
} from '../../../SuperadminViews/subscription management/service/subscription.service';
import {
  PaymentserviceService,
  CreatePaymentIntentRequest
} from '../service/paymentservice.service';
import { TenantService } from '../../../SuperadminViews/tenants/tenantService/tenant.service';
import { AuthService } from '../../../authentication/authservice/auth.service';

declare const Stripe: any;

interface TenantResponse {
  _id: string;
  tenantName: string;
  subscription?: {
    status: 'ACTIVE' | 'INACTIVE' | 'EXPIRED' | string;
    expiresAt?: string;
    planId?: SubscriptionPlanDto | string;
  };
}

@Component({
  selector: 'app-subscriptionplans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscriptionplans.component.html',
  styleUrl: './subscriptionplans.component.css'
})
export class SubscriptionplansComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  // UI state
  showCheckout = false;
  loading = false;

  // plans list (when no active subscription)
  subscriptionPlans: SubscriptionPlanDto[] = [];

  // selected plan for checkout
  selectedPlanName = '';
  selectedPlanPrice = '';
  selectedPlanAmount = 0;
  selectedPlanId: string | null = null;

  // active plan (for already-subscribed tenant)
  activePlan: SubscriptionPlanDto | null = null;
  subscriptionExpiresAt: string | null = null;

  // payment state
  payMethod: 'card' | 'upi' = 'card';
  upiId = '';
  showPaymentVideo = false;
  paymentVideoTimer: any;

  @ViewChild('paymentVideo') paymentVideoRef!: ElementRef<HTMLVideoElement>;

  private stripe: any;
  private cardElement: any;
  cardErrors = '';
  isPaying = false;

  currentTenantId: string | null = null;

  constructor(
    private subscriptionService: SubscriptionService,
    private paymentService: PaymentserviceService,
    private router: Router,
    private ngZone: NgZone,
    private tenantService: TenantService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.currentTenantId = this.authService.gettenantuserId();
    if (this.currentTenantId) {
      this.loadTenantAndSubscription();
    } else {
      this.loadSubPlans();
    }
  }

  ngAfterViewInit(): void {
    this.initStripe();
  }

  // 1) Get tenant by id and decide what to show
  private loadTenantAndSubscription(): void {
    this.loading = true;
    this.tenantService
      .getTenantbyID(this.currentTenantId as string)
      .subscribe({
        next: (tenant: TenantResponse) => {
          this.loading = false;

          const sub = tenant.subscription;
          if (
            sub &&
            sub.status === 'ACTIVE' &&
            sub.planId &&
            typeof sub.planId === 'object'
          ) {
            // tenant already purchased a plan
            this.activePlan = sub.planId as SubscriptionPlanDto;
            this.subscriptionExpiresAt = sub.expiresAt || null;
          } else {
            // no active subscription -> show all plans
            this.loadSubPlans();
          }
        },
        error: () => {
          this.loading = false;
          this.loadSubPlans();
        }
      });
  }

  // 2) Normal plans list when no active subscription
  loadSubPlans(): void {
    this.loading = true;
    this.subscriptionService.getPlans().subscribe({
      next: res => {
        this.subscriptionPlans = res || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  // Stripe init
  private initStripe(): void {
    if ((window as any).Stripe) {
      this.setupStripeInstance();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/';
    script.async = true;
    script.onload = () => {
      this.setupStripeInstance();
    };
    document.body.appendChild(script);
  }

  private setupStripeInstance(): void {
    if (this.stripe) return;

    this.stripe = Stripe(
      'pk_test_51TA3AnANNBMes7TuVCw4pief58jYTfpMfTxN3YCj5E3tnYds3XNCeMwCRsMus3Q04zgGHFwR9z5XS6HXTpZZCN3o00jxFwLTOs'
    );

    const elements = this.stripe.elements();

    this.cardElement = elements.create('card', {
      hidePostalCode: true,
      style: {
        base: {
          color: '#32325d',
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSmoothing: 'antialiased',
          fontSize: '16px',
          '::placeholder': {
            color: '#a0aec0'
          }
        },
        invalid: {
          color: '#e53e3e',
          iconColor: '#e53e3e'
        }
      }
    });

    const cardMount = document.getElementById('card-element');
    if (cardMount) {
      this.cardElement.mount(cardMount);
    }

    this.cardElement.on('change', (event: any) => {
      this.ngZone.run(() => {
        this.cardErrors = event.error ? event.error.message : '';
      });
    });
  }

  formatPrice(value: number): string {
    return `₹${value.toLocaleString('en-IN')}`;
  }

  getModuleNames(plan: SubscriptionPlanDto): string {
    const names =
      (plan.modulePermissions || [])
        .filter(mp => (mp.actions || []).length > 0)
        .map(mp => mp.module) || [];
    return names.join(', ');
  }

  getDeliveryText(plan: SubscriptionPlanDto): string {
    return `1–2 days from payment approval (up to ${plan.userLimit} users)`;
  }

  // Only allow checkout when there is no activePlan
  openCheckout(plan: SubscriptionPlanDto): void {
    if (this.activePlan) {
      return;
    }

    this.selectedPlanId = plan._id as string;
    this.selectedPlanName = plan.name;
    this.selectedPlanAmount = plan.price;
    this.selectedPlanPrice = this.formatPrice(plan.price);
    this.showCheckout = true;
    this.payMethod = 'card';

    setTimeout(() => {
      if (this.cardElement && document.getElementById('card-element')) {
        try {
          this.cardElement.mount('#card-element');
        } catch {
          // ignore if already mounted
        }
      }
    });
  }

  closeCheckout(): void {
    this.showCheckout = false;
    this.cardErrors = '';
    this.upiId = '';
  }

  payNow(): void {
    console.log(
      'payNow clicked, selectedPlanName=',
      this.selectedPlanName,
      'amount=',
      this.selectedPlanAmount,
      'isPaying=',
      this.isPaying,
      'payMethod=',
      this.payMethod
    );

    if (!this.selectedPlanName || !this.selectedPlanId || this.isPaying) {
      console.log('payNow aborted: no plan or already paying');
      return;
    }

    if (!this.stripe || !this.cardElement) {
      this.cardErrors = 'Payment form not ready. Please try again.';
      console.log('Stripe or cardElement not ready');
      return;
    }

    if (!this.currentTenantId) {
      this.cardErrors = 'Tenant not found. Please login again.';
      return;
    }

    this.isPaying = true;
    this.cardErrors = '';
    this.showPaymentVideo = false; // start as false

    const payload: CreatePaymentIntentRequest = {
      amount: this.selectedPlanAmount * 100,
      currency: 'inr'
    };
    console.log('creating PaymentIntent with payload', payload);

    this.paymentService.createPaymentIntent(payload).subscribe({
      next: (resp: any) => {
        console.log('paymentIntent resp', resp);

        const clientSecret = resp.clientSecret || resp.client_secret;
        if (!clientSecret) {
          this.cardErrors = 'Unable to start payment.';
          this.isPaying = false;
          return;
        }

        this.stripe
          .confirmCardPayment(clientSecret, {
            payment_method: {
              card: this.cardElement,
              billing_details: {}
            }
          })
          .then((result: any) => {
            console.log('confirmCardPayment result', result);

            if (result.error) {
              this.cardErrors =
                result.error.message ||
                'Payment failed. Please use a Stripe test card.';
              this.isPaying = false;
              this.showPaymentVideo = false;
              return;
            }

            const pi = result.paymentIntent;
            if (pi && pi.status === 'succeeded') {
              const paymentIntentId = pi.id as string;

              const body = {
                tenantId: this.currentTenantId, // tenant _id
                planId: this.selectedPlanId,
                paymentIntentId
              };

              this.tenantService.activateplan(body).subscribe({
                next: res => {
                  console.log('activateplan resp', res);
                  this.closeCheckout();
                  this.handleRealSuccess(paymentIntentId);

                  // refresh tenant details to show active plan
                  if (this.currentTenantId) {
                    this.loadTenantAndSubscription();
                  }
                },
                error: err => {
                  console.error('activateplan error', err);
                  this.cardErrors =
                    'Payment succeeded but subscription activation failed.';
                  this.isPaying = false;
                  this.showPaymentVideo = false;
                }
              });
            } else {
              this.cardErrors = 'Payment not completed.';
              this.isPaying = false;
              this.showPaymentVideo = false;
            }
          })
          .catch((err: any) => {
            console.error('confirmCardPayment error', err);
            this.cardErrors = err?.message || 'Unexpected error.';
            this.isPaying = false;
            this.showPaymentVideo = false;
          });
      },
      error: err => {
        console.error('createPaymentIntent error', err);
        this.cardErrors = err?.message || 'Unable to start payment.';
        this.isPaying = false;
        this.showPaymentVideo = false;
      }
    });
  }

  private handleRealSuccess(paymentIntentId: string): void {
    this.isPaying = false;
    this.showPaymentVideo = true;

    this.paymentVideoTimer = setTimeout(() => {
      this.showPaymentVideo = false;
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.paymentVideoTimer) {
      clearTimeout(this.paymentVideoTimer);
    }
    if (this.cardElement) {
      try {
        this.cardElement.destroy();
      } catch {
        // ignore
      }
    }
  }
}
