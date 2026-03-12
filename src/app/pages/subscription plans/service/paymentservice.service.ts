// src/app/services/paymentservice.service.ts
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environment/enviornment';
import { HttpClient } from '@angular/common/http';

export interface CreatePaymentIntentRequest {
  amount: number;
  currency?: string;
}

export interface CreatePaymentIntentResponse {
  clientSecret: string;
}

@Injectable({
  providedIn: 'root'
})
export class PaymentserviceService {

  constructor(private http : HttpClient){}
  createPaymentIntent(
    payload: any
  ): Observable<CreatePaymentIntentResponse> {
    return this.http.post<CreatePaymentIntentResponse>(
      `http://localhost:5000/sp/stripe/create-payment-intent`,
      payload
    );
  }
}
