import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'hammerjs';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatTableDataSource, MatTable} from '@angular/material';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MatTableModule} from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { DataTablesModule } from 'angular-datatables';
import {DataTableModule} from "angular2-datatable";

import { DataFilterPipe } from './components/book-list/data-filter-pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { HomeComponent } from './components/home/home.component';
import {routing} from './app.routing';
import { MyAccountComponent } from './components/my-account/my-account.component';

import { LoginService } from './services/login.service';
import { UserService } from './services/user.service';
import { PaymentService } from './services/payment.service';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { ShippingService } from './services/shipping.service';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './services/book.service';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CartService } from './services/cart.service';
import { OrderComponent } from './components/order/order.component';
import { OrderService } from './services/order.service';
import { CheckoutService } from './services/checkout.service';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    MyAccountComponent,
    MyProfileComponent,
    BookListComponent,
    DataFilterPipe,
    BookDetailComponent,
    ShoppingCartComponent,
    OrderComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTabsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    DataTableModule,
    MatTableModule
  ],
  providers: [
    LoginService,
    UserService,
    PaymentService,
    ShippingService,
    BookService,
    CartService,
    OrderService,
    CheckoutService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
