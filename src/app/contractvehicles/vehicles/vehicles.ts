import { Component, inject, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { AllCommunityModule, CellValueChangedEvent, ColDef, GridReadyEvent, ModuleRegistry, themeQuartz } from 'ag-grid-community';
ModuleRegistry.registerModules([AllCommunityModule]);
import { ContractVehicle, ContractVehicleViewModel, Organization } from '../../entities/contractVehicle';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vehicles',
  imports: [CommonModule, AgGridAngular],
  templateUrl: './vehicles.html',
  styleUrl: './vehicles.css',
})
export class Vehicles {
  private http = inject(HttpClient);
  @Input() cvId!: number; // Input property to receive cvId from parent component
myGrid: string = 'myGrid' + Math.random().toString(36).substring(2, 15); // Generate a unique ID for the grid


onCellValueChanged($event: CellValueChangedEvent<ContractVehicle,any,any,any>) {
   let oldValue: any = $event.oldValue;
   let newValue: any  = $event.newValue;
   this.newFieldValue = newValue;
    if (oldValue !== newValue) {

    }
}

updateContractVehicle(Id:number, field: string, value: string, oldValue: string) {

}
  constructor() {
    // You can initialize your component here if needed
  }

  
  //Grid setting
  theme = themeQuartz;
  vehicleViewModel: Observable<ContractVehicleViewModel> = new Observable();
  rowData: ContractVehicle[] = [];
  orgList: Organization[] = [];
  newFieldValue: string = '';
  organizationDropdown:string[] = [];
  gridApi: any;
  getJsonData(path: string){ 
    // this.http.get<ContractVehicleViewModel>(`api/${path}`).subscribe(
    //  (response) => {
    //    const data = response as ContractVehicleViewModel;
     //   this.rowData = data.ContractVehicles; // Assign the fetched data to rowData
     //   this.orgList = data.Organizations; // Assign the fetched organization data to orgList
     //   this.organizationDropdown = this.orgList.map(org => org.OrganizationName); // Extract organization names for dropdown
     //   this.organizationDropdown.unshift('-- Select Organization --'); // Add an empty option at the beginning of the dropdown list
     // },
     // (error) => {
     //   console.error('API Error:', error); // Log any errors for debugging
     // }
   // );
  }

  ngOnInit() {
 
  }
  // Row Data: The data to be displayed.
  onGridReady(params: GridReadyEvent<ContractVehicle>) { 
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.http.get<ContractVehicleViewModel>(`api/ContractVehicle/getall`).subscribe(
      (data) => {
        this.rowData = data.ContractVehicles; // Assign the fetched data to rowData
        this.orgList = data.Organizations; // Assign the fetched organization data to orgList
        this.organizationDropdown = this.orgList.map(org => org.name); // Extract organization names for dropdown
        this.organizationDropdown.unshift('-- Select Organization --'); // Add an empty option at the beginning of the dropdown list
        this.gridApi.setGridOption('rowData', this.rowData); // Set the row data after fetching from API
      },
      (error) => {
        console.error('API Error:', error); // Log any errors for debugging
      }
    );
   
  }

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<ContractVehicle>[] = [
    { field: "ID", width: 50 },
    { field: "GUID" , hide: true},
    { field: "ContractVehicleName", editable: true, headerName: "Contract Vehicle Name", filter: 'agTextColumnFilter' },
   // { field: "OrganizationId" ,hide: true},
    { field: "OrganizationId", editable: true, headerName: "Organization Name", filter: 'agTextColumnFilter',cellEditor: 'agSelectCellEditor',
      cellEditorParams:() => ({
        values: this.organizationDropdown,
        searchable: true,
        allowTyping: true,    // Allows direct typing to filter
      filterList: true  
    }),
    valueFormatter: (params) => {
      // Display the name, not the ID
    
      return this.orgList.find(opt => opt.id === params.value)?.name || params.value;
    },
    valueParser: (params) => {
      // Convert selected name back to ID
      return this.orgList.find(opt => opt.name === params.newValue)?.id || params.newValue ;
    },  
    },
    {
      field: "StartDate", filter: 'agDateColumnFilter', editable: true, headerName: "Start Date", valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '', cellEditor: 'agDateStringCellEditor',
      cellEditorParams: {
        min: '01/01/1900',
        max: '01/01/2100',
      }
    },
    {
      field: "EndDate", filter: 'agDateColumnFilter', editable: true, headerName: "End Date", valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : '', cellEditor: 'agDateStringCellEditor',
      cellEditorParams: {
        min: '01/01/1900',
        max: '01/01/2100',
      }
    },
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };
}
