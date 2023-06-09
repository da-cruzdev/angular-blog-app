import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userEmail!: string;
  isLogIn$!: Observable<boolean>;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.userEmail = JSON.parse(localStorage.getItem('user') || '').email;
    this.isLogIn$ = this.authService.isLoggeIn();
  }

  onLogout() {
    this.authService.logOut();
  }
}
