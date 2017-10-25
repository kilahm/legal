class NullStorage implements Storage {
  [index: number]: string;
  [key: string]: any;
  readonly length = 0;

  clear(): void {
  }

  getItem(): string | any {
    return undefined;
  }

  key(): string | any {
    return undefined;
  }

  removeItem(): void {
  }

  setItem(): void {
  }
}

export const nullStorage = new NullStorage();

