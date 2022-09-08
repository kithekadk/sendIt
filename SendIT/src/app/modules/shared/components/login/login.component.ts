import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {data} from '../../interfaces/interfaces'
import { loadRole, loginUser } from '../../ngrx/Actions/userActions';
import { getToken, getUsers, userState } from '../../ngrx/Reducer/userReducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router, private store:Store<userState>) { }

  ngOnInit(): void {
  }
  onLogin(input:data){
      this.store.select(getToken).subscribe(res=>{
      let token=res
      localStorage.setItem("token", token)
      this.checkRole()
      return token
    })
    
    this.store.dispatch(loginUser({logins:{...input}}))

    
    setTimeout(() => {
      this.redirect() 
    }, 500);
  }

  checkRole(){
    this.store.dispatch(loadRole())
  }
  redirect(){
    let role = localStorage.getItem('role')
    if ( role == 'user'){
      
      this.router.navigate(['/user/received']);

      localStorage.setItem('isLoggedIn', 'true')

    }else if(role == 'admin'){

      this.router.navigate(['/admin/parcels']);

      localStorage.setItem('isLoggedIn', 'true')
    }
  }
}
