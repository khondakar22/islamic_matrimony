import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AlertifyService } from '../services/alertify/alertify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {}
  canActivate(): boolean  {
    if (this.authService.loggedIn()) {
      return true;
    } else {
      this.alertify.error('You shall not pass!!!');
      this.router.navigate(['/']);
      return false;
    }

  }

}
