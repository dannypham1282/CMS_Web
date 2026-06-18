import { Component, inject, Input, input, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, CellValueChangedEvent, ColDef, GridReadyEvent, ModuleRegistry, themeQuartz,themeBalham } from 'ag-grid-community';
import { Organization } from '../../entities/contractVehicle';
import { RowActionsComponent } from '../../services/row-actions.component';
ModuleRegistry.registerModules([AllCommunityModule]);
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';

@Component({
  selector: 'app-organization',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './organization.html',
  styleUrl: './organization.css',
})
export class OrganizationComponent {
isAddingNewRow = false;
private http = inject(HttpClient);
//Grid setting
  theme = themeQuartz;
  myGrid: string = 'organization_' + Math.random().toString(36).substring(2, 15);
  organizationModel: Observable<Organization> = new Observable();
  gridApi: any;
  rowData!: any[];
  newFieldValue: string = '';
  rowHeight:number = 40;
  disableAddButton:boolean= false;
  constructor(@Optional() private rowActionsComponent:RowActionsComponent){}
  
  onCellValueChanged($event: CellValueChangedEvent<Organization,any,any,any>) {
    if ($event.node.data?.gridAction==='new')
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

  addNewRecord(): void {
    if (this.isAddingNewRow) {
      return;
    }
    this.isAddingNewRow = true;
    const newRow = {
      id: 0,
      name: '',
      gridAction:'new'
    };

    this.gridApi.applyTransaction({
      add: [newRow],
      addIndex: 0
    });

     this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: 'name'
    });
  }

  saveRow(row: any): void {
    row.isNew = false;
    row.ID=100;
    this.gridApi.refreshCells({
      force: true
    });
    this.isAddingNewRow = false;
  }

  cancelRow(row: any): void {
    this.gridApi.applyTransaction({
      remove: [row]
    });
    this.isAddingNewRow = false;
  }

  ngOnInit(): void {
    //this.loadData();
  }

  loadData(): void {
    this.http.get<any[]>(`api/admin/organization/getall`).subscribe(
      (data) => {
        this.rowData = data; // Assign the fetched data to rowData
        this.gridApi.setGridOption('rowData', this.rowData); // Set the row data after fetching from API
      },
      (error) => {
        console.error('API Error:', error); // Log any errors for debugging
      }
    );
  }

  onGridReady(params: GridReadyEvent<Organization>) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.loadData();
    //this.gridApi.setGridOption('rowData', this.rowData);
  }

  // onGridReady(params: GridReadyEvent<Organization>) { 
  //     params.api.sizeColumnsToFit();
  //     this.gridApi = params.api;
  //     this.http.get<Organization[]>('/api/admin/organization/getall').subscribe(
  //       (data) => {   
  //        delay(500); // Simulate a delay of 500 milliseconds
  //         this.rowData = data; // Assign the fetched data to rowData 
  //        this.gridApi.setGridOption('rowData', this.rowData); // Set the row data after fetching from API        
  //       },
  //       (error) => {
  //         console.error('API Error:', error); // Log any errors for debugging
  //       }
  //     );    
  //   }

    // Column Definitions: Defines & controls grid columns.
      colDefs: ColDef<Organization>[] = [
        {
      headerName: '',
      cellRenderer: RowActionsComponent,
      cellRendererParams:{
                onSave: (row: any) => this.saveRow(row),
        onCancel: (row: any) => this.cancelRow(row)
            },
      editable: false,
      sortable: false,
      filter: false,
      width: 120
    },
        { field: "id", width: 50 ,hide:true},
        { field: "guid" , hide: true},
        { field: "name", editable: true, width:300, headerName: "Organization Name", filter: 'agTextColumnFilter' },
        { field: "shortName" ,editable: true,hide: false,headerName:"Short Name" , filter: 'agTextColumnFilter'},
        { field: "description" ,editable: true,hide: false,headerName:"Description" , filter: 'agTextColumnFilter'},
        { field: "address" ,editable: true,hide: false,headerName:"Address" , filter: 'agTextColumnFilter'},
        { field: "phoneNumber" ,editable: true,hide: false,headerName:"Phone Number" , filter: 'agTextColumnFilter'},
        { field: "email" ,editable: true,hide: false,headerName:"Email" , filter: 'agTextColumnFilter'}    
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
ngAfterViewInit() {
  // Pushes the update to the next execution cycle
  setTimeout(() => {
    //this.isLoading = false;
  });
}
}
