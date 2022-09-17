import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { user } from 'src/app/interfaces/interfaces';
import { getUsers, userState } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import * as UserActions from '../../../shared/ngrx/Actions/userActions'

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private fb:FormBuilder, private store:Store<userState>) { }
  
  form!: FormGroup
  user!: user[]
  ngOnInit(): void {
    this.form=this.fb.group({
      fullName: [null,Validators.required],
      email: [null],
      userName:[null],
      phoneNumber: [null,[Validators.minLength(8), Validators.required]],
      password:[null,[Validators.required]]
    })
    this.store.dispatch(UserActions.loadUsers())
    this.getUser()

  }

  getUser(){
    this.store.select(getUsers).subscribe(res=>{
        this.user= res.filter(el=>el.email==localStorage.getItem('email'))        
        let admin=res.find(user=>user.email===localStorage.getItem('email'))
        
        if(admin){
          this.form.patchValue({
            fullName:admin.fullName,
            userName: admin.userName,
            email: admin.email,
            phoneNumber: admin.phoneNumber,
            password: admin.password
          })
        }
      })
  }

}
