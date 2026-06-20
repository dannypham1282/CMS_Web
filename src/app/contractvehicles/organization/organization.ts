import {
  ChangeDetectorRef,
  Component,
  Host,
  inject,
  Input,
  input,
  Optional,
  Signal,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import {
  AllCommunityModule,
  CellValueChangedEvent,
  ColDef,
  GridReadyEvent,
  ModuleRegistry,
  themeQuartz,
  themeBalham,
} from 'ag-grid-community';
import { Organization } from '../../entities/contractVehicle';
import { RowActionsComponent } from '../../services/row-actions.component';
ModuleRegistry.registerModules([AllCommunityModule]);
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog';
import{ AlertDialogComponent } from '../../alert-dialog/alert-dialog';


@Component({
  selector: 'app-organization',
  standalone: true,
  imports: [CommonModule, AgGridModule, ConfirmationDialogComponent, AlertDialogComponent],
  templateUrl: './organization.html',
  styleUrl: './organization.css',
})
export class OrganizationComponent {
  constructor(private cdr: ChangeDetectorRef) { }
  isAddingNewRow = false;
  private http = inject(HttpClient);
  //Grid setting
  theme = themeQuartz;
  myGrid: string = 'organization_' + Math.random().toString(36).substring(2, 15);
  organization: Organization = new Organization();
  gridApi: any;
  rowData: Array<Organization> = [];
  newFieldValue: string = '';
  rowHeight: number = 40;
  disableAddButton: boolean = false;

  //Confrimation Dialog
  // Signal state to manage the dialog's lifecycle
  isDialogVisible = signal<boolean>(false);
  dialogTitle = signal<string>('Delete Record');
  dialogMessage = signal<string>('Are you sure you want to delete this record?');
  triggerAction() {
    this.isDialogVisible.set(true);
  }

  handleConfirmation() {
    console.log('Action Executed successfully!');
    this.isDialogVisible.set(false);
    // Insert your backend service delete logic here
  }

  handleCancellation() {
    console.log('Action aborted by user.');
    this.isDialogVisible.set(false);
  }
  //End of Confirmation Dialog

  //Alert Dialog
  isAlertVisible = signal<boolean>(false);
  alertTitle = signal<string>('Action Result');
  alertMessage = signal<string>('');

  showAlert(title: string, message: string) {
    this.alertTitle.set(title);
    this.alertMessage.set(message);
    this.isAlertVisible.set(true);
  }   

  handleAlertClose() {
    this.isAlertVisible.set(false);
  }
  //End of Alert Dialog


  onCellValueChanged($event: CellValueChangedEvent<Organization, any, any, any>) {
    if ($event.node.data?.gridAction === 'new') {
      console.log('Ignore Cell save for new row');
    } else {
      let oldValue: any = $event.oldValue;
      let newValue: any = $event.newValue;
      console.log($event.node.data);
      this.newFieldValue = newValue;
      if (oldValue !== newValue) {
        console.log('cell value ' + newValue);
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
      gridAction: 'new',
    };

    this.gridApi.applyTransaction({
      add: [newRow],
      addIndex: 0,
    });

    this.gridApi.startEditingCell({
      rowIndex: 0,
      colKey: 'name',
    });
  }

  saveRow(row: any): void {
    this.http.post<any>('/api/admin/organization/create', row).subscribe(
      (createdOrganization) => {
        this.organization = createdOrganization.result;
        row.id = this.organization.id; // Update the row with the new ID from the server
        row.gridAction = 'added'; // Clear the gridAction after saving
        this.isAddingNewRow = false;
      },
      (err) => {       
        this.showAlert('Error', 'Error saving organization. Please contact administrator for assistance'); // Show alert before saving 
      }
    );
     this.gridApi.refreshCells({
        force: true});
  }

  cancelRow(row: any): void {
    this.gridApi.applyTransaction({
      remove: [row],
    });
    this.isAddingNewRow = false;
  }

  deleteRow(row: any) {
    // Handle the confirmation result
    this.triggerAction();
    this.handleConfirmation = () => {
      this.http.post<any>(`/api/admin/organization/delete?id=${row.id}`, {}).subscribe(
        () => {
          console.log('Organization deleted successfully');
          this.gridApi.applyTransaction({ remove: [row] });  
          this.isDialogVisible.set(false);// Remove the row from the grid after successful deletion
        },
        (err) => {
          alert('Error deleting organization. Please contact administrator for assistance');
        }
      );
    } 
  }

  ngOnInit(): void {
    // this.loadData();
  }

  refreshGrid() {
    this.loadData();
    this.isAddingNewRow = false;
  }

  loadData(): void {
    this.gridApi.setGridOption('loading', true);
    this.http.get<Organization[]>('/api/admin/organization/getall').subscribe(
      (data) => {
        this.rowData = data; // Assign the fetched data to rowData
        this.gridApi.setGridOption('rowData', this.rowData); // Set the row data after fetching from API
        this.cdr.detectChanges();
        this.gridApi.setGridOption('loading', false);
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

  onGridReady(params: GridReadyEvent<Organization>) {
    params.api.sizeColumnsToFit();
    this.gridApi = params.api;
    this.loadData();
  }

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef<Organization>[] = [
    {
      headerName: '',
      cellRenderer: RowActionsComponent,
      cellRendererParams: {
        onSave: (row: any) => this.saveRow(row),
        onCancel: (row: any) => this.cancelRow(row),
        onDelete: (row: any) => this.deleteRow(row),
      },
      editable: false,
      sortable: false,
      filter: false,
      width: 130,
    },
    { field: 'id', width: 50, hide: true },
    { field: 'guid', hide: true },
    {
      field: 'name',
      editable: true,
      width: 300,
      headerName: 'Organization Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'shortName',
      editable: true,
      hide: false,
      headerName: 'Short Name',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'description',
      editable: true,
      hide: false,
      headerName: 'Description',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'address',
      editable: true,
      hide: false,
      headerName: 'Address',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'phoneNumber',
      editable: true,
      hide: false,
      headerName: 'Phone Number',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'email',
      editable: true,
      hide: false,
      headerName: 'Email',
      filter: 'agTextColumnFilter',
    },
  ];
  defaultColDef: ColDef = {
    flex: 1,
  };

  addNewOrganization() {
    const newItem = { gridAction: 'new' };
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
