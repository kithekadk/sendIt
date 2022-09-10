import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class HideloginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(){
    if (localStorage.length<=1){
      return true
  }else{
     this.router.navigate(['/'])
     localStorage.clear()
     return false
  }
 
  
}
}
