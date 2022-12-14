import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { user } from 'src/app/interfaces/interfaces';
import {
  getUsers,
  userState,
  userUpdateFailure,
} from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import { ApiService } from 'src/app/services/api.service';
import * as UserActions from '../../../shared/ngrx/Actions/userActions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store<userState>,
    private api: ApiService
  ) {}

  form!: FormGroup;
  user!: user[];
  id!: number;
  ngOnInit(): void {
    this.form = this.fb.group({
      clientID: [null, [Validators.required]],
      fullName: [null, Validators.required],
      email: [null, Validators.required],
      userName: [null, Validators.required],
      phoneNumber: [null, [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.store.dispatch(UserActions.loadUsers());
    this.getUser();
  }

  getUser() {
    this.store.select(getUsers).subscribe((res) => {
      this.user = res.filter((el) => el.email == localStorage.getItem('email'));
      let admin = res.find(
        (user) => user.email === localStorage.getItem('email')
      );

      if (admin) {
        this.form.patchValue({
          clientID: admin.clientID,
          fullName: admin.fullName,
          userName: admin.userName,
          email: admin.email,
          phoneNumber: admin.phoneNumber,
        });
      }
    });
  }
  success!: string;
  error!: string;

  updateUser() {
    this.store.dispatch(
      UserActions.updateUser({ user: { ...this.form.value } })
    );

    this.api.editUser(this.form.value).subscribe({
      next: (res: any) => {
        this.form.disable();
        this.success = res.message;
        this.store.dispatch(UserActions.loadUsers());
        setTimeout(() => {
          this.success = '';
          this.router.navigate(['/admin/parcels']);
        }, 2500);
      },
      error: (error) => {
        this.error = error.error.message;
        setTimeout(() => {
          this.error = '';
        }, 2000);
      },
    });
  }
}
