import { AuthService } from './../../../authentication/authservice/auth.service';
import { Component } from '@angular/core';
import { SHARED_IMPORTS } from '../../../components/sharedImport';
import { UserService } from '../../user/userservice/user.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loggeddevices',
  standalone: true,
  imports: [SHARED_IMPORTS, CommonModule],
  templateUrl: './loggeddevices.component.html',
  styleUrl: './loggeddevices.component.css',
})
export class LoggeddevicesComponent {
  logUserDevices: any = [];
  loading = true;
  signingOut: { [key: string]: boolean } = {};

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router : Router,
  ) {}

  ngOnInit() {
    this.getLoggedUser();
  }

  getLoggedUser() {
    const userId = this.authService.getuserId();
    if (!userId) {
      this.loading = false;
      return;
    }

    this.userService.getLogUserDevices(userId).subscribe({
      next: (res: any) => {
        console.log('🚀 ~ LoggeddevicesComponent ~ getLoggedUser ~ res:', res);
        this.logUserDevices = res.devices || res;
        this.loading = false;
      },
      error: (err) => {
        console.log('🚀 ~ LoggeddevicesComponent ~ getLoggedUser ~ err:', err);
        this.loading = false;
      },
    });
  }

  signoutDevice(deviceId: string) {
    if (confirm('Are you sure you want to sign out this device?')) {
      this.signingOut[deviceId] = true;

      const userId = this.authService.getuserId();
         if (!userId || !deviceId) return;
     this.authService.postLogout(userId, deviceId).subscribe({
      next: (res : any) =>{
        console.log("🚀 ~ LoggeddevicesComponent ~ signoutDevice ~ res:", res)
        this.router.navigateByUrl('/profile/loggeddevices');
      }, error : (err) =>{
        console.log("🚀 ~ LoggeddevicesComponent ~ signoutDevice ~ err:", err)

      }
     })

    }
  }
}
