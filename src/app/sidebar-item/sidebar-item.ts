import { Component, Input } from '@angular/core';
import { MenuItem } from '../entities/menu-items';

@Component({
  selector: 'app-sidebar-item',
  imports: [],
  templateUrl: './sidebar-item.html',
  styleUrl: './sidebar-item.css',
})
export class SidebarItem {

   @Input() item!: MenuItem;
  @Input() collapsed = false;

  toggleMenu() {
    this.item.expanded = !this.item.expanded;
  }
}
