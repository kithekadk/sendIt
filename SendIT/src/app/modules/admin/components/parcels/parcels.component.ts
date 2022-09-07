import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Loader } from '@googlemaps/js-api-loader';

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

viewOne = false
  constructor(private router:Router) { }

  ngOnInit(): void {

  }

view(){
  this.viewOne = !this.viewOne
  let loader = new Loader({
    apiKey:'AIzaSyCTmVHTqmMqYwglOHEpKV2S_QUKtzQAA2k'
  })

  loader.load().then(()=>{
    new google.maps.Map(document.getElementById('map') as HTMLDivElement,{
      center:{lat: 51.2345, lng:6.78333},
      zoom:8
    })
  })
}
}
