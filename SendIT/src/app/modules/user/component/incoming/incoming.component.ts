import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit {
  Date = new Date()

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
