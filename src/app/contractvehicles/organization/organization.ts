import { Component, inject, Input, input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, CellValueChangedEvent, ColDef, GridReadyEvent, ModuleRegistry, themeQuartz,themeBalham } from 'ag-grid-community';
import { Organization } from '../../entities/contractVehicle';
import { RowActionsComponent } from '../../services/row-actions.component';
ModuleRegistry.registerModules([AllCommunityModule]);
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-organization',
  imports: [CommonModule, AgGridAngular,RowActionsComponent],
  templateUrl: './organization.html',
  styleUrl: './organization.css',
})
export class OrganizationComponent {
private http = inject(HttpClient);
//Grid setting
  theme = themeQuartz;
  myGrid: string = 'organization_' + Math.random().toString(36).substring(2, 15);
  organizationModel: Observable<Organization> = new Observable();
  gridApi: any;
  rowData: Organization[] = [];
  newFieldValue: string = '';
  rowHeight:number = 40;
  disableAddButton:boolean= false;
  constructor(@Optional() private rowActionsComponent:RowActionsComponent){}
  
  onCellValueChanged($event: CellValueChangedEvent<Organization,any,any,any>) {
    if ($event.node.data?.GridAction==='new')
      {
        console.log("Ignore Cell save for new row");
      } 
      else{
    let oldValue: any = $event.oldValue;
     let newValue: any  = $event.newValue;
     console.log($event.node.data)
     this.newFieldValue = newValue;
      if (oldValue !== newValue) {
   console.log("cell value " + newValue)
      }
    }
  }

  onGridReady(params: GridReadyEvent<Organization>) { 
      params.api.sizeColumnsToFit();
      this.gridApi = params.api;
      this.http.get<Organization>('/api/admin/organization/getall').subscribe(
        (data) => {   
          this.gridApi.setGridOption('rowData', this.rowData); // Set the row data after fetching from API
        },
        (error) => {
          console.error('API Error:', error); // Log any errors for debugging
        }
      );    
    }

    // Column Definitions: Defines & controls grid columns.
      colDefs: ColDef<Organization>[] = [
        {
      headerName: '',
      cellRenderer: RowActionsComponent,
      cellRendererParams:{
                table: 'organization'
            },
      editable: false,
      sortable: false,
      filter: false,
      width: 120
    },
        { field: "ID", width: 50 ,hide:true},
        { field: "GUID" , hide: true},
        { field: "Name", editable: true, width:300, headerName: "Organization Name", filter: 'agTextColumnFilter' },
        { field: "ShortName" ,editable: true,hide: false,headerName:"Short Name" , filter: 'agTextColumnFilter'},
        { field: "Description" ,editable: true,hide: false,headerName:"Description" , filter: 'agTextColumnFilter'},
        { field: "Address" ,editable: true,hide: false,headerName:"Address" , filter: 'agTextColumnFilter'},
        { field: "PhoneNumber" ,editable: true,hide: false,headerName:"Phone Number" , filter: 'agTextColumnFilter'},
        { field: "Email" ,editable: true,hide: false,headerName:"Email" , filter: 'agTextColumnFilter'}    
      ];
      defaultColDef: ColDef = {
        flex: 1,
      };

   addNewOrganization()
   {
    const newItem = {GridAction:'new'};
    this.gridApi.applyTransaction({ add: [newItem] });
    this.disableAddButton = true;
   }
   goToNext() {
  this.gridApi.paginationGoToNextPage();
}

goToPage(pageNo: number) {
  this.gridApi.paginationGoToPage(pageNo);
}
}
