import { userroles } from './userroles';

export class users {
  id: number = 0;
  guid: string = '';
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phonenumber: string = '';
  organizationid: number = 0;
  userroles!: [userroles];
  constructor(init?: Partial<users>) {
    Object.assign(this, init);
  }
}
