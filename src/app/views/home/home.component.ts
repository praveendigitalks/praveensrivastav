import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {

  roles = [
    'MEAN Stack Developer',
    'MERN Stack Developer',
    'Next Js Developer',
    'Laravel Developer'
  ];

  roleIndex = 0;
  charIndex = 0;
  isDeleting = false;

  typingSpeed = 120;
  deletingSpeed = 60;
  holdTime = 1500;

  @ViewChild('roleText', { static: false }) roleSpan!: ElementRef<HTMLSpanElement>;

  ngAfterViewInit() {
    this.type();
  }

  private type() {
    const span = this.roleSpan?.nativeElement;
    if (!span) { return; }

    const currentRole = this.roles[this.roleIndex];

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
}
