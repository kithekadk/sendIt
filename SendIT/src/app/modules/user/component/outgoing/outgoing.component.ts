import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.css']
})
export class OutgoingComponent implements OnInit {
  Date = new Date()

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
