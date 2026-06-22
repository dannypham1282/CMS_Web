import { roles } from './roles';

export class userroles {
  id: number = 0;
  userid: number = 0;
  roleid: number = 0;
  role: roles | undefined;
  constructor(init?: Partial<userroles>) {
    Object.assign(this, init);
  }
}
