import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoggedInGuard: boolean = false;

  constructor(
    private auth: AngularFireAuth,
    private toastr: ToastrService,
    private router: Router
  ) {}

  login(email: any, password: any) {
    this.auth
      .signInWithEmailAndPassword(email, password)
      .then((logRef) => {
        this.toastr.success('Logged in successfully!!!!');
        this.loadUser();
        this.isLoggedInGuard = true;
        this.loggedIn.next(true);
        this.router.navigate(['/login/dashboard']);
        console.log('========================> Redirected::!!!');
      })
      .catch((err) => {
        console.log(err);

        this.toastr.error(err);
      });
  }

  loadUser() {
    this.auth.authState.subscribe((user) => {
      localStorage.setItem('user', JSON.stringify(user));
    });
  }

  logOut() {
    this.auth.signOut().then(() => {
      this.toastr.success('User log out successfully...!!!');
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    });
  }

  isLoggeIn() {
    return this.loggedIn.asObservable();
  }
}
