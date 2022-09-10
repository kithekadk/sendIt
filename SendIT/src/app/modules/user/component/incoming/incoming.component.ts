import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import { getParcels} from 'src/app/modules/shared/ngrx/Reducer/parcelReducer';
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
        let parcel = res.filter(parcel=>parcel.receiverEmail == localStorage.getItem('email'))
        console.log('parcel',parcel);
        
        return parcel
      })
    )
    return this.myParcels$
  }

}
