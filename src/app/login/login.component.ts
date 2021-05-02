import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as authActions from './login-requests.js'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  entryType = 'Login';
  username = '';
  password = '';
  token;

  constructor(private router: Router) {}

  onLogin(){
    this.entryType = 'Login'
  }
  onSignup(){
    this.entryType = 'Sign up'
  }

  onSubmit(){
    if(this.entryType==='Login'){
      this.token = authActions.login(this.username, this.password);
      this.username = '';
      this.password = '';
    }else {
      this.token = authActions.signup(this.username, this.password);
      this.username = '';
      this.password = '';
    }
    if(this.token){
      this.router.navigate(['/main/home']);
    }
  }

  ngOnInit(): void {
  }

}
