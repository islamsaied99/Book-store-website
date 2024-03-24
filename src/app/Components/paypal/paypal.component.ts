import { style } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-paypal',
  standalone: true,
  imports: [],
  templateUrl: './paypal.component.html',
  styleUrl: './paypal.component.css'
})
export class PaypalComponent implements OnInit {
  totalamount:any=0;
  @ViewChild('paymentref',{static:true}) paymentref!:ElementRef;
  constructor(private route:ActivatedRoute) {
this.totalamount=route.snapshot.params['total'];
   }

ngOnInit(): void {
  window.paypal.Buttons({
    style: {
      layout: 'horizontal',
      color: 'blue',
      shape: 'rect',
      label: 'paypal',
      
      
    },createOrder: (data:any, actions:any) => {
      return actions.order.create({
        purchase_units: [{
          amount: {
            value: this.totalamount, // Set the amount for your order
            currency_code: 'USD', // Set the currency for your order
          },
        }
      ]
      })},onApprove: function (data:any, actions:any) {
        // Capture the order when it's approved
        return actions.order.capture().then( (details:any)=> {
          // Show a success message to the buyer
          if(details.status=='COMPLETED'){
            // this.payment.TransactionID
            alert('Transaction completed by ' + details.payer.name.given_name + '!');
          }
         
        }
        );
      },onerror: (err:any)=> {
        // console.log(err);
      }
  }).render(this.paymentref.nativeElement);
  
}

}
