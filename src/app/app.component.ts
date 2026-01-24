import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'praveensrivastva';

  ngOnInit() {
  if (!localStorage.getItem('deviceId')) {
    localStorage.setItem('deviceId', crypto.randomUUID());
  }
}

}
