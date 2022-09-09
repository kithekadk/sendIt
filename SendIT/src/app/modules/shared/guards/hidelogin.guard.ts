import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HideloginGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(){
    if (localStorage.getItem('token')){
      this.router.navigate(['/']);
      return true
    }else{
      this.router.navigate(['/login']);
      return false
    }
  }
  
}
