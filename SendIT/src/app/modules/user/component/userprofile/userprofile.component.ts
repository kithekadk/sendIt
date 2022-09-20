import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb:FormBuilder, private store:Store<userState>, private router:Router) { }
  
  form!: FormGroup
  user!: user[]
  id!:number
  ngOnInit(): void {
    this.form=this.fb.group({
      clientID: [null,Validators.required],
      fullName: [null,Validators.required],
      email: [null],
      userName:[null],
      phoneNumber: [null,[ Validators.required]],
      password:[null,[Validators.required, Validators.minLength(8),]]
    })
    this.store.dispatch(UserActions.loadUsers())
    this.getUser()

  }

  getUser(){
    this.store.select(getUsers).subscribe(res=>{
        this.user= res.filter(el=>el.email==localStorage.getItem('email'))     
        let thisUser=res.find(user=>user.email===localStorage.getItem('email'))
        
        if(thisUser){
          this.id=thisUser.clientID
          this.form.patchValue({
            clientID:thisUser.clientID,
            fullName:thisUser.fullName,
            phoneNumber: thisUser.phoneNumber,
            email: thisUser.email,
            userName: thisUser.userName
          })
        }
      })
  }
filled=false
error=false
  updateUser(){
    try{
      this.form.get('email')?.valueChanges.subscribe((res)=>{
        localStorage.removeItem('email')
        localStorage.setItem('email', res)
      })
    const data={...this.form.value}
    this.store.dispatch(UserActions.updateUser({user:{...this.form.value}}))
    this.filled = true
    this.store.dispatch(UserActions.loadUsers())
      setTimeout(() => { 
      this.router.navigate(['/user/received'])  
      }, 1500);
    }catch(error){
      this.error=true
    }
    
  }



}
