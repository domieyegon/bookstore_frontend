import { Component, OnInit, OnDestroy,  ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { UserService } from '../../services/user.service';
import { AppConst } from '../../constants/app.const';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.component.html',
  styleUrls: ['./my-account.component.css']
})
export class MyAccountComponent implements OnInit, OnDestroy  {
  subscription: Subscription;
  public serverPath = AppConst.serverPath;
  private loginError: boolean= false;
  private loggedIn= false;
  private credential= {username: '', password: ''};

  private emailSent: boolean =false;
  public usernameExists:boolean;
  public emailExists: boolean;
  private username: string;
  private email: string;

  public emailNotExists: boolean = false;
  public forgetPasswordEmailSent: boolean;
  private recoverEmail : string;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private router: Router 
    ) { }

    onLogin() {
      this.loginService.sendCredentials(this.credential.username, this.credential.password).subscribe(
        res => {
          console.log(res);
          localStorage.setItem('xAuthToken', res.json().token);
          this.loggedIn= true;
          location.reload();
          this.router.navigate(['/home']);
        },
        err => {
          this.loggedIn= false;
          this.loginError = true;
        }
      )}

    onNewAccount() {
      this.usernameExists =false;
      this.emailExists = false;
      this.emailSent = false;

      this.userService.newUser(this.username, this.email).subscribe(
        res => {
          console.log(res);
          this.emailSent = true;
        }, err => {
          console.log(err.text());
          let errorMessage = err.text();
          if (errorMessage === "usernameExists") this.usernameExists = true;
          if (errorMessage === "emailExists") this.emailExists = true;
        }
      );
    }

    onForgetPassword() {
      this.forgetPasswordEmailSent = false;
      this.emailNotExists =  false;

      this.userService.retrievePassword(this.recoverEmail).subscribe(
        res => {
          console.log(res);
          this.forgetPasswordEmailSent = true;
        }, err => {
          let errorMessage = err.text();
          if (errorMessage === "Email not found") this.emailNotExists = true;
        }
        
      );
    }

  ngOnInit() {
    this.loginService.checkSession().subscribe(
      res=> {
        this.loggedIn = true;
      },
      error => {
        this.loggedIn = false;        
      }
    );
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


}
