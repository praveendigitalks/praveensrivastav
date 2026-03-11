import { Component } from '@angular/core';
import { AuthService } from '../../authentication/authservice/auth.service';
import { ContactService } from './contactservice/contact.service';
import { Router } from '@angular/router';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';
import { SHARED_IMPORTS } from '../../components/sharedImport';

@Component({
  selector: 'app-contact',
  imports: [SHARED_IMPORTS],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
    isLogin = false;
  contact : any = [];

  constructor(private authService : AuthService, private contactService : ContactService, private router : Router){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.CONTACT, ACTIONS.READ)){
       alert("You are not Authorized to access this module");
       this.router.navigateByUrl("/");
    }

      this.isLogin = this.authService.isLoggedIn();
    // console.log('[About] isLogin =', this.isLogin);
    this.loadContact();

  }


  /* ================== NAV / ACTIONS ================== */


  addContact(): void {
    // console.log('[About] addAbout clicked');
    this.router.navigateByUrl('/addcontact');
  }


    /* ================== API LOAD ================== */

  private loadContact(): void {
    // console.log('[About] loadAbout() called');

    this.contactService.getContact().subscribe({
      next: (res) => {
        // console.log('[About] API success, res =', res);
        this.contact = res[0] || [];

        console.log(
          "conatc data",this.contact,

        );


      },
      error: (err) => {
        console.error('[About] Error loading about data:', err);
      }
    });
  }


  editContact(contactId : string){
    console.log("🚀 ~ ContactComponent ~ editContact ~ contactId:", contactId)
    this.router.navigate(['/addcontact',contactId])
  }


}
