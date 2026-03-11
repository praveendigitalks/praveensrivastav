import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  SubscriptionService,
  SubscriptionPlanDto
} from '../../../SuperadminViews/subscription management/service/subscription.service';

@Component({
  selector: 'app-subscriptionplans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscriptionplans.component.html',
  styleUrl: './subscriptionplans.component.css'
})
export class SubscriptionplansComponent implements OnInit {
  showCheckout = false;
  selectedPlanName = '';
  selectedPlanPrice = '';
  selectedPlanAmount = 0;

  subscriptionPlans: SubscriptionPlanDto[] = [];
  loading = false;

  payMethod: 'card' | 'upi' = 'card';

  card = {
    number: '',
    exp: '',
    cvc: '',
    country: 'India'
  };

  upiId = '';

  constructor(private subscriptionService: SubscriptionService) {}

  ngOnInit(): void {
    this.loadSubPlans();
  }

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

  openCheckout(plan: SubscriptionPlanDto): void {
    this.selectedPlanName = plan.name;
    this.selectedPlanAmount = plan.price;
    this.selectedPlanPrice = this.formatPrice(plan.price);
    this.showCheckout = true;
    this.payMethod = 'card';
  }

  closeCheckout(): void {
    this.showCheckout = false;
  }

  formatCardNumber(): void {
    this.card.number = this.card.number
      .replace(/[^\d]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  formatExp(): void {
    this.card.exp = this.card.exp
      .replace(/[^\d]/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, (_, m, y) => (y ? `${m}/${y}` : m));
  }

  payNow(): void {
    if (!this.selectedPlanName) return;

    console.log('Demo pay:', {
      plan: this.selectedPlanName,
      label: this.selectedPlanPrice,
      amount: this.selectedPlanAmount,
      method: this.payMethod,
      card: this.card,
      upiId: this.upiId
    });

    alert(
      `Demo payment\nPlan: ${this.selectedPlanName}\nAmount: ${this.selectedPlanPrice}\nMethod: ${this.payMethod.toUpperCase()}`
    );

    this.closeCheckout();
  }
}
