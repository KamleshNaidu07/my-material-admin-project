import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-material-admin-project';
  isDropdownOpen = false;
  constructor(public authService: AuthService) {}

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticatedReturn();
  }

  logout(): void {
    this.authService.logout();
  }

}
