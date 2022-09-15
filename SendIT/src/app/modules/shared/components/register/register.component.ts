import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, Store } from '@ngrx/store';
import { signUpUser, userState } from '../../ngrx/Reducer/userReducer';
import * as UserActions from '../../ngrx/Actions/userActions'
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';
import { Actions } from '@ngrx/effects';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
created=false
  constructor(private fb:FormBuilder, private store:Store<userState>,
              private router:Router ,private action$:Actions) { }
  form! : FormGroup
  ngOnInit(): void {
    this.form=this.fb.group({
      fullName: [null,Validators.required],
      userName: [null,Validators.required],
      email: [null,[Validators.required, Validators.email]],
      phoneNumber: [null,[Validators.minLength(8), Validators.required]],
      location: [null, Validators.required],
      password: [null,Validators.required],
    })
  }


  onRegister(){
    this.store.dispatch(UserActions.addUser({newUser:{...this.form.value}}))
    this.created=true
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1500);
    

}
}
