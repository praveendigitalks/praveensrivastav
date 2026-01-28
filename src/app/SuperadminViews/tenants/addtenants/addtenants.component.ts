import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { UserService } from '../../../pages/user/userservice/user.service';
import { TenantService } from '../tenantService/tenant.service';

@Component({
  selector: 'app-addtenants',
  imports: [RouterLink, SHARED_IMPORTS],
  templateUrl: './addtenants.component.html',
  styleUrl: './addtenants.component.css',
})
export class AddtenantsComponent {
  tenantForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private tenantService: TenantService
  ) {
    this.tenantForm = this.fb.group({
      tenantName: ['', Validators.required],
      tenantPhoneNo: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  OnSubmit() {
    if (this.tenantForm.invalid) {
      console.log('Please Fill Form Correctly');
    }

    // console.log(this.tenantForm.value, "user data")
    this.tenantService.createTenant(this.tenantForm.value).subscribe({
      next: (res) => {
        console.log('🚀 ~ AdduserComponent ~ OnSubmit ~ res:', res);
        this.router.navigateByUrl('/superadmin/tenant');
        this.tenantForm.reset();
      },
      error: (err) => {
        console.log('🚀 ~ AdduserComponent ~ OnSubmit ~ err:', err);
      },
    });
  }
}
