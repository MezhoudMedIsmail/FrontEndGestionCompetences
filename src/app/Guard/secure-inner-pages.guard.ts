import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TokenService} from '../Services/token.service';
import {EntryService} from "../Services/entry.service";

@Injectable({
  providedIn: 'root',
})
export class SecureInnerPagesGuard implements CanActivate {
  constructor(
    public tokenStorageService: TokenService,
    public router: Router,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenStorageService.getToken()) {
      this.router.navigate(['/Dashboard'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }
    return true;
  }
}
