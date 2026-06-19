import { Component, EventEmitter, Output, output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type CustomRenderParams = ICellRendererParams & {
  GridAction: string;
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
  disableAddButton = output<boolean>();
  public params!: CustomRenderParams;
  public isEditing = true;
  public isNewRow = false;
  public targetTable = "";

  agInit(params: CustomRenderParams): void {
    this.params = params;
  }

refresh(params: any): boolean {
    this.params = params;
    return true;
  }

  save(): void {
    this.params.onSave(this.params.data);
    this.params.data.GridAction = '';
  }
    

  cancel(): void {
    this.params.onCancel(this.params.data);
  }
  
  delete() {
    this.params.onDelete(this.params.data);
  }
}
