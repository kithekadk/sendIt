import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map,  } from 'rxjs';
import { getParcels, parcelState } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import { getUsers } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import * as ParcelActions from '../../../shared/ngrx/Actions/parcelActions'

@Component({
  selector: 'app-view-one',
  templateUrl: './view-one.component.html',
  styleUrls: ['./view-one.component.css']
})
export class ViewOneComponent implements OnInit {
  Date = new Date();
  viewOne = false;
  id!:number


  @ViewChild(MapInfoWindow) infoWindow: MapInfoWindow | undefined;

  display: any;
  center: google.maps.LatLngLiteral = {
    lat: -0.4577,
    lng: 36.946,
  };

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }
  zoom = 6;
  filter=''
  filter2 =''

  constructor(private router: Router, private store: Store<parcelState>, private route:ActivatedRoute) {}

  /**
   * fetching all parcels
   */
  oneParcel$ = this.store.select(getParcels)
  oneParcel2$ = this.store.select(getParcels)

  getmyParcel(){
    this.oneParcel$ = this.oneParcel2$.pipe(
      map(res=>{
        console.log(res);
        
        let parcel = res.filter(el=>el.parcelID==this.id)
        console.log(parcel);
        
        return parcel
      })
    )
    return this.oneParcel$
  }
  
  ngOnInit(): void {
    
    this.store.dispatch(ParcelActions.loadParcels())
    this.route.params.subscribe(params=>{
      this.id=Number(params['id']) 
      console.log(typeof this.id);
      
    })
    this.getmyParcel()
    
  this.store.select(getUsers).subscribe((res)=>{      
      const coords = res.map((user)=>({
        lat: user.lat,
        lng: user.lng,
      }))      
      this.markerPositions = coords
      .concat([
        {lat: -0.4577, lng: 36.946}
      ])
    })

  }




  /**
   * 
   * @param displaying the map
   */
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

  // addMarker(event: google.maps.MapMouseEvent) {
  //   if (event.latLng != null) this.markerPositions.push(event.latLng.toJSON());
  // }
  openInfoWindow(marker: MapMarker) {
    if (this.infoWindow != undefined) this.infoWindow.open(marker);
  }
}
