import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../components/sharedImport';
import { AuthService } from '../../authentication/authservice/auth.service';
import { ResumeService } from './resumeservice/resume.service';
import { Router } from '@angular/router';
import { MODULE } from '../../components/module';
import { ACTIONS } from '../../components/permission';

@Component({
  selector: 'app-resume',
  imports: [SHARED_IMPORTS],
  templateUrl: './resume.component.html',
  styleUrl: './resume.component.css'
})
export class ResumeComponent {

  resume : any = [];

  constructor(private authService : AuthService, private resumeService : ResumeService, private router : Router ){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.RESUME, ACTIONS.READ)){
      alert("You are not Authorized to access this Module");
      this.router.navigateByUrl("/");
    }
  }

}
