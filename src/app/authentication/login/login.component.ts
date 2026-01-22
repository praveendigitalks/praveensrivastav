import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
export interface ShapeConfig {
  type: 'rectangular' | 'rounded' | 'circular' | 'custom';
  borderRadius: string;
  customRadius: {
    topLeft: string;
    topRight: string;
    bottomLeft: string;
    bottomRight: string;
  };
}

@Component({
  selector: 'app-login',
    imports: [RouterModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

currentYear = new Date().getFullYear();

  onLogin: FormGroup;
  router = inject(Router);
  logoUrl!: string;


  onLogoError(event: any) {
    event.target.src = 'DigiLogocropped-removebg-preview 1.jpg'; // fallback image
  }
  constructor(
    private fb: FormBuilder,
  ) {
    this.onLogin = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      loginType: ['branch', Validators.required], // default selection
    });
  }

  // handleLogin(): void {
  //   const loginType = this.onLogin.get('loginType')?.value;
  //   if (loginType === 'branch') {
  //     this.Login();

  //   }else if (loginType === 'superadmin'){

  //     this.superadminlogin()

  //   }
  //   else {
  //     this.userlogin();
  //   }
  // }



  Login(): void {
    this.router.navigateByUrl('/')
  }

  hasModuleAccess(
    module: string,
    action: 'read' | 'create' | 'update' | 'delete' = 'read'
  ): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.some(
      (perm: any) =>
        perm.moduleName === module && perm.permissions?.[action] === 1
    );
  }

  ngOnInit() {








  }

  //   navigateBasedOnPermission(): void {
  //   const hasInpatientAccess = this.hasModuleAccess('inpatientCase');
  //   if (hasInpatientAccess) {
  //     this.router.navigate(['/dashboard']);
  //   } else {
  //     this.router.navigate(['/dashboard']);
  //   }
  // }





}
