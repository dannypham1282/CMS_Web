export class roles {
  id: number = 0;
  guid: string = '';
  name: string = '';
  description: string = '';
  level:number=0;
  gridAction:string='';
  constructor(init?: Partial<roles>) {
    Object.assign(this, init);
  }
}
