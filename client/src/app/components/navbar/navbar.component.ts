import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isAdmin: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.adminCheck();
  }

  logout(): void {
    this.authService.logout().subscribe({
      error: (err) => console.error(err)
    });
  }

  adminCheck(): void {
    this.authService.getCurrentUser()?.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
  }

}
