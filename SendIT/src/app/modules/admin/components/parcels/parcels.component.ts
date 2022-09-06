import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css']
})
export class ParcelsComponent implements OnInit {
Date = new Date()

onLogout(){
  localStorage.clear()
  this.router.navigate([''])
}
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

}
