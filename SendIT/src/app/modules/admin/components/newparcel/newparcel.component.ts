import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { parcelState } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
import * as parcelActions from '../../../shared/ngrx/Actions/parcelActions'

@Component({
  selector: 'app-newparcel',
  templateUrl: './newparcel.component.html',
  styleUrls: ['./newparcel.component.css']
})
export class NewparcelComponent implements OnInit {
  Date = new Date()

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router, private fb:FormBuilder, private store:Store<parcelState>) { }
form!: FormGroup
  ngOnInit(): void {
    this.form = this.fb.group({
      sender: [null, [Validators.required]],
      senderLocation: [null, [Validators.required]],
      parcelWeight: [null, [Validators.required]],
      price: [null, [Validators.required]],
      parcelDescription: [null, [Validators.required]],
      receiverLocation: [null, [Validators.required]],
      receiverPhone: [null, [Validators.required]],
      receiverEmail: [null, [Validators.required]],
      deliveryDate: [null, [Validators.required]]
    })
  }

  createParcel(){
    this.store.dispatch(parcelActions.createParcel({parcel:{...this.form.value}}))
  }
}
