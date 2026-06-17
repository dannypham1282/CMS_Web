import { Component, DOCUMENT, Inject } from '@angular/core';
import { NgComponentOutlet } from '@angular/common';


interface testtab {
component: any;
  active: boolean;
  id?: number,
  title: string,
  path: string,
  data: any,
}


@Component({
  selector: 'app-tabgroup',
  imports: [NgComponentOutlet],
  templateUrl: './tabgroup.html',
  styleUrl: './tabgroup.css',
})
export class Tabgroup {

  constructor(@Inject(DOCUMENT) document: Document) {
    // You can initialize your component here if needed
  }
  mytabs: testtab[] = [];
   addTab(component: any,title: string,path: string,data: any): number {
    this.mytabs.push({ component: component, active: true, id: this.randomizeTabs(), title: title, path: path, data: data });
    this.selectTab(this.mytabs[this.mytabs.length - 1]);
    return this.mytabs[this.mytabs.length - 1].id || 0;
  }
  randomizeTabs(): number {
   return Math.floor(Math.random() * 10000);
  }

  selectTab(tab: testtab): void {
     this.mytabs.forEach(tab => (tab.active = false));
     tab.active = true;
      console.log(document.getElementById('tabId_' + this.mytabs[this.mytabs.length - 1].id));
  }

  closeTab(tab: testtab): void {
    const index = this.mytabs.indexOf(tab);
    if (index > -1) {
      this.mytabs.splice(index, 1);
      if (tab.active && this.mytabs.length > 0) {
        const newActiveIndex = index === 0 ? 0 : index - 1;
        this.mytabs[newActiveIndex].active = true;
      }
    }
  }
  closeActiveTab(): void {
    const activeTab = this.mytabs.find(tab => tab.active);
    if (activeTab) {
      this.closeTab(activeTab);
    }
  }
}
