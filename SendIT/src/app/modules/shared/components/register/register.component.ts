import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Action, select, Store } from '@ngrx/store';
import { signUpUser, userAdderror, useraddSuccess, userState } from '../../ngrx/Reducer/userReducer';
import * as UserActions from '../../ngrx/Actions/userActions'
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs';
import { Actions } from '@ngrx/effects';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
created=false
  constructor(private fb:FormBuilder, public store:Store<userState>,
              private router:Router ,private action$:Actions) { }
  form! : FormGroup
  ngOnInit(): void {
    this.form=this.fb.group({
      fullName: [null,Validators.required],
      userName: [null,Validators.required],
      email: [null,[Validators.required, Validators.email]],
      phoneNumber: [null,Validators.required],
      password: [null,[Validators.required, Validators.minLength(8)]],
    })
  }
error! :string
untouched=false
  onRegister(){
    if(this.form.untouched){
      this.untouched=true 
      setTimeout(() => {
       this.untouched=false
      }, 2000);
      
      return
    }
    
    this.store.dispatch(UserActions.addUser({newUser:{...this.form.value}}))
    this.store.select(userAdderror).subscribe((res)=>{
      res as unknown as HttpErrorResponse
      console.log(res);
    
   
    }
    )
    
    this.store.select(useraddSuccess).subscribe((res)=>{
      this.created=true
      setTimeout(() => {
        this.router.navigate(['/login'])
      }, 1500);
    })

 
  

}
}
