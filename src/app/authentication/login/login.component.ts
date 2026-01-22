  import { CommonModule } from '@angular/common';
  import { Component, inject } from '@angular/core';
  import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
  import { Router, RouterModule } from '@angular/router';
  import { AuthService } from '../authservice/auth.service';


  @Component({
    selector: 'app-login',
    imports: [RouterModule, ReactiveFormsModule, CommonModule],
    standalone: true,
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
  })
  export class LoginComponent {

    currentYear = new Date().getFullYear();

    onLogin: FormGroup;
    router = inject(Router);


    constructor(
      private fb: FormBuilder, private authService: AuthService
    ) {
      this.onLogin = fb.group({
        userName: ['', Validators.required],
        password: ['', Validators.required],

      });
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

    Login() {
      if (this.onLogin.invalid) {
        console.log("Please the Form Correctly")
      }

      const payload = {
        userName: this.onLogin.value.userName,
        password: this.onLogin.value.password
      }

      this.authService.postLogin(payload).subscribe({
        next: (res: any) => {
          console.log(res, "response");
        }, error: (err) => {
          console.log(err);

        }
      })
    }

  }
