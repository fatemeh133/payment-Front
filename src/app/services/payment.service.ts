import { Payment } from './payment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient) {}

  paymentListChanged = new BehaviorSubject<Payment[]>([]);
  currentPaymentDetail = new Subject<Payment>();

  readonly url = 'https://localhost:7294/api/PaymentDetails';
  postPaymentDetails(payment: Payment) {
    return this.http.post(this.url, payment).subscribe((newPaymentRes) => {
      console.log('PaymentDetails got from form value', payment);
      console.log(
        'new Payment Response from post and subscribe',
        newPaymentRes
      );

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

  putPaymentDetails(paymentInfo: Payment) {
    this.http
      .put(this.url + '/' + paymentInfo.peymanetDetailId, paymentInfo)
      .subscribe((res) => {
        console.log('put response', res);
        complete: () => {
          this.getPaymentDetails();
        };
        error: (error: any) => {
          console.log(error);
        };
      });
  }
}
