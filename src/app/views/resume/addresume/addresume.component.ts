import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { ResumeService } from '../resumeservice/resume.service';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addresume',
  imports: [],
  templateUrl: './addresume.component.html',
  styleUrl: './addresume.component.css'
})
export class AddresumeComponent {

  resume : any = [];

  constructor(private authService : AuthService, private resumeService : ResumeService, private router : Router){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.RESUME, ACTIONS.CREATE) && !this.authService.hasActionPermission(MODULE.RESUME, ACTIONS.UPDATE)){
       alert("You are not Authorized to access this module");
       this.router.navigateByUrl("/resume");
    }
  }

}
