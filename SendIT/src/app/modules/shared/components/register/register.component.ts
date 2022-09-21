import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Actions } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import {
  userState,
} from '../../ngrx/Reducer/userReducer';
import * as UserActions from '../../ngrx/Actions/userActions';
import { ApiService } from 'src/app/services/api.service';

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
    private api:ApiService
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

    this.api.createUser(this.form.value).subscribe({
      next:(res:any)=>{
        this.success = res.message;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
      },
      error:(error)=>{
        this.error = error.error.message;
            setTimeout(() => {
              this.error = ''
            }, 3000);
      }
    })
  }
}
