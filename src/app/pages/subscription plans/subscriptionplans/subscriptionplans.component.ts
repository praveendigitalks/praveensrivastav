// subscriptionplans.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-subscriptionplans',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './subscriptionplans.component.html',
  styleUrl: './subscriptionplans.component.css',
})
export class SubscriptionplansComponent {
  // modal state
  showCheckout = false;
  selectedPlanName = '';
  selectedPlanPrice = '';
  selectedPlanAmount = 0;

  payMethod: 'card' | 'upi' = 'card';

  card = {
    number: '',
    exp: '',
    cvc: '',
    country: 'India',
  };

  upiId = '';

  openCheckout(name: string, priceLabel: string, amount: number) {
    this.selectedPlanName = name;
    this.selectedPlanPrice = priceLabel;
    this.selectedPlanAmount = amount;
    this.showCheckout = true;
    this.payMethod = 'card';
  }

  closeCheckout() {
    this.showCheckout = false;
  }

  formatCardNumber() {
    this.card.number = this.card.number
      .replace(/[^\d]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
  }

  formatExp() {
    this.card.exp = this.card.exp
      .replace(/[^\d]/g, '')
      .slice(0, 4)
      .replace(/(\d{2})(\d{0,2})/, (_, m, y) => (y ? `${m}/${y}` : m));
  }

  payNow() {
    if (!this.selectedPlanName) return;

    console.log('Demo pay:', {
      plan: this.selectedPlanName,
      label: this.selectedPlanPrice,
      amount: this.selectedPlanAmount,
      method: this.payMethod,
      card: this.card,
      upiId: this.upiId,
    });

    alert(
      `Demo payment\nPlan: ${this.selectedPlanName}\nAmount: ${this.selectedPlanPrice}\nMethod: ${this.payMethod.toUpperCase()}`
    );

    this.closeCheckout();
  }
}
