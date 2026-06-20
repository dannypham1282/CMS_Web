import { Component, EventEmitter, Output, output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type CustomRenderParams = ICellRendererParams & {
  gridAction: string;
  onSave: (row: any) => void;
  onCancel: (row: any) => void;
  onDelete: (row: any) => void;
};

@Component({
  selector: 'app-row-actions',
  standalone: true,
  template: `
    @if(params.data?.gridAction==='new')
      { 
      <button class="btn btn-xs btn-outline-success" (click)="save()"><i class="fa fa-save"></i></button>&nbsp;
      <button class="btn btn-xs btn-outline-danger" (click)="cancel()"><i class="fa fa-cancel"></i></button>
      }
      @else
        {         
          <button class="btn btn-xs btn-outline-danger" (click)="delete()"><i class="fa fa-trash"></i></button>&nbsp;
        }
  `
})
export class RowActionsComponent implements ICellRendererAngularComp {
  params!: CustomRenderParams;

  agInit(params: CustomRenderParams): void {
    this.params = params;

  }

refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  setActionValue(): void {
    //this.params.data?.gridAction = 'added';
  }

  save(): void {
   this.params.onSave(this.params.data);
   let gridAction = '';
   
   this.checkGridAction();

   
  }

  checkGridAction(): void
  {
   
    this.params.data.gridAction = '';
    console.log(this.params.data)
    this.params.api.refreshCells({
        force: true});
  }
  
    

  cancel(): void {
    this.params.onCancel(this.params.data);
  }
  
  delete() {
    this.params.onDelete(this.params.data);
  }
}
