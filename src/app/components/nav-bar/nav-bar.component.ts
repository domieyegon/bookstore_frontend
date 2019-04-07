import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../services/login.service';
import { BookService } from 'src/app/services/book.service';
import { NavigationExtras, Router } from '@angular/router';
import { Book } from 'src/app/models/book';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  private loggedIn = false;

  private bookList: Book [] = [];
  private keyword: string;
  
  constructor(
    private loginService: LoginService,
    private bookService: BookService,
    private router: Router
    ) { }

  logout() {
    this.loginService.logout().subscribe(
      res =>{
        this.loggedIn = false;
        this.router.navigate(['/myAccount']);
        // location.reload();
      },
      err => {
        console.log(err);
      }
      );
  }

  onSearchByTitle() {
    this.bookService.searchBook(this.keyword).subscribe(
      res => {
        this.bookList =  res.json();

        let navigationExtras: NavigationExtras = {
          queryParams : {
            "bookList": JSON.stringify(this.bookList)
          }
        };
        this.router.navigate(['/bookList'], navigationExtras);
      },
      err => {
        console.log(err.text());
      }
    );
  }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res => {
        this.loggedIn = true;
      }, err => {
        this.loggedIn = false;
      }
    )
  }

}
