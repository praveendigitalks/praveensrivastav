import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/authservice/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {

  isLogin=false
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}
  ngOnInit() {
    this.Isloggin();
  }
  isMobileOpen = false;

  toggleMenu() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMenu() {
    this.isMobileOpen = false;
  }

  logout() {
    localStorage.removeItem('profileToken');
    localStorage.removeItem('profileUser');
    this.router.navigateByUrl('/');
  }

  Isloggin() {
   this.isLogin = this.authService.isLoggedIn()
  }
}
