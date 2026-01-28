import { Component } from '@angular/core';
import { UserService } from './userservice/user.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from "@angular/router";
import { AuthService } from '../../authentication/authservice/auth.service';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';

@Component({
  selector: 'app-user',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  userData: any = [];
  constructor(private userService: UserService,private authService : AuthService, private router : Router) {}

  ngOnInit() {
    if(!this.authService.hasActionPermission(MODULE.USER, ACTIONS.READ)){
      alert("You are Not Authorized to Access this Module");
      this.router.navigateByUrl('/');
    }
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
