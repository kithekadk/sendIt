import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { place } from 'src/app/interfaces/parcelInterfaces';
import { getParcels} from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import { ApiService } from 'src/app/services/api.service';
import * as ParcelActions from '../../../shared/ngrx/Actions/parcelActions'

@Component({
  selector: 'app-incoming',
  templateUrl: './incoming.component.html',
  styleUrls: ['./incoming.component.css']
})
export class IncomingComponent implements OnInit {
  Date = new Date()
  myParcels$ = this.store.select(getParcels)
  myParcels2$ = this.store.select(getParcels)
  place={
  email: localStorage.getItem('email'),  
  lat:0,
  lng:0}
  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router, private store:Store, private api:ApiService) { }

  ngOnInit(): void {
    
    this.store.dispatch(ParcelActions.loadParcels())
    this.getrightParcel()
    this.getLocation()

  }
  callApi(Longitude:number, Latitude:number){
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}%lat=${Latitude}`
  }

  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude,latitude)
        this.place.lat=(latitude)
        this.place.lng=(longitude)
        this.callApi(longitude, latitude);

        this.api.setLocation(this.place).subscribe(res=>{
          console.log(res);
          
        })

      });
    }else{
      console.log('no support for geolocation')
    }
  }

  getrightParcel(){
    this.myParcels$ = this.myParcels2$.pipe(
      map(res=>{
        let parcel = res.filter(parcel=>parcel.receiverEmail == localStorage.getItem('email'))
        
        return parcel
      })
    )
    return this.myParcels$
  }

  oneParcel(id:number){
    this.store.dispatch(ParcelActions.SelectedId({parcelID:id}))

    this.router.navigate([`/user/view/${id}`])
  }
}
