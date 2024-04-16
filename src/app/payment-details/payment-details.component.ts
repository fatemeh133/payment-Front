import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../services/payment.service';
import { Payment } from '../services/payment.model';

@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css',
})
export class PaymentDetailsComponent implements OnInit {
  paymentDetails!: Payment[];
  constructor(private paymentService: PaymentService) {}
  ngOnInit() {
    this.paymentService.paymentListChanged.subscribe((paymentList) => {
      this.paymentDetails = paymentList;
    });
    this.paymentService.getPaymentDetails();
  }

  currentPaymentHandler(Paymentitem: Payment) {
    console.log(Paymentitem);

    this.paymentService.currentPaymentDetail.next({ ...Paymentitem });
  }
}
