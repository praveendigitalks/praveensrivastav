import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { TenantService } from '../tenantService/tenant.service';

@Component({
  selector: 'app-tenants',
  imports: [SHARED_IMPORTS],
  templateUrl: './tenants.component.html',
  styleUrl: './tenants.component.css'
})
export class TenantsComponent {

  tenants : any = [];

  constructor(private tenantService : TenantService){}

  ngOnInit(){
    this.loadTenant()
  }

    loadTenant(){
      this.tenantService.getTenant().subscribe( res =>{
        // console.log("🚀 ~ TenantsComponent ~ loadTenant ~ res:", res);
        this.tenants = res;

      })
    }

    currentPage = 1;
  totalPages = 2;

}
