import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getParcels, parcelState } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import * as Actions from '../../../shared/ngrx/Actions/parcelActions'

@Component({
  selector: 'app-parcels',
  templateUrl: './parcels.component.html',
  styleUrls: ['./parcels.component.css'],
})
export class ParcelsComponent implements OnInit {
  Date = new Date();
  viewOne = false;


  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -0.4577,
    lng: 36.946,
  };
  zoom = 6;
  filter=''

  constructor(private router: Router, private store: Store<parcelState>) {}
  parcels$ = this.store.select(getParcels)
  
  
  
  ngOnInit(): void {
    this.store.dispatch(Actions.loadParcels())

  
    this.markerPositions = this.markerPositions.concat([
      {
        lat: -0.4577,
        lng: 36.946,
      },
      {
        lat: -0.7577,
        lng: 34.946
      }
    ]);
  }

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  }
  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }

  view() {
    this.viewOne = !this.viewOne;
  }
}
