import { Component, OnInit } from '@angular/core';
// import {data} from '../interfaces/interfaces'
export interface data{
  email: string;
  password: string
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
