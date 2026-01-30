import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addrole',
  imports: [SHARED_IMPORTS],
  templateUrl: './addrole.component.html',
  styleUrl: './addrole.component.css'
})
export class AddroleComponent {

  roleForm : FormGroup;

  constructor( private fb : FormBuilder, private authService : AuthService, private router : Router){
    this.roleForm = this.fb.group({})
  }

  ngOnInit(){
  if(!this.authService.hasActionPermission(MODULE.ROLE, ACTIONS.CREATE) && !this.authService.hasActionPermission(MODULE.ROLE, ACTIONS.UPDATE)){
    alert("Your are not Authorized to Access this Module");
  this.router.navigateByUrl("/role");
  }

  }

  OnSubmit(){}

}
