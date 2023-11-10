import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/User.interface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  users: IUser[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users: IUser[]) => {
        this.users = users;
      },
      error: (error) => {
        console.error("Error fetching users:", error);
      }
    })
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe({
      next: (response) => {
        console.log("User deleted:", response);
        this.fetchUsers();
      },
      error: (error) => {
        console.error("Error deleting user:", error);
      }
    })
  }

}
