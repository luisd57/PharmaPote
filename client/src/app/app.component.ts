import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { IUser } from './interfaces/User.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client';
  user: IUser = {
    username: '',
    password: '',
    treatments: [],
    role: 'user'
  };

  constructor(private authService: AuthService) { }

  register(user: IUser): void {
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered successfully.');
        alert(`Welcome ${response.user.username}.`);
        //TODO: user navigation and error handling
      },
      error: (error) => {
        console.error('Registration failed.');

      }
    });
  }

  login(user: IUser): void {
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('Successful user login.');
        alert(`Welcome ${response.user.username}.`);
        //TODO: user navigation and error handling
      },
      error: (error) => {
        console.error('Login failed.');

      }
    });
  }

  logout() {
    this.authService.logout().subscribe(() => {
      alert('disconnected');
    });
  }

}


