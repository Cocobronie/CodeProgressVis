import { makeAutoObservable } from 'mobx';

class CurIdStore {
  x_cur = '0';

  constructor() {
    makeAutoObservable(this);
  }

  update(id: string) {
    this.x_cur = id;
  }
}

export const curIdStore = new CurIdStore();
