import { Component } from '@angular/core';
import { RoleService } from './roleservice/role.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-role',
  imports: [CommonModule, RouterModule],
  templateUrl: './role.component.html',
  styleUrl: './role.component.css',
})
export class RoleComponent {
  roleData: any = [];

  constructor(private roleService: RoleService) {}

  ngOnInit() {
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
