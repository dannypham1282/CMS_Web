export class roles {
  id: number = 0;
  guid: string = '';
  name: string = '';
  description: string = '';
  constructor(init?: Partial<roles>) {
    Object.assign(this, init);
  }
}
