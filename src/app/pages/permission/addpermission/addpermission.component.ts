import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { PermissionService } from '../permissionservice/permission.service';
import { Router } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';

@Component({
  selector: 'app-addpermission',
  imports: [],
  templateUrl: './addpermission.component.html',
  styleUrl: './addpermission.component.css'
})
export class AddpermissionComponent {

  permission : any = [];

  constructor(private authService : AuthService, private permissionService : PermissionService, private router : Router){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.PERMISSION, ACTIONS.CREATE) && !this.authService.hasActionPermission(MODULE.PERMISSION, ACTIONS.CREATE) ){
      alert("You are not Authorized to access this module");
      this.router.navigateByUrl("/permission");
    }
  }

}
