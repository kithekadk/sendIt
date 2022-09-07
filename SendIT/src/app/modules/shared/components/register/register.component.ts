import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/interfaces';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, private api:ApiService,
              private router:Router) { }
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
    const client={
      form : this.form.value
    }
    this.api.createUser(client.form).subscribe((res)=>{
      
      this.router.navigate(['/login'])
    })
  }
}
