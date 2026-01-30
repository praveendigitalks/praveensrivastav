import { Component } from '@angular/core';
import { AuthService } from '../../authentication/authservice/auth.service';
import { PermissionService } from './permissionservice/permission.service';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permission',
  imports: [],
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent {
  permission : any = [];

  constructor(private authService : AuthService, private permisisonService : PermissionService, private router : Router){}

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.PERMISSION, ACTIONS.READ)){
      alert("You are not Authorised to access this Module");
      this.router.navigateByUrl("/");
    }
  }
}
