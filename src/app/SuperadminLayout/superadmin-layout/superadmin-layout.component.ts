import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SuperadminSidebarComponent } from '../superadmin-sidebar/superadmin-sidebar.component';
import { SHARED_IMPORTS } from '../../components/sharedImport';

@Component({
  selector: 'app-superadmin-layout',
  imports: [RouterModule, SuperadminSidebarComponent, SHARED_IMPORTS],
  templateUrl: './superadmin-layout.component.html',
  styleUrl: './superadmin-layout.component.css',
})
export class SuperadminLayoutComponent {
  isCollapsed = false;

  onSidebarCollapseChange(collapsed: boolean) {
    this.isCollapsed = collapsed;
  }
}
