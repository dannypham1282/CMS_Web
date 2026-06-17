import { Component, signal, ViewChild, ViewContainerRef, inject, ComponentFactoryResolver } from '@angular/core';
import { Tabgroup } from './tabgroup/tabgroup';
import{Vehicles} from './contractvehicles/vehicles/vehicles';
import{OrganizationComponent} from './contractvehicles/organization/organization';
import { FileExplorer } from './filemanager/file-explorer/file-explorer';
import { Topbar } from './topbar/topbar';
import { Sidebar } from './sidebar/sidebar';
@Component({
  selector: 'app-root',
  imports: [Tabgroup, Topbar, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  sidebarCollapsed = false;
  protected readonly title = signal('MyApp');
  @ViewChild(Tabgroup) child!: Tabgroup;
  async loadComponent(): Promise<void> {
    //  this.tabGroup.clear();
    //  this.tabGroup.createComponent(Tabgroup, { index: 0,injector: this.tabGroup.injector });
  }

  ngAfterViewInit(): void {
   // this.loadComponent();
  }

  newTabGroup(path:string): void {
  let component:any;
  let data:any;
 switch (path) {
      case 'ContractVehicles':
        component = Vehicles;
        data = { cvId: 123 }; // Example data to pass to the component
        break;
      case 'Organization':
        component = OrganizationComponent;
        data = { }; // Example data to pass to the component
        break;
      case 'FileExplorer':
        component = FileExplorer;
        data = { }; // Example data to pass to the component
        break;
      default:
        console.warn('Unknown path:', path);
    }
    if (component) {
      const tabId = this.child.addTab(component, path, `/${path.toLowerCase()}`, data);
      console.log(document.getElementById('tabId_' + tabId));
    } else {
      console.warn('No component found for the given path:', path);
    }
  }
}
