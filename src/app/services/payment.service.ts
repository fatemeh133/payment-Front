import { Payment } from './payment.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UiService } from './ui-service.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient, private uiService: UiService) {}

  paymentListChanged = new BehaviorSubject<Payment[]>([]);
  currentPaymentDetail = new Subject<Payment>();

  readonly url = 'https://localhost:7294/api/PaymentDetails';
  postPaymentDetails(payment: Payment) {
    return this.http.post(this.url, payment).subscribe({
      next: (newPaymentRes) => {
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
      },
      complete: () => {
        this.uiService.showSuccess('با موفقیت به جدول اضافه شد', 'موفقیت ');
      },
      error: () => {
        this.uiService.showٍError(' اضافه کردن با خطا مواجه شد', 'خطا ');
      },
    });
  }

  getPaymentDetails() {
    this.http.get<Payment[]>(this.url).subscribe({
      next: (paymentRes: Payment[]) => {
        this.paymentListChanged.next([...paymentRes]);
      },
      error: () => {
        this.uiService.showٍError(' دریافت اطلاعات  با خطا مواجه شد', 'خطا ');
      },
    });
  }

  putPaymentDetails(paymentInfo: Payment) {
    this.http
      .put(this.url + '/' + paymentInfo.peymanetDetailId, paymentInfo)
      .subscribe({
        next: (res) => {
          console.log('put response', res);
        },
        complete: () => {
          this.getPaymentDetails();
          this.uiService.showSuccess('با موفقیت به روزرسانی شد', 'موفقیت ');
        },
        error: () => {
          this.uiService.showٍError(' به روزرسانی با خطا مواجه شد', 'خطا ');
        },
      });
  }

  deletePaymentDetails(paymentID: number) {
    this.http.delete(this.url + '/' + paymentID).subscribe({
      complete: () => {
        this.getPaymentDetails();
        this.uiService.showSuccess('با موفقیت از جدول حذف شد', 'موفقیت ');
      },
      error: () => {
        this.uiService.showٍError(' حذف  با خطا مواجه شد', 'خطا ');
      },
    });
  }
}
