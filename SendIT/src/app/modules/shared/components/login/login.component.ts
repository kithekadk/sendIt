import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import {data} from '../../interfaces/interfaces'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private api:ApiService, private router:Router) { }

  ngOnInit(): void {
  }
  onLogin(input:data){
    this.api.loginUser(input).subscribe(res=>{
      localStorage.setItem("token", res.token)
      this.checkRole()
    })      
    setTimeout(() => {
      this.redirect() 
    }, 500);
  }

  checkRole(){
    this.api.checkUserRole().subscribe(res=>{
      console.log(res);
      
    })
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
