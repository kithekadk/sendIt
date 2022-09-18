import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Actions from '../../../shared/ngrx/Actions/userActions';
import { Store } from '@ngrx/store';
import { map} from 'rxjs';
import { userState } from 'src/app/modules/shared/ngrx/Reducer/userReducer';
import { getUsers} from '../../../shared/ngrx/Reducer/userReducer'

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  Date = new Date()
  filter=''
  pageNumber:number=1
errorMsg!:string
  constructor(private router:Router, private store:Store<userState>) { }

 users$=this.store.select(getUsers).pipe(
  map(res=>{
    return res
  },(err:Error)=>{
    this.errorMsg=err.message
    console.log(err.message);
    
  })
 )

  ngOnInit(): void {
    this.store.dispatch(Actions.loadUsers())
    }
  
  onLogout(){
    localStorage.clear()
    this.router.navigate([''])
  }
}
