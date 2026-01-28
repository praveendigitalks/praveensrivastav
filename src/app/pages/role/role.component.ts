import { Component } from '@angular/core';
import { RoleService } from './roleservice/role.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/authservice/auth.service';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';

@Component({
  selector: 'app-role',
  imports: [CommonModule, RouterModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  roleData: any = [];

  constructor(private roleService: RoleService, private authService : AuthService, private router : Router) {}

  ngOnInit() {

    if(!this.authService.hasActionPermission(MODULE.ROLE, ACTIONS.READ)){
      alert("Your are not Authorized to Acess this Module");
      this.router.navigateByUrl("/");

    }

    this.loadRole();
  }
  loadRole() {
    this.roleService.getRole().subscribe({
      next: (res: any) => {

        this.roleData = res
        // console.log('🚀 ~ RoleComponent ~ loadRole ~ res:', res);
      },
      error: (err) => {
        console.log('🚀 ~ RoleComponent ~ loadRole ~ err:', err);
      },
    });
  }
}
