import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import {
  SubscriptionService,
  SubscriptionPlanDto,
  ModuleKey,
  PermissionKey
} from './../service/subscription.service';

interface SummaryCard {
  title: string;
  icon: string;
  value: string;
  change: string;
  trendType: 'up' | 'down' | 'flat';
}

interface ModulePermission {
  module: ModuleKey;
  actions: PermissionKey[];
}

@Component({
  selector: 'app-addsubscriptionmanagement',
  standalone: true,
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addsubscriptionmanagement.component.html',
  styleUrl: './addsubscriptionmanagement.component.css'
})
export class AddsubscriptionmanagementComponent implements OnInit {
  MODULE = MODULE;
  ACTIONS = ACTIONS;

  // form state
  planId: string | null = null;
  planName = '';
  price = 0;
  billingCycle: 'Monthly' | 'Yearly' | 'One-time' = 'Monthly';
  userLimit = 1;
  storageLimitGB = 0;
  isActive = true;

  featureInput = '';
  features: string[] = ['Mobile Responsive', 'Analytics Dashboard', 'API Access'];

  summaryCards: SummaryCard[] = [
    { title: 'Total Plans',  icon: 'view_module',   value: '12', change: '+2 this month',   trendType: 'up' },
    { title: 'Active Plans', icon: 'check_circle',  value: '8',  change: '+1 vs last week', trendType: 'up' },
    { title: 'Trial Plans',  icon: 'hourglass_top', value: '2',  change: 'Stable',          trendType: 'flat' },
    { title: 'Paid Plans',   icon: 'payments',      value: '10', change: '+3 this quarter', trendType: 'up' }
  ];

  filters = {
    dateRange: 'Last 30 days',
    planType: 'All plan types',
    status: 'All statuses'
  };

  currentPage = 1;
  totalPages = 1;

  actionList: PermissionKey[] = Object.values(ACTIONS) as PermissionKey[];

  modulePermissions: ModulePermission[] =
    (Object.values(MODULE) as ModuleKey[]).map(m => ({
      module: m,
      actions: [ACTIONS.READ] as PermissionKey[]
    }));

  loading = false;

  constructor(
    private subscriptionService: SubscriptionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('subscriptionid');
    if (id) {
      this.planId = id;
      this.loadPlan(id);
    }
  }

  private loadPlan(id: string): void {
    this.loading = true;
    this.subscriptionService.getPlanById(id).subscribe({
      next: (plan: SubscriptionPlanDto) => {
        this.planName = plan.name;
        this.price = plan.price;
        this.billingCycle = plan.billingCycle;
        this.userLimit = plan.userLimit;
        this.storageLimitGB = plan.storageLimitGB;
        this.isActive = plan.isActive;
        this.features = plan.features ?? [];

        const moduleMap = new Map<ModuleKey, PermissionKey[]>();
        (plan.modulePermissions || []).forEach(mp => {
          const mod = mp.module as ModuleKey;
          const acts = (mp.actions || []) as PermissionKey[];
          moduleMap.set(mod, acts);
        });

        this.modulePermissions = (Object.values(MODULE) as ModuleKey[]).map(m => ({
          module: m,
          actions: moduleMap.get(m) ?? [ACTIONS.READ]
        }));

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  hasModuleAction(row: ModulePermission, action: PermissionKey): boolean {
    return row.actions.includes(action);
  }

  onToggleModulePermission(row: ModulePermission, action: PermissionKey): void {
    const idx = row.actions.indexOf(action);
    if (idx === -1) {
      row.actions = [...row.actions, action];
    } else {
      row.actions = row.actions.filter(a => a !== action);
    }
  }

  addFeatureTag(): void {
    const trimmed = this.featureInput.trim();
    if (trimmed && !this.features.includes(trimmed)) {
      this.features.push(trimmed);
    }
    this.featureInput = '';
  }

  removeFeatureTag(feature: string): void {
    this.features = this.features.filter(f => f !== feature);
  }

  onCreatePlan(): void {
    const payload: SubscriptionPlanDto = {
      name: this.planName,
      price: this.price,
      billingCycle: this.billingCycle,
      userLimit: this.userLimit,
      storageLimitGB: this.storageLimitGB,
      isActive: this.isActive,
      features: this.features,
      modulePermissions: this.modulePermissions.map(m => ({
        module: m.module,
        actions: m.actions
      }))
    };

    this.loading = true;

    const request$ = this.planId
      ? this.subscriptionService.updatePlan(this.planId, payload)
      : this.subscriptionService.createPlan(payload);

    request$.subscribe({
      next: () => {
        this.loading = false;
        this.router.navigateByUrl('/superadmin/subscriptionmanagement');
      },
      error: () => {
        this.loading = false;
      }
    });
  }

  onCancel(): void {
    this.router.navigateByUrl('/superadmin/subscriptionmanagement');
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }
}
