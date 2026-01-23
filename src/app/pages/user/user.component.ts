import { Component } from '@angular/core';
import { UserService } from './userservice/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from "@angular/router";

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userData: any = [];
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUser().subscribe({
      next: (res) => {
        // console.log('🚀 ~ UserComponent ~ loadUsers ~ res:', res);
        this.userData = res;
      },
      error: (err) => {
        console.log('🚀 ~ UserComponent ~ loadUsers ~ err:', err);
      },
    });
  }
}
