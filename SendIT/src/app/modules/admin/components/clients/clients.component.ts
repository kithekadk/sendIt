import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  Date = new Date()

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router) { }

  ngOnInit(): void {

  }

}
