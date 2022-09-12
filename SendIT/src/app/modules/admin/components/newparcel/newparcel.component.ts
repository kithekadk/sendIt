import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Event, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { finalize, map, Observable, of, tap } from 'rxjs';
import { candidates } from 'src/app/interfaces/parcelInterfaces';
import { parcelState } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import { getUsers } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import { ApiService } from 'src/app/services/api.service';
import * as parcelActions from '../../../shared/ngrx/Actions/parcelActions'
import * as userActions from '../../../shared/ngrx/Actions/userActions';

@Component({
  selector: 'app-newparcel',
  templateUrl: './newparcel.component.html',
  styleUrls: ['./newparcel.component.css']
})
export class NewparcelComponent implements OnInit {
  receiverAddress: string = '';
  receiverLatitude: string = '';
  receiverLongitude: string = '';
  receiverAddress1: string = '';
  receiverLatitude1: string = '';
  receiverLongitude1: string = '';

  AddressChange(address: any) {
    this.receiverAddress = address.formatted_address;
    this.receiverLatitude = address.geometry.location.lat();
    this.receiverLongitude = address.geometry.location.lng();
  }
  
  Date = new Date()
  filled = false
  places$: Observable<candidates[]> = of([]);
  places = [
    {
      name: 'nyeri',
      geometry: {
        lat: '12',
        lng: '13'
      }
    }
  ];
  isLoading = false;
  selectedPlace!: candidates;
  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router, private fb:FormBuilder, 
    private store:Store<parcelState>) { }
form!: FormGroup
missing=false

  ngOnInit(): void {
    this.form = this.fb.group({
      sender: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lng: [null, [Validators.required]],
      parcelWeight: [null, [Validators.required]],
      price: [null, [Validators.required]],
      parcelDescription: [null, [Validators.required]],
      receiverLocation: [null, [Validators.required]],
      receiverPhone: [null, [Validators.required]],
      receiverEmail: [null, [Validators.required]],
      deliveryDate: [null, [Validators.required]]
    })

    this.form.get('parcelWeight')!.valueChanges.subscribe(res=>{
      this.form.get('price')!.setValue(res*350)
      
    })
    
    this.store.dispatch(userActions.loadUsers())
    this.getLocation()
  }

  userEmails$ = this.store.select(getUsers)
  emails$ = this.userEmails$.pipe(
    map(users => users.filter(user => user.email))
  ).pipe(
    finalize(() => {})
  )


  callApi(Longitude:number, Latitude:number){
    const url = `https://api-adresse.data.gouv.fr/reverse/?lon=${Longitude}%lat=${Latitude}`
  }

  getLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude,latitude)
        this.form.get('lat')?.setValue(latitude)
        this.form.get('lng')?.setValue(longitude)
        this.callApi(longitude, latitude);
      });
    }else{
      console.log('no support for geolocation')
    }
  }

  createParcel(){
    if(this.form){
      this.store.dispatch(parcelActions.createParcel({parcel:{...this.form.value}}))
      this.store.dispatch(parcelActions.loadParcels())
      console.log(this.form.value);
      this.filled=true
      setTimeout(() => {
        this.router.navigate(['/admin/parcels'])
      }, 1500);  
    }
    else{
      this.missing=true
    }
  }
}
