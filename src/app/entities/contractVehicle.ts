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
   gridAction:string='';
   id :number =0 ;
   guid:string = '';
   name :string = '';
   shortName :string = '';
   description:string = '';
   address:string = '';
   phoneNumber:string = '';
   email:string='';
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