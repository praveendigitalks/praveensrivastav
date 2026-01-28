import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../components/sharedImport';
import { AuthService } from '../../authentication/authservice/auth.service';
import { TenantService } from '../../SuperadminViews/tenants/tenantService/tenant.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [SHARED_IMPORTS, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {


  userData : any =[];
  // tenantData : any = []
  tenantData: any = null;  // Or type your Tenant interface

loadUser() {
  this.userData = this.authService.getUser();
  const tenantId = this.userData?.tenantId;
  this.tenantService.getTenantbyID(tenantId).subscribe(res => {
    this.tenantData = res;  // Single object
  });
}

  constructor(private authService : AuthService, private tenantService : TenantService){}

  ngOnInit(){
    this.loadUser();
  }

  // loadUser(){
  //   this.userData =this.authService.getUser()
  //   // console.log("🚀 ~ FooterComponent ~ loadUser ~ this.userData:", this.userData)
  //   const tenantId = this.userData?.tenantId
  //   // console.log("🚀 ~ FooterComponent ~ loadUser ~ tenantId:", tenantId)
  //   this.tenantService.getTenantbyID(tenantId).subscribe(res =>{
  //   // console.log("🚀 ~ FooterComponent ~ loadUser ~ res:", res)
  //   this.tenantData = res;

  //   })
  // }


tryme(){
  console.log("i am clickable")
}


}
