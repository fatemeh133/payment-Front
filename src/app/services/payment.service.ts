import { Payment } from './payment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  paymentListChanged = new BehaviorSubject<Payment[]>([]);
  readonly url = 'https://localhost:7294/api/PaymentDetails';
  postPaymentDetails(payment: Payment) {
    return this.http.post(this.url, payment).subscribe((newPaymentRes) => {
      const currentPaymentArray = this.paymentListChanged.getValue() || [];
      this.paymentListChanged.next([
        ...currentPaymentArray,
        newPaymentRes as Payment,
      ]);
    });
  }

  getPaymentDetails() {
    this.http.get<Payment[]>(this.url).subscribe((paymentRes: Payment[]) => {
      this.paymentListChanged.next([...paymentRes]);
    });
  }
}
