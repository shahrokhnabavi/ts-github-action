import { MethodVerbs } from './HttpType';

class Route {
  constructor(
    private readonly _method: MethodVerbs,
    private readonly _path: string,
    private readonly _action: string
  ) {}

  public get path(): string {
    return this._path;
  }

  public get method(): MethodVerbs {
    return this._method;
  }

  public get action(): string {
    return this._action;
  }
}

export default Route;
