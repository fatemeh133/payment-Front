import { Payment } from './payment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}
  readonly url = 'https://localhost:7294/api/PaymentDetails';
  postPaymentDetails(payment: Payment) {
    return this.http.post(this.url, payment);
  }
}
