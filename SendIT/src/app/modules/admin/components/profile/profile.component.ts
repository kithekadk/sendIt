import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { user } from 'src/app/interfaces/interfaces';
import { getUsers, userState } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import * as UserActions from '../../../shared/ngrx/Actions/userActions'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  constructor(private fb:FormBuilder, 
    private router:Router,
    private store:Store<userState>) { }
  
  form!: FormGroup
  user!: user[]
  id!:number
  ngOnInit(): void {
    this.form=this.fb.group({
      fullName: [null,Validators.required],
      email: [null],
      userName:[null],
      phoneNumber: [null,[Validators.required]],
      password:['',[Validators.required,Validators.minLength(8)]]
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
  filled=false
  error=false
    updateUser(){
      try{
      this.store.dispatch(UserActions.updateUser({userID:this.id,user:{...this.form.value}}))
      this.filled = true
      this.store.dispatch(UserActions.loadUsers())
        setTimeout(() => { 
        this.router.navigate(['/admin/parcels'])  
        }, 1500);
      }catch(error){
        this.error=true
      }
      
    }


}
