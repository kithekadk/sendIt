import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { loginMessage,UserInfo, user, userReg } from '../interfaces/interfaces';
import { candidates, MapPlace, parcel, place } from '../interfaces/parcelInterfaces';
import { data } from '../modules/shared/interfaces/interfaces';

export interface message{
  message:string
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  createUser(client: userReg):Observable<{message:string}>{
    return this.http.post<{message:string}>('http://localhost:4400/user/create', client)
      
  }

  getUsers(){
    return this.http.get<user[]>('http://localhost:4400/user/getUsers').pipe
    (map((res)=>{
      return res
    }))
  }

  loginUser(user:data):Observable<loginMessage>{
    this.checkUserRole()
    return this.http.post<loginMessage>('http://localhost:4400/user/login', user);
  }

  checkUserRole(){
    let token = localStorage.getItem('token') as string
    return this.http.get<UserInfo>('http://localhost:4400/user/check',{
      headers: new HttpHeaders({
        "token": token
      })
      
    }).pipe(map((res)=>{
      localStorage.setItem('role', res.role)      
      localStorage.setItem('email', res.email)
    return res.role
  }))
  }
/**
 * 
 * @param parcel 
 * 
 * ******************************
 * @all about parcels
 */
  createParcel(parcel:parcel):Observable<{message:string}>{
    return this.http.post<{message:string}>('http://localhost:4400/parcel/create',parcel)
  }

  getAllParcels(){
    return this.http.get<parcel[]>('http://localhost:4400/parcel/allparcels').pipe(
      map((res)=>{
        return res
      })
    )
  }


  /**
   * using places api
   */
   loadPlaces(search: string): Observable<MapPlace> {
    return this.http.get<MapPlace>(
      'https://maps.googleapis.com/maps/api/place/findplacefromtext/json',
      {
        params: {
          input: search,
          inputtype: 'textquery',
          key: 'AIzaSyBuvVn5bGQtP3kSYSewu9Gb6_jZ7ySO75A'
        }
      }
    )
  }

  setLocation(place:place):Observable<{message:string}>{
    return this.http.post<{message:string}>('http://localhost:4400/user/setlocation',place)
  }
}
