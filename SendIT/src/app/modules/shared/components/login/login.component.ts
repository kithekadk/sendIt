import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ApiService } from 'src/app/services/api.service';
import { data } from '../../interfaces/interfaces';
import {
  changePassword,
  emptyError,
  loadRole,
  loginUser,
} from '../../ngrx/Actions/userActions';
import {
  changePassFailure,
  changePassSuccess,
  getToken,
  userLoginFailure,
  userLoginSuccess,
  userState,
} from '../../ngrx/Reducer/userReducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login = true;
  missing = false;
  filled = false;

  close() {
    this.login = true;
  }
  constructor(
    private router: Router,
    private store: Store<userState>,
    private fb: FormBuilder,
    private api: ApiService
  ) {}
  form!: FormGroup;

  input = { email: '', password: '' };

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }
  success!: string;
  errorMsg!: string;
  successChange!: string;
  successChange2!: string;
  errorMsg2!: string;
  onLogin(input: data) {
    if (input.email == '' || input.password == '') {
      this.errorMsg = 'All inputs are required';
      setTimeout(() => {
        this.errorMsg = '';
      }, 2000);
    }

    this.store.select(getToken).subscribe((res) => {
      let token = res;
      localStorage.setItem('token', token);
      this.checkRole();
      return token;
    });

    if (input.email !== '' && input.password !== '') {
      this.store.dispatch(loginUser({ logins: { ...input } }));

      this.api.loginUser(input).subscribe({
        next:(res:any)=>{
          this.success = res.message
          this.login = false;
          this.filled = true;
          setTimeout(() => {
            this.redirect();
          }, 1500);
        },
        error:(error)=>{
          this.errorMsg=error.error.message
          setTimeout(() => {
            this.errorMsg = '';
          }, 2000);
        }
      })
    }
  }

  checkRole() {
    this.store.dispatch(loadRole());
  }
  redirect() {
    let role = localStorage.getItem('role');
    if (role == 'user') {
      this.login = false;
      this.filled = true;
      this.router.navigate(['/user/received']);

      localStorage.setItem('isLoggedIn', 'true');
    } else if (role == 'admin') {
      this.router.navigate(['/admin/parcels']);

      localStorage.setItem('isLoggedIn', 'true');
    }
  }

  signIn(){
    this.view=false
  }

  view = false;
  forgotPassword() {
    this.view = !this.view;
  }
  onForget() {
    this.api.changePassword(this.form.value).subscribe({
      next: (res: any) => {
        this.form.disable();
        
        this.successChange2 = res.message;
        setTimeout(() => {
          this.view = false;
          this.successChange2 = '';
          this.form.reset();
          this.form.enable();
        }, 2500);
      },
      error: (error) => {
        this.form.disable();
        this.errorMsg2 = error.error.message;
        setTimeout(() => {
          this.errorMsg2 = '';
          this.form.enable();
        }, 2500);
      },
    });
  }
}
