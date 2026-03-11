import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
interface BillingRow {
  tenant: string;
  initials: string;
  plan: string;
  cycle: string;
  amount: number;
  lastPayment: string;
  nextDate: string;
  status: 'Paid' | 'Pending' | 'Overdue' | 'Cancelled';
}

@Component({
  selector: 'app-billingfinance',
  imports: [SHARED_IMPORTS],
  templateUrl: './billingfinance.component.html',
  styleUrl: './billingfinance.component.css'
})
export class BillingfinanceComponent {

  summaryCards = [
    {
      title: 'Monthly Revenue',
      value: '₹45,200.00',
      change: '+12.5%',
      trendType: 'up' as const,
      icon: 'credit_card'
    },
    {
      title: 'Pending Payments',
      value: '₹1,240.00',
      change: '-2.1%',
      trendType: 'down' as const,
      icon: 'hourglass_empty'
    },
    {
      title: 'Active Subs',
      value: '1,240',
      change: '+4.3%',
      trendType: 'up' as const,
      icon: 'group'
    },
    {
      title: 'Expired Subs',
      value: '42',
      change: '+0.5%',
      trendType: 'down' as const,
      icon: 'event_busy'
    }
  ];

  filters = {
    dateRange: 'This Month',
    planType: 'All Plans',
    status: 'All Status'
  };

  rows: BillingRow[] = [
    {
      tenant: 'Acme Corp',
      initials: 'AC',
      plan: 'Enterprise',
      cycle: 'Annual',
      amount: 2400,
      lastPayment: 'Oct 12, 2023',
      nextDate: 'Oct 12, 2024',
      status: 'Paid'
    },
    {
      tenant: 'DataSoft Inc',
      initials: 'DS',
      plan: 'Pro',
      cycle: 'Monthly',
      amount: 499,
      lastPayment: 'Nov 15, 2023',
      nextDate: 'Dec 15, 2023',
      status: 'Pending'
    },
    {
      tenant: 'NexLevel',
      initials: 'NL',
      plan: 'Basic',
      cycle: 'Monthly',
      amount: 99,
      lastPayment: 'Oct 05, 2023',
      nextDate: 'Nov 05, 2023',
      status: 'Overdue'
    },
    {
      tenant: 'ZeroTech',
      initials: 'ZT',
      plan: 'Pro',
      cycle: 'Annual',
      amount: 4800,
      lastPayment: 'Sep 20, 2023',
      nextDate: '-',
      status: 'Cancelled'
    }
  ];

  currentPage = 1;
  totalPages = 2;

}
