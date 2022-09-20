import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { data } from '../../interfaces/interfaces';
import {
  changePassword,
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
    private fb: FormBuilder
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
  successChange!: string;
  errorMsg!: string;
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
      this.store.select(userLoginSuccess).subscribe((res: any) => {
        if (res.length != 0) {
          this.success = 'Logged in successfully';
          this.errorMsg = '';
          this.login = false;
          this.filled = true;

          setTimeout(() => {
            this.redirect();
          }, 1500);
        } else {
          this.store.select(userLoginFailure).subscribe((res: any) => {
            this.errorMsg = res.error.message;

            setTimeout(() => {
              this.errorMsg = '';
            }, 2000);
          });
        }
      });
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

  view = false;
  forgotPassword() {
    this.view = !this.view;
  }
  onForget() {
    this.store.dispatch(changePassword({ data: { ...this.form.value } }));
    this.view = false;
    this.store.select(changePassSuccess).subscribe((res) => {
      if (res.length != 0) {
        console.log(res);
        this.successChange = res;
        this.form.reset();
        setTimeout(() => {
          this.successChange = '';
        }, 2500);
      } else {
        this.store.select(changePassFailure).subscribe((res: any) => {
          this.errorMsg = res.error.message;
          setTimeout(() => {
            this.errorMsg = '';
          }, 2500);
        });
      }
    });
  }
}
