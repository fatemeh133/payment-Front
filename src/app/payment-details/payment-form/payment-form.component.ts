import { PaymentService } from './../../services/payment.service';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Payment } from '../../services/payment.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
})
export class PaymentFormComponent implements OnInit {
  constructor(private PaymentService: PaymentService) {}

  paymentDetailForm: Payment = {
    peymanetDetailId: 0,
    cardOwnerName: '',
    cardNumber: '',
    expirationDate: '',
    securityCode: '',
  };

  onSubmit(form: NgForm) {
    const peymentInfo: Payment = form.value;

    console.log('form value on submit', form.value);

    const paymentInfo: Payment = form.value;
    if (
      peymentInfo.peymanetDetailId == 0 ||
      peymentInfo.peymanetDetailId == null
    ) {
      delete peymentInfo.peymanetDetailId;
      this.PaymentService.postPaymentDetails(paymentInfo);
    } else {
      this.PaymentService.putPaymentDetails(paymentInfo);
    }

    form.reset();
  }

  ngOnInit() {
    this.PaymentService.currentPaymentDetail.subscribe((clickeditem) => {
      console.log('clickeditem', clickeditem);
      this.paymentDetailForm = clickeditem;
    });
  }
}
