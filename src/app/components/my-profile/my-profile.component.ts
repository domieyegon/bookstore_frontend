import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { User } from '../../models/user';
import { UserBilling } from '../../models/user-billing';
import { UserPayment } from '../../models/user-payment';
import { UserShipping } from '../../models/user-shipping';
import { Router } from '@angular/router';
import {UserService} from '../../services/user.service';
import {LoginService} from '../../services/login.service';
import {PaymentService} from '../../services/payment.service';
import {ShippingService} from '../../services/shipping.service';
import { OrderService } from 'src/app/services/order.service';
import { Order } from '../../models/order';
import { Book } from 'src/app/models/book';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  private servePath =AppConst.serverPath;
  public dataFetched = false;
  private loginError: boolean;
  private loggedIn: boolean;
  private credentials = {'username': '', 'password' : ''};

  private user: User =new User();
  private updateSuccess : boolean;
  private newPassword: string;
  private incorrectPassword : boolean;
  private currentPassword : string;

  private selectedBillingTab: number = 0;
  private selectedProfileTab: number = 0;
  private selectedShippingTab: number = 0;

  private userPayment: UserPayment = new UserPayment();
  private userBilling: UserBilling = new UserBilling();
  private userPaymentList: UserPayment[] = [];
  private defaultPaymentSet: boolean;
  private defaultUserPaymentId: number;
  private stateList: string[] = [];

  private userShipping : UserShipping =  new UserShipping();
  private userShippingList: UserShipping[] = [];

  private defaultUserShippingId : number;
  private defaultShippingSet : boolean;

  private orderList : Order[] = [];
  private order: Order= new Order();
  private displayOrderDetail: boolean;

  private cartItemList: CartItem[] = [];


  constructor(
    private loginService : LoginService,
    private userService : UserService,
    private paymentService: PaymentService,
    private shippingService : ShippingService,
    private orderService : OrderService,
    private cartItemService : CartService,
    private router: Router
  ) { }

  selectedShippingChange(val: number) {
    this.selectedShippingTab = val;
  }

  selectedBillingChange(val: number) {
    this.selectedBillingTab = val;
  }

  onUpdateUserInfo () {
    this.userService.updateUserInfo(this.user, this.newPassword, this.currentPassword).subscribe(
      res => {
        console.log(res.text());
        this.updateSuccess = true;
      },
      err => {
        console.log(err.text());
        let errorMessage = err.text();
        if (errorMessage === "Incorrect current password!") this.incorrectPassword = true;
        
      }
    );
  }

  onNewPayment() {
    this.paymentService.newPayment(this.userPayment).subscribe(
      res => {
        this.getCurrentUser();
        this.selectedBillingTab = 0;
        this.userPayment =  new UserPayment();
      },
      err => {
        console.log(err.text());
      }
    );
  }

  onUpdatePayment (payment: UserPayment) {
  	this.userPayment = payment;
  	this.userBilling = payment.userBilling;
  	this.selectedBillingTab = 1;
  }

  onRemovePayment(id: number) {
    this.paymentService.removePayment(id).subscribe(
      res => {
        console.log("Removed "+ id+ "and the response is "+ res);
        this.getCurrentUser();
      },
      err => {
        console.log(err.text());
      }
    );
  }

  setDefaultPayment() {
    this.defaultPaymentSet = false;
    this.paymentService.setDefaultPayment(this.defaultUserPaymentId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultPaymentSet = true;
       
      },
      err => {
        console.log(err.text());
      }
    );

  }

  onNewShipping() {
    this.shippingService.newShipping(this.userShipping).subscribe(
      res => {
        console.log(res);
        this.getCurrentUser();
        this.selectedShippingTab = 0;
        this.userShipping = new UserShipping();
      },
      err => {
        console.log(err.text());
      }
    );
  }

  onUpdateShipping(shipping: UserShipping) {
    this.userShipping = shipping;
    this.selectedShippingTab = 1;
  }

  onRemoveShipping(id: number) {
    this.shippingService.removeShipping(id).subscribe(
      res => {
        this.getCurrentUser();
      },
      err => {
        console.log(err.text()); 
      }
    );
  }

  setDefaultShipping() {
    this.defaultShippingSet = false;
    this.shippingService.setDefaultShipping(this.defaultUserShippingId).subscribe(
      res => {
        this.getCurrentUser();
        this.defaultShippingSet = true;
       
      },
      err => {
        console.log(err.text());
      }
    );

  }

  getCurrentUser() {
    this.userService.getCurrentUser().subscribe (
      res => {
        this.user = res.json();
        this.userPaymentList = this.user.userPaymentList;
        this.userShippingList = this.user.userShippingList;

        for (let index in this.userPaymentList) {
          if (this.userPaymentList[index].defaultPayment) {
            this.defaultUserPaymentId = this.userPaymentList[index].id;
            break;
          }
        }

        for (let index in this.userShippingList) {
          if (this.userShippingList[index].userShippingDefault) {
            this.defaultUserShippingId = this.userShippingList[index].id;
            break;
          }
        }
        console.log(res.json());
        this.dataFetched  = true;
      },
      err => {
        console.log(err);
      }
      );
  }

  onDisplayOrder (order: Order, book: Book) {
    console.log(order);
    this.order = order;
    this.displayOrderDetail = true;
    this.cartItemService.getCartItemList().subscribe(
      res => {
        console.log("Books "+res.json());
        this.cartItemList = res.json();
      },
      err => {
        console.log(err.text());
      }
    )
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
        console.log("Active Session");
      }, err =>{
        this.loggedIn = false;
        console.log("inactive session");
        this.router.navigate(['/myAccount']);
      }
    );
    this.getCurrentUser();

    this.orderService.getOrderList().subscribe(
      res => {
        this.orderList = res.json();
       },
       error => {
         console.log(error.text());
       }
     );

    for (let s in AppConst.usStates) {
      this.stateList.push(s);
    }

    this.userBilling.userBillingState = "";
    this.userPayment.type = "";
    this.userPayment.expiryMonth = "";
    this.userPayment.expiryYear = "";
    this.userPayment.userBilling = this.userBilling;
    this.defaultPaymentSet =  false;

    this.userShipping.userShippingState = "";
    this.userShipping.userShippingDefault = false;

  }

}
