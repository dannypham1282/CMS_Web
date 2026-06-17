import { Component, Input } from '@angular/core';
import { SidebarItem } from '../sidebar-item/sidebar-item';
import { MenuItem } from '../entities/menu-items';


@Component({
  selector: 'app-sidebar',
  imports: [SidebarItem],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
   @Input() collapsed = false;
   menuItems: MenuItem[] = [
    {
      title: 'Dashboard',
      icon: 'fas fa-gauge-high',
      route: '/dashboard'
    },
    {
      title: 'Users',
      icon: 'fas fa-users',
      children: [
        {
          title: 'User List',
          icon: 'fas fa-user',
          route: '/users'
        },
        {
          title: 'Roles',
          icon: 'fas fa-user-shield',
          children: [
            {
              title: 'Admin',
              icon: 'fas fa-user-tie',
              route: '/roles/admin'
            },
            {
              title: 'Editor',
              icon: 'fas fa-pen',
              route: '/roles/editor'
            }
          ]
        }
      ]
    },
    {
      title: 'Reports',
      icon: 'fas fa-chart-column',
      children: [
        {
          title: 'Sales',
          route: '/reports/sales'
        },
        {
          title: 'Finance',
          route: '/reports/finance'
        }
      ]
    },
    {
      title: 'Settings',
      icon: 'fas fa-gear',
      route: '/settings'
    }
  ];
}
