export class ContractVehicle {
  ID:number =0;
    GUID:string = '';
    ContractVehicleName :string = '';
    OrganizationId:number =0        ;       
    Organization:Organization []= [];
    StartDate!: string | null;
    EndDate!: string | null;

    constructor(init?: Partial<ContractVehicle>) {
        Object.assign(this, init);
    }
}
 
export class Organization {
   GridAction:string='';
   ID :number =0 ;
   GUID:string = '';
   Name :string = '';
   ShortName :string = '';
   Description:string = '';
   Address:string = '';
   PhoneNumber:string = '';
   Email:string='';
   constructor(init?: Partial<Organization>) {
       Object.assign(this, init);
   }
}

export class ContractVehicleViewModel {
  ContractVehicles: ContractVehicle[] = [];
  Organizations: Organization[] = [];

  constructor(init?: Partial<ContractVehicleViewModel>) {
      Object.assign(this, init);
  }
} 