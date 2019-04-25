import { Component, OnInit } from '@angular/core';
import { AppConst } from '../../constants/app.const';
import { Router } from '@angular/router';
import { Book } from '../../models/book';
import { CartService } from '../../services/cart.service';
import { ShoppingCart } from '../../models/shopping-cart';
import { CartItem } from 'src/app/models/cart-item';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  private serverPath = AppConst.serverPath;

  private selectedBook : Book;
  private cartItemList: CartItem[] = [];
  private cartItemNumber: number;
  private shoppingCart: ShoppingCart = new ShoppingCart();
  private cartItemUpdated : boolean;
  private emptyCart: boolean;
  private notEnoughStock: boolean;
   
  constructor(
    private cartService: CartService,
    private router: Router 
  ) { }

  onSelect(book: Book) {
    this.selectedBook = book;
    this.router.navigate(['/bookDetail', this.selectedBook.id]);
  }

  onRemoveCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem.id).subscribe(
      res => {
        console.log(res.text());
        this.getCartItemList();
        this.getShoppingCart();
      },
      err => {
        console.log(err.text());
      }
    );
  }

  onUpdateCartItem(cartItem: CartItem) {
    this.cartService.updateCartItem(cartItem.id, cartItem.qty).subscribe(
      res => {
        console.log(res.text());
        this.cartItemUpdated = true;
        this.getShoppingCart();
      },
      err => {
        console.log(err.text());
      }
    );
  }

  getCartItemList(){
    this.cartService.getCartItemList().subscribe(
      res => {
       this.cartItemList= res.json();
       this.cartItemNumber= this.cartItemList.length;
       console.log(this.cartItemNumber);
      },
      err => {
        console.log(err.text());
      }
    );
  }
  getShoppingCart() {
    this.cartService.getShoppingCart().subscribe(
      res => {
       this.shoppingCart= res.json();
      },
      err => {
        console.log(err.text());
      }
    );
  }

  onCheckout() {
    if (this.cartItemNumber == 0){
      this.emptyCart = true;
    } else {
      for (let item of this.cartItemList) {
        if (item.qty > item.book.inStockNumber) {
          console.log("not enough stock on this item");
          this.notEnoughStock = true;
          return;
        }
      }
    }
  }

  ngOnInit() {
    this.getCartItemList();
    this.getShoppingCart();
    this.cartItemNumber= this.cartItemList.length;
    console.log(this.cartItemNumber);
    // if (this.cartItemNumber == 0){
    //   this.emptyCart = true;
    // }
  }


}
