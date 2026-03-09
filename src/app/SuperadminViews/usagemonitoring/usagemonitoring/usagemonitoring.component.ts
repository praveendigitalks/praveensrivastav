import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SHARED_IMPORTS } from '../../../components/sharedImport';

interface StatCard {
  title: string;
  value: string;
  change: string;
  trendType: 'up' | 'down' | 'neutral';
  icon: string;
}

interface DayUsage {
  label: string;
  value: number;
  isToday?: boolean;
}

@Component({
  selector: 'app-usagemonitoring',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './usagemonitoring.component.html',
  styleUrls: ['./usagemonitoring.component.css']
})
export class UsagemonitoringComponent {
  quickFilterTenant = 'All Tenants';
  quickFilterRange = 'Last 24h';

  statCards: StatCard[] = [
    {
      title: 'API Requests',
      value: '1.2M',
      change: '+5%',
      trendType: 'up',
      icon: 'dns'
    },
    {
      title: 'Active Sessions',
      value: '850',
      change: '-2%',
      trendType: 'down',
      icon: 'groups'
    }
  ];

  storageUsage = {
    label: 'Storage Usage',
    used: '4.2TB',
    total: '10TB',
    percent: 42
  };

  databaseUsage = {
    label: 'Database Size',
    size: '156GB'
  };

  dailyUsage: DayUsage[] = [
    { label: 'Mon', value: 40 },
    { label: 'Tue', value: 70 },
    { label: 'Wed', value: 85 },
    { label: 'Thu', value: 95 },
    { label: 'Fri', value: 65 },
    { label: 'Sat', value: 92 },
    { label: 'Sun', value: 110, isToday: true }
  ];
}
