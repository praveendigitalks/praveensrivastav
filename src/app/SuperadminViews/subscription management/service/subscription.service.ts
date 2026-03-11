import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../../environment/enviornment';
import { Observable } from 'rxjs';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';

export type ModuleKey = (typeof MODULE)[keyof typeof MODULE];
export type PermissionKey = (typeof ACTIONS)[keyof typeof ACTIONS];

export interface ModulePermissionDto {
  module: string;        // backend stores strings
  actions: string[];
}

export interface SubscriptionPlanDto {
  _id?: string;
  name: string;
  price: number;
  billingCycle: 'Monthly' | 'Yearly' | 'One-time';
  userLimit: number;
  storageLimitGB: number;
  isActive: boolean;
  features: string[];
  modulePermissions: ModulePermissionDto[];
  createdAt?: string;
  updatedAt?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {
  private subscriptionApi = `${environment.baseurl}/subscription-plans`;

  constructor(private http: HttpClient) {}

  createPlan(payload: SubscriptionPlanDto): Observable<SubscriptionPlanDto> {
    return this.http.post<SubscriptionPlanDto>(this.subscriptionApi, payload);
  }

  getPlans(): Observable<SubscriptionPlanDto[]> {
    return this.http.get<SubscriptionPlanDto[]>(this.subscriptionApi);
  }

  getPlanById(id: string): Observable<SubscriptionPlanDto> {
    return this.http.get<SubscriptionPlanDto>(`${this.subscriptionApi}/${id}`);
  }

  updatePlan(id: string, payload: SubscriptionPlanDto): Observable<SubscriptionPlanDto> {
    return this.http.put<SubscriptionPlanDto>(`${this.subscriptionApi}/${id}`, payload);
  }

  deletePlan(id: string): Observable<SubscriptionPlanDto> {
    return this.http.delete<SubscriptionPlanDto>(`${this.subscriptionApi}/${id}`);
  }
}
