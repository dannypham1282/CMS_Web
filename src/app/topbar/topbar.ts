import { Component, EventEmitter, Host, Optional, Output } from '@angular/core';
import { App } from '../app';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  constructor(@Optional() @Host() private parent:App){}
  topBarNewTabGroup(path:any)
  {
    this.parent.newTabGroup(path);
  }
  @Output() toggleSidebar = new EventEmitter<void>();
}
