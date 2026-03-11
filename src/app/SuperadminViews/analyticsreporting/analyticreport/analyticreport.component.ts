import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';

interface SummaryCard {
  title: string;
  value: string;
  change: string;
  trendType: 'up' | 'down';
}

interface ReportRow {
  name: string;
  type: string;
  typeTagClass: string;
  date: string;
}

@Component({
  selector: 'app-analyticreport',
  standalone: true,
  imports: [SHARED_IMPORTS],
  templateUrl: './analyticreport.component.html',
  styleUrls: ['./analyticreport.component.css']
})
export class AnalyticreportComponent {
  summaryCards: SummaryCard[] = [
    {
      title: 'Total Revenue',
      value: '₹128,430',
      change: '+12.5%',
      trendType: 'up'
    },
    {
      title: 'Active Tenants',
      value: '1,240',
      change: '-2.1%',
      trendType: 'down'
    },
    {
      title: 'Avg. Session',
      value: '24m 12s',
      change: '+4.3%',
      trendType: 'up'
    },
    {
      title: 'Churn Rate',
      value: '2.4%',
      change: '-0.5%',
      trendType: 'down'
    }
  ];

  reports: ReportRow[] = [
    {
      name: 'Monthly Revenue Report',
      type: 'Financial',
      typeTagClass: 'ar-tag-financial',
      date: 'Oct 01, 2023'
    },
    {
      name: 'Tenant Usage Report',
      type: 'Operational',
      typeTagClass: 'ar-tag-operational',
      date: 'Oct 05, 2023'
    },
    {
      name: 'Active Users Report',
      type: 'Usage',
      typeTagClass: 'ar-tag-usage',
      date: 'Oct 08, 2023'
    },
    {
      name: 'Subscription Report',
      type: 'Billing',
      typeTagClass: 'ar-tag-billing',
      date: 'Oct 10, 2023'
    }
  ];
}
