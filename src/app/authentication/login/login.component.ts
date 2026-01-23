import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../authservice/auth.service';

@Component({
  selector: 'app-login',
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  currentYear = new Date().getFullYear();

  onLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router : Router,
  ) {
    this.onLogin = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  hasModuleAccess(
    module: string,
    action: 'read' | 'create' | 'update' | 'delete' = 'read',
  ): boolean {
    const permissions = JSON.parse(localStorage.getItem('permissions') || '[]');
    return permissions.some(
      (perm: any) =>
        perm.moduleName === module && perm.permissions?.[action] === 1,
    );
  }

  ngOnInit() {}

  Login() {
    if (this.onLogin.invalid) {
      console.log('Please the Form Correctly');
    }

    const payload = {
      userName: this.onLogin.value.userName,
      password: this.onLogin.value.password,
    };

    this.authService.postLogin(payload).subscribe({
      next: (res: any) => {
        // console.log(res, 'response');
        if (res.token) {
          localStorage.setItem('profileToken', res.token);
           localStorage.setItem('profileUser', JSON.stringify(res.user));
           this.router.navigateByUrl('/')
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

   getUser(): any {
    const userStr = localStorage.getItem('profileUser');
    console.log("🚀 ~ AuthService ~ getUser ~ userStr:", userStr)

    return userStr ? JSON.parse(userStr) : null;

  }
}
