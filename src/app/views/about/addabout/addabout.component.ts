import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { Router } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';

@Component({
  selector: 'app-addabout',
  imports: [],
  templateUrl: './addabout.component.html',
  styleUrl: './addabout.component.css'
})
export class AddaboutComponent {

  constructor(private authService : AuthService, private router : Router){}

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.ABOUT, ACTIONS.CREATE)){
      alert('You are not Authorized to Access this Module!')
      this.router.navigateByUrl('/about');
    }
  }

}
