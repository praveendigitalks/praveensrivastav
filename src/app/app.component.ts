import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  ngOnInit() {

    if (!localStorage.getItem('deviceId')) {
      // localStorage.setItem('deviceId', crypto.randomUUID());
      localStorage.setItem('deviceId', (window.crypto?.randomUUID?.() || Date.now().toString()));
    }

    const user = localStorage.getItem('profileUser');
    // console.log("User:", user);

    // ✅ Default background first
    document.body.style.backgroundImage = "url('/Bg.jpeg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center center";

    // ✅ If logged in → override with tenant image
    if (user) {
      const parsed = JSON.parse(user);
      const heroImage = parsed?.tenantId?.heroImage;

      if (heroImage) {
        // const fullUrl = 'http://localhost:5000' + heroImage;
        const fullUrl = 'https://praveensrivastav-backend.onrender.com' + heroImage;


        document.body.style.backgroundImage = `url(${fullUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center center";
      }
    }
  }
}
