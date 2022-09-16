import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { parcel } from 'src/app/interfaces/parcelInterfaces';
import { getOneParcel, getParcels, parcelState } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import { getUsers } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
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
  filter2 =''

  constructor(private router: Router, private store: Store<parcelState>) {}

  /**
   * fetching all parcels
   */
  parcels$ = this.store.select(getParcels)
  parcels2$ = this.store.select(getParcels)
  oneParcel$ = this.store.select(getOneParcel)
  
  ngOnInit(): void {
    this.store.dispatch(Actions.loadParcels())

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

  onLogout() {
    localStorage.clear();
    this.router.navigate(['']);
  }


/**
 * 
 *  filtering by parcel status
 * filtered data
 */
  filterStatus(status:string) {
    this.parcels2$ = this.parcels$.pipe(
      map( parcels=>{
        let parcel = parcels.filter(el=>status===''?true:el.status === status || el.status==='')
        return parcel
      })
    )
    return this.parcels2$
  }

  toAll(){
    this.router.navigate(['/admin/parcels'])
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
/**
 * toggle view on click
 */
  view(id:number) {

    this.viewOne = !this.viewOne;
    this.oneParcel(id)
  }

  /**
   *  delete a parcel
   */

  deleteParcel(id:number){    
    this.store.dispatch(Actions.deleteParcel({id:id}))
    this.store.dispatch(Actions.loadParcels())
  }

  oneParcel(id:number){
    this.store.dispatch(Actions.SelectedId({parcelID:id}))

    this.router.navigate([`/admin/view/${id}`])
  }
}
