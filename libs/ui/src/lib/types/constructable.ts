export interface IConstructable<T> {
  new (...args: any[]): T;
}
