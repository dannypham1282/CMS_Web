import { Component, EventEmitter, Output, output } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

type CustomRenderParams = ICellRendererParams & {
  table: string;
};

@Component({
  selector: 'app-row-actions',
  standalone: true,
  template: `
    @if (!isEditing) {
       
       <button class="btn btn-outline-danger btn-xs"><i class="fa fa-trash" (click)="deleteRow()"></i></button>
       
    } @else {
       @if (isNewRow)
        {
    <button class="btn btn-xs btn-outline-success" (click)="saveEdit()"><i class="fa fa-save"></i></button>&nbsp;
      <button class="btn btn-xs btn-outline-danger" (click)="deleteRow()"><i class="fa fa-cancel"></i></button>
    }
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
    this.targetTable = params.table;
    this.checkEditingState();
    //this.startEdit();
  }

  refresh(params: CustomRenderParams): boolean {
    this.params = params;
    this.checkEditingState();
    return true; // Tells grid to re-render component UI
  }

  private checkEditingState() {
    // Check if the current row node is in edit mode
    console.log(this.params.api.getGridId())
    const editingCells = this.params.api.getEditingCells();
    if (editingCells?.length === 0)
      this.isNewRow = true;
    this.isEditing = editingCells.some(cell => cell.rowIndex === this.params.node.rowIndex);
  }

  startEdit() {
    console.log(this.params.node.rowIndex!)
    this.params.api.startEditingCell({
      rowIndex: 0,
       colKey: 'Name' // Starts editing the row focusing on this column
    });
    this.isEditing = true;
  }

  saveEdit() {
    // stopEditing(false) commits the row data changes
    this.params.api.stopEditing(false);
    this.isEditing = false;
    console.log(this.targetTable);
    if (this.targetTable==='organization')
    {
      console.log(this.targetTable)
    }
    // The updated data is now present in the row node
    console.log('Saved Row Data:', this.params.node.data);
  }

  cancelEdit() {
    // stopEditing(true) discards all changes made in the inputs
    this.params.api.stopEditing(true);
    this.isEditing = false;
  }

  enableAddButton()
  {
    this.disableAddButton?.emit(false);
  }

  deleteRow() {
// 1. Fetch data items from selected grid rows
    const selectedData = this.params.node.data;
    console.log(selectedData)
    // 2. Remove items from the grid view immediately
    this.params.api.applyTransaction({ remove: [selectedData]});
     this.isEditing = false;
  }
}
