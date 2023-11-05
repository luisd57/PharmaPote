import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/User.interface';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  activeTab: string = 'login';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmitLogin(user: IUser): void {
    this.authService.login(user).subscribe({
      next: (response) => {
        console.log('User logged in successfully');
        alert(`Welcome ${response.user.username}`);
        this.router.navigate(['treatments/list']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }

  onSubmitRegister(user: IUser): void {
    this.authService.register(user).subscribe({
      next: (response) => {
        console.log('User registered successfully');
        alert(`Welcome ${response.user.username}`);
        this.router.navigate(['treatments/list']);
      },
      error: (error) => {
        this.errorMessage = error.error.message;
        setTimeout(() => {
          this.errorMessage = '';
        }, 5000);
      }
    });
  }


}