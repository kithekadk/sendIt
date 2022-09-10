import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as ParcelActions from 'src/app/modules/shared/ngrx/Actions/parcelActions';
import { getParcels } from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';

@Component({
  selector: 'app-outgoing',
  templateUrl: './outgoing.component.html',
  styleUrls: ['./outgoing.component.css']
})
export class OutgoingComponent implements OnInit {
  Date = new Date()
  myParcels$ = this.store.select(getParcels)
  myParcels2$ = this.store.select(getParcels)

  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
  constructor(private router:Router, private store:Store) { }

  ngOnInit(): void {
    this.store.dispatch(ParcelActions.loadParcels())
    this.getrightParcel()
  }

  getrightParcel(){
    this.myParcels$ = this.myParcels2$.pipe(
      map(res=>{
        let parcel = res.filter(parcel=>parcel.sender == localStorage.getItem('email'))
        console.log('parcel',parcel);
        
        return parcel
      })
    )
    return this.myParcels$
  }
}
