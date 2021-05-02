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

  constructor(private router: Router) { }

  onLogin() {
    this.entryType = 'Login'
  }
  onSignup() {
    this.entryType = 'Sign up'
  }

  async onSubmit() {
    console.log("submitting");

    if (this.entryType === 'Login') {
      this.token = await authActions.login(this.username, this.password).token;
      this.username = '';
      this.password = '';
    } else {
      this.token = await authActions.signup(this.username, this.password).token;
      this.username = '';
      this.password = '';
    }
    if (this.token) {
      console.log("token undefined");

    }

    this.router.navigate(['/main/home']);

    console.log(this.token)
  }

  ngOnInit(): void {
  }

}
