import { Component, OnInit } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { Router } from '@angular/router';
import {
  SubscriptionService,
  SubscriptionPlanDto
} from '../service/subscription.service';

interface SummaryCard {
  title: string;
  icon: string;
  value: string | number;
  change: string;
  trendType: 'up' | 'down' | 'flat';
}

@Component({
  selector: 'app-subscriptionmanagement',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './subscriptionmanagement.component.html',
  styleUrl: './subscriptionmanagement.component.css'
})
export class SubscriptionmanagementComponent implements OnInit {
  subscriptionPlans: SubscriptionPlanDto[] = [];
  loading = false;

  filters = {
    dateRange: 'Last 30 days',
    planType: 'All plan types',
    status: 'All statuses'
  };

  currentPage = 1;
  pageSize = 10;
  totalPages = 1;

  summaryCards: SummaryCard[] = [
    { title: 'Total Plans',  icon: 'view_module',   value: 0, change: '', trendType: 'flat' },
    { title: 'Active Plans', icon: 'check_circle',  value: 0, change: '', trendType: 'flat' },
    { title: 'Trial Plans',  icon: 'hourglass_top', value: 0, change: '', trendType: 'flat' },
    { title: 'Paid Plans',   icon: 'payments',      value: 0, change: '', trendType: 'flat' }
  ];

  constructor(
    private router: Router,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadSubPlans();
  }

  get pagedPlans(): SubscriptionPlanDto[] {
    const start = (this.currentPage - 1) * this.pageSize;
    return this.subscriptionPlans.slice(start, start + this.pageSize);
  }

  loadSubPlans(): void {
    this.loading = true;
    this.subscriptionService.getPlans().subscribe({
      next: res => {
        this.subscriptionPlans = res || [];
        this.totalPages = Math.max(1, Math.ceil(this.subscriptionPlans.length / this.pageSize));
        this.updateSummaryCards();
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  private updateSummaryCards(): void {
    const total = this.subscriptionPlans.length;
    const active = this.subscriptionPlans.filter(p => p.isActive).length;

    this.summaryCards[0].value = total;
    this.summaryCards[1].value = active;
    this.summaryCards[2].value = 0;   // you can compute real trial count later
    this.summaryCards[3].value = total; // treat all as paid for now
  }

  getPlanType(plan: SubscriptionPlanDto): 'PAID' | 'TRIAL' {
    // if later you store type in DB, just return plan.type
    return 'PAID';
  }

  formatPrice(value: number): string {
    return `₹${value.toLocaleString('en-IN')}`;
  }

  formatDate(value?: string): string {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  onEditPlan(plan: SubscriptionPlanDto): void {
    if (!plan._id) return;
    this.router.navigate(['/superadmin/addsubscriptionmanagement', plan._id]);
  }

  onMore(plan: SubscriptionPlanDto): void {
    console.log('More actions clicked', plan);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }


  getStartIndex(): number {
  if (!this.subscriptionPlans.length) return 0;
  return (this.currentPage - 1) * this.pageSize + 1;
}

getEndIndex(): number {
  if (!this.subscriptionPlans.length) return 0;
  const end = this.currentPage * this.pageSize;
  return end > this.subscriptionPlans.length
    ? this.subscriptionPlans.length
    : end;
}

}
