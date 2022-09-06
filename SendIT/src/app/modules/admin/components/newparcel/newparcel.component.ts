import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newparcel',
  templateUrl: './newparcel.component.html',
  styleUrls: ['./newparcel.component.css']
})
export class NewparcelComponent implements OnInit {
  Date = new Date()

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
