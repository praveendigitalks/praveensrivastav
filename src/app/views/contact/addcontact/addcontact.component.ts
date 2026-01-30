import { ACTIONS } from './../../../components/permission';
import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { ContactService } from '../contactservice/contact.service';
import { Router } from '@angular/router';
import { MODULE } from '../../../components/module';

@Component({
  selector: 'app-addcontact',
  imports: [],
  templateUrl: './addcontact.component.html',
  styleUrl: './addcontact.component.css'
})
export class AddcontactComponent {
 contact : any = [];

  constructor(private authService : AuthService, private contactService : ContactService, private router : Router){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.CONTACT, ACTIONS.CREATE) && !this.authService.hasActionPermission(MODULE.CONTACT, ACTIONS.UPDATE)){
       alert("You are not Authorized to access this module");
       this.router.navigateByUrl("/contact");
    }
  }

}
