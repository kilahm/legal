export class FakeHistory implements History {
  private _scrollRestoration: ScrollRestoration;

  get length(): number {
    return 0;
  }

  get state(): any {
    return {};
  };

  set scrollRestoration(value: ScrollRestoration) {
    this._scrollRestoration = value;
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