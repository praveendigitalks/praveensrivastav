import { Component } from '@angular/core';
import { AuthService } from '../../authentication/authservice/auth.service';
import { ContactService } from './contactservice/contact.service';
import { Router } from '@angular/router';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';

@Component({
  selector: 'app-contact',
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {

  contact : any = [];

  constructor(private authService : AuthService, private contactService : ContactService, private router : Router){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.CONTACT, ACTIONS.READ)){
       alert("You are not Authorized to access this module");
       this.router.navigateByUrl("/");
    }
  }


}
