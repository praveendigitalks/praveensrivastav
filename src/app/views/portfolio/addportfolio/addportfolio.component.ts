import { Component } from '@angular/core';
import { AuthService } from '../../../authentication/authservice/auth.service';
import { PortfolioService } from '../portfolioservice/portfolio.service';
import { Router } from '@angular/router';
import { MODULE } from '../../../components/module';
import { ACTIONS } from '../../../components/permission';

@Component({
  selector: 'app-addportfolio',
  imports: [],
  templateUrl: './addportfolio.component.html',
  styleUrl: './addportfolio.component.css'
})
export class AddportfolioComponent {

   portfolio : any = [];

  constructor(private authService : AuthService, private portfolioService : PortfolioService, private router : Router){};

  ngOnInit(){
    if(!this.authService.hasActionPermission(MODULE.PORTFOLIO, ACTIONS.CREATE) && !this.authService.hasActionPermission(MODULE.PORTFOLIO, ACTIONS.UPDATE)){
       alert("You are not Authorized to access this module");
       this.router.navigateByUrl("/portfolio");
    }
  }


}
