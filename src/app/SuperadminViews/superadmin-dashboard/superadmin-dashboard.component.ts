import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface TenantRow {
  name: string;
  admin: string;
  plan: string;
  users: number;
  expiry: string;
  status: 'Active' | 'Expired';
}

interface PaymentRow {
  tenant: string;
  plan: string;
  amount: number;
  date: string;
  status: 'Success' | 'Pending' | 'Failed';
}

interface TicketRow {
  id: string;
  tenant: string;
  subject: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Closed' | 'In Progress';
  created: string;
}

@Component({
  selector: 'app-superadmin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './superadmin-dashboard.component.html',
  styleUrls: ['./superadmin-dashboard.component.css']
})
export class SuperadminDashboardComponent {
  stats = [
    {
      title: 'Total Tenants',
      value: '1,284',
      icon: 'apartment',
      trend: '+12% vs last month',
      trendType: 'up' as const
    },
    {
      title: 'Active Tenants',
      value: '1,202',
      icon: 'check_circle',
      trend: '93.6% retention',
      trendType: 'neutral' as const
    },
    {
      title: 'Expired Subscriptions',
      value: '42',
      icon: 'error',
      trend: '+5 from yesterday',
      trendType: 'down' as const
    },
    {
      title: 'Total Platform Users',
      value: '85.4k',
      icon: 'group',
      trend: '+2.4k new',
      trendType: 'up' as const
    },
    {
      title: 'Revenue This Month',
      value: '$142.8k',
      icon: 'payments',
      trend: '+8.2% monthly',
      trendType: 'up' as const
    }
  ];

  

  recentTenants: TenantRow[] = [
    {
      name: 'Acme Corp',
      admin: 'john.doe@acme.com',
      plan: 'Enterprise',
      users: 452,
      expiry: 'Dec 12, 2024',
      status: 'Active'
    },
    {
      name: 'Starlight Inc',
      admin: 'sarah@starlight.io',
      plan: 'Business',
      users: 128,
      expiry: 'Jan 05, 2025',
      status: 'Active'
    },
    {
      name: 'Nexus Devs',
      admin: 'devops@nexus.com',
      plan: 'Growth',
      users: 24,
      expiry: 'Oct 20, 2023',
      status: 'Expired'
    }
  ];

  recentPayments: PaymentRow[] = [
    {
      tenant: 'Velocity Solutions',
      plan: 'Enterprise',
      amount: 1499,
      date: 'Nov 01, 2023',
      status: 'Success'
    },
    {
      tenant: 'EcoSystem Hub',
      plan: 'Business',
      amount: 499,
      date: 'Oct 31, 2023',
      status: 'Pending'
    }
  ];

  recentTickets: TicketRow[] = [
    {
      id: 'T-8942',
      tenant: 'Cloud Nine',
      subject: 'Login issues on mobile',
      priority: 'High',
      status: 'Open',
      created: '2h ago'
    },
    {
      id: 'T-8939',
      tenant: 'ByteSize',
      subject: 'Billing query for Q4',
      priority: 'Low',
      status: 'Closed',
      created: 'Yesterday'
    }
  ];
}
