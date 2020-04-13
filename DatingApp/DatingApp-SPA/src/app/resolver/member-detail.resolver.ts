import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { User } from '../models/User';
import { Observable, of } from 'rxjs';
import { UserService } from '../services/user.service';
import { AlertifyService } from '../services/alertify/alertify.service';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberDetailResolver implements Resolve<User> {
  constructor(private userService: UserService,
              private router: Router,
              private alertify: AlertifyService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): User | Observable<User> | Promise<User> {
    return this.userService.getUser(+route.params.id).pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/members']);
        return of(null);
      })
    );
  }

}
