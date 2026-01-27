import { Component, EventEmitter, Output } from '@angular/core';
import { SHARED_IMPORTS } from '../../components/sharedImport';
import { AuthService } from '../../authentication/authservice/auth.service';
import { Router } from '@angular/router';
import { AboutService } from '../../views/about/aboutservice/about.service';

@Component({
  selector: 'app-superadmin-sidebar',
  imports: [SHARED_IMPORTS],
  templateUrl: './superadmin-sidebar.component.html',
  styleUrl: './superadmin-sidebar.component.css'
})
export class SuperadminSidebarComponent {
  @Output() collapseChange = new EventEmitter<boolean>();

  isCollapsed = false;
   abouts : any = [];
   dropdowns: {
    system: boolean;
    security: boolean;
    modules: boolean;
    profile: boolean;
    // add all other dropdowns here
  } = {
    system: false,
    security: false,
    modules: false,
    profile: false,
    // ...
  };


  constructor(private authService : AuthService, private router : Router, private aboutService : AboutService){}

   ngOnInit(){
    this.aboutService.getAbout().subscribe({
      next: (res: any) =>{
       this.abouts = res;
      }, error : (err) =>{
        console.log(err, "error");
      }
    })
   }
    toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;

    // Emit the change to parent component
    this.collapseChange.emit(this.isCollapsed);

    // Close all dropdowns when collapsing
    if (this.isCollapsed) {
      Object.keys(this.dropdowns).forEach(
        (key) => (this.dropdowns[key as keyof typeof this.dropdowns] = false)
      );
    }
  }


   logout() {
    const userId = this.authService.getuserId(); // ✅ getter
    const deviceId = localStorage.getItem('deviceId');

    if (!userId || !deviceId) return;

    this.authService.postLogout(userId, deviceId).subscribe({
      next: () => {
        localStorage.removeItem('profileToken');
        localStorage.removeItem('profileUser');
        localStorage.removeItem('loggedDevices');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.log('Logout error:', err);
      },
    });
  }
}
