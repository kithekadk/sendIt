import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ParcelActions from '../../../shared/ngrx/Actions/parcelActions'
import { getParcels, parcelState } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import { getUsers } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import { map } from 'rxjs';

@Component({
  selector: 'app-edit-parcel',
  templateUrl: './edit-parcel.component.html',
  styleUrls: ['./edit-parcel.component.css']
})
export class EditParcelComponent implements OnInit {

  receiverAddress: string = '';
  receiverLatitude: string = '';
  receiverLongitude: string = '';
  

  AddressChange(address: any) {
    this.receiverAddress = address.formatted_address;
    this.receiverLatitude = address.geometry.location.lat();
    this.receiverLongitude = address.geometry.location.lng();
  }

form!: FormGroup
id!:number
missing=false
filled = false
  constructor(private fb:FormBuilder, private store:Store<parcelState>,private route:ActivatedRoute,
    private router:Router) { }

  userEmails$ = this.store.select(getUsers)
  emails$ = this.store.select(getUsers)

  ngOnInit(): void {  
    this.loadEmails()

    this.store.dispatch(ParcelActions.loadParcels())
    this.userEmails$ = this.store.select(getUsers)
    this.route.params.subscribe(params=>{
      this.id=params['id']
    })
    

    this.form = this.fb.group({
      sender: [null, [Validators.required]],
      lat: [null, [Validators.required]],
      lng: [null, [Validators.required]],
      senderLat: [null, [Validators.required]],
      senderLng: [null, [Validators.required]],
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

    this.store.select(getParcels).subscribe(res=>{
      let thisParcel = res.filter(parcel=>parcel.parcelID==this.id)
      if(thisParcel){
        thisParcel.find(parcel=>{
        parcel.parcelID==this.id        
        if(parcel){
        this.form.patchValue({
          sender: parcel.sender,
          lat: parcel.lat,
          lng:parcel.lng,
          senderLat:parcel.senderLat,
          senderLng:parcel.senderLng,
          parcelWeight: parcel.parcelWeight,
          price:parcel.price,
          parcelDescription: parcel.parcelDescription,
          receiverLocation: parcel.receiverLocation,
          receiverPhone: parcel.receiverPhone,
          receiverEmail: parcel.receiverEmail,
          deliveryDate: parcel.deliveryDate
        })
      }
      })
      }


    })
  }
  updateParcel(){
    this.store.dispatch(ParcelActions.editParcel({id:this.id,parcel:{...this.form.value}}))
    this.filled = true
    this.store.dispatch(ParcelActions.loadParcels())
    this.router.navigate(['/admin/parcels'])
  }

  loadEmails(){
    this.emails$ = this.userEmails$.pipe(
      map(users => users.filter(user => user.email))
      )
  }

}
