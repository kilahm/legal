export class FakeHistory implements History {

  get length(): number {
    return 0;
  }

  get state(): any {
    return {};
  };

  set scrollRestoration(value: ScrollRestoration) {
    value;
  }

  back(): void {
  }

  forward(): void {
  }

  go(): void {
  }

  pushState(): void {
  }

  replaceState(): void {
  }

}