import { Injectable } from '@angular/core';
import { Router } from '@angular/router'; // Import the Router service

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private previousUrl: string = ''; // Initialize previousUrl

  constructor(private router: Router) { 
    // Check if there's a stored authentication state in local storage on service initialization
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth) {
      this.isAuthenticated = JSON.parse(storedAuth); // Parse the stored value to a boolean
    }
  }

  login(username: string, password: string): boolean {
    // Implement your authentication logic here
    // For example, check if the provided credentials are valid
    if (username === 'admin' && password === 'password') {
      this.isAuthenticated = true;
      // Store the authentication state in local storage
      localStorage.setItem('isAuthenticated', JSON.stringify(this.isAuthenticated));
      return true;
    }
    return false;
  }

  isAuthenticatedReturn(): boolean {
    return this.isAuthenticated;
  }

  setAuthenticated(status: boolean): void {
    this.isAuthenticated = status;
  }

  // Set the previous URL
  setPreviousUrl(url: string): void {
    this.previousUrl = url;
  }

  // Get the previous URL
  getPreviousUrl(): string {
    return this.previousUrl;
  }

  logout(): void {
    this.isAuthenticated = false;

    // Remove the stored authentication state from local storage
    localStorage.removeItem('isAuthenticated');

    this.router.navigate(['/login']);
  }
}
