import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
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
        this.router.navigate(['/login/dashboard']);
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
      this.router.navigate(['/login']);
    });
  }
}
