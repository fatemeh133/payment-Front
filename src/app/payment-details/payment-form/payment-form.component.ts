import { PaymentService } from './../../services/payment.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Payment } from '../../services/payment.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-payment-form',
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.css',
})
export class PaymentFormComponent {
  constructor(private PaymentService: PaymentService) {}
  onSubmit(form: NgForm) {
    console.log(form.value);

    const paymentInfo: Payment = form.value;

    this.PaymentService.postPaymentDetails(paymentInfo).subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error:', error.error); // Log the error details
      },
    });
  }
}
