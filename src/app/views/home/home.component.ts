// home.component.ts
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../authentication/authservice/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements AfterViewInit {
  isLogin = false;

  // 👇 roles that will be typed in <span #roleText>
  roles: string[] = [
    // default (when no user logged in)
    'MEAN Stack Developer',
    'MERN Stack Developer',
    'Next.js Developer',
    'Angular Developer',
    'Node.js Backend Engineer',
    'Fullstack Engineer',
  ];

  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;
  typingSpeed = 80;
  deletingSpeed = 50;
  holdTime = 1500;

  tenantName = '';

  @ViewChild('roleText', { static: false })
  roleSpan!: ElementRef<HTMLSpanElement>;

  isMobileOpen = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLogin = this.authService.isLoggedIn();

    if (!localStorage.getItem('deviceId')) {
      localStorage.setItem('deviceId', crypto.randomUUID());
    }

    const user = localStorage.getItem('profileUser');

    // default background
    document.body.style.backgroundImage = "url('/Bg.jpeg')";
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center center';

    if (user) {
      const parsed = JSON.parse(user);

      const tenant = parsed?.tenantId;
      if (tenant) {
        this.tenantName = tenant.tenantName || '';

        // 🔹 take tenant.bio and convert to roles for typing
        const bio: string = tenant.bio || '';

        // EXAMPLE 1: "i am an engineer"  -> ["Engineer"]
        // EXAMPLE 2: "I'm a Backend Developer , I'm a Fullstack Developer ,..."
        //            -> ["Backend Developer", "Fullstack Developer", "Nextjs Developer", ...]
        const extracted = this.extractRolesFromBio(bio);

        if (extracted.length) {
          this.roles = extracted;
        }
      }

      const heroImage = parsed?.tenantId?.heroImage;
      // if (heroImage) {
      //   const fullUrl = 'http://localhost:5000' + heroImage;
      //   document.body.style.backgroundImage = `url(${fullUrl})`;
      //   document.body.style.backgroundSize = 'cover';
      //   document.body.style.backgroundPosition = 'center center';
      // }
      if (heroImage) {
        const fullUrl = 'https://praveensrivastav-backend.onrender.com' + heroImage;
        document.body.style.backgroundImage = `url(${fullUrl})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center center';
      }



    }
  }

  // bio → array of clean role strings
  private extractRolesFromBio(bio: string): string[] {
    if (!bio) return [];

    // split by comma first
    let parts = bio.split(',');

    // if there was no comma (e.g. "i am an engineer") => single part
    if (parts.length === 1) {
      parts = [bio];
    }

    return parts
      .map((p) => p.trim())
      .filter((p) => !!p)
      .map((p) => {
        // remove "I'm", "I am", "i'm", "i am", etc.
        let cleaned = p.replace(/^i'?m\s+/i, '').replace(/^i\s+am\s+/i, '');
        // remove leading "a" / "an"
        cleaned = cleaned.replace(/^a\s+/i, '').replace(/^an\s+/i, '');
        // capitalize first letter nicely
        cleaned = cleaned.charAt(0).toUpperCase() + cleaned.slice(1);
        return cleaned.trim();
      })
      .filter((p) => !!p);
  }

  ngAfterViewInit() {
    this.type();
  }

  private type() {
    const span = this.roleSpan?.nativeElement;
    if (!span) return;

    const currentRole = this.roles[this.roleIndex] || '';

    if (!this.isDeleting) {
      span.textContent = currentRole.substring(0, this.charIndex + 1);
      this.charIndex++;

      if (this.charIndex === currentRole.length) {
        setTimeout(() => {
          this.isDeleting = true;
          this.type();
        }, this.holdTime);
        return;
      }

      setTimeout(() => this.type(), this.typingSpeed);
    } else {
      span.textContent = currentRole.substring(0, this.charIndex - 1);
      this.charIndex--;

      if (this.charIndex === 0) {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        setTimeout(() => this.type(), this.typingSpeed);
        return;
      }

      setTimeout(() => this.type(), this.deletingSpeed);
    }
  }

  toggleMenu() {
    this.isMobileOpen = !this.isMobileOpen;
  }

  closeMenu() {
    this.isMobileOpen = false;
  }
}
