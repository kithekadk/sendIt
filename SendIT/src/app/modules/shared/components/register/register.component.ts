import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  MinLengthValidator,
  Validators,
} from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import {
  userAdderror,
  useraddSuccess,
  userState,
} from '../../ngrx/Reducer/userReducer';
import * as UserActions from '../../ngrx/Actions/userActions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    public store: Store<userState>,
    private router: Router,
    private action$: Actions
  ) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      fullName: [null, Validators.required],
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phoneNumber: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }
  error!: string;
  success!: string;
  untouched = false;
  onRegister() {
    if (this.form.untouched) {
      this.untouched = true;
      setTimeout(() => {
        this.untouched = false;
      }, 2000);

      return;
    }
  
    this.store.dispatch(
      UserActions.addUser({ newUser: { ...this.form.value } })
    );
    try {
      this.store.select(useraddSuccess).subscribe((res) => {
        if (res.length > 0) {
          this.success = res;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        } else {
          this.store.select(userAdderror).subscribe((res: any) => {
            
            this.error = res.error.message;
            setTimeout(() => {
              this.error = ''
            }, 3000);

          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  }
}
