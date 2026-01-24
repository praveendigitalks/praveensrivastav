import { AuthService } from './../../../authentication/authservice/auth.service';
import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { UserService } from '../../user/userservice/user.service';

@Component({
  selector: 'app-loggeddevices',
  imports: [SHARED_IMPORTS],
  templateUrl: './loggeddevices.component.html',
  styleUrl: './loggeddevices.component.css',
})
export class LoggeddevicesComponent {
  logUserDevices: any = [];

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    const userId = this.authService.getuserId(); // ✅ getter
    if (!userId) return;

    this.userService.getLogUserDevices(userId).subscribe({
      next: (res: any) => {
        console.log('🚀 ~ LoggeddevicesComponent ~ getLoggedUser ~ res:', res);
      },
      error: (err) => {
        console.log('🚀 ~ LoggeddevicesComponent ~ getLoggedUser ~ err:', err);
      },
    });
  }
}
