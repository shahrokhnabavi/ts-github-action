import { IncomingHttpHeaders } from 'http';

import { ParsedBody, ParsedQueryString, UrlParams } from './HttpType';

export default class HttpRequest {
  constructor(
    private readonly _body: ParsedBody,
    private readonly _query: ParsedQueryString,
    private readonly _params: UrlParams,
    private readonly _ip: string,
    private readonly _method: string,
    private readonly _path: string,
    private readonly _headers: IncomingHttpHeaders
  ) {}

  public get body(): ParsedBody {
    return this._body;
  }

  public get query(): ParsedQueryString {
    return this._query;
  }

  public get params(): UrlParams {
    return this._params;
  }

  public get ip(): string {
    return this._ip;
  }

  public get method(): string {
    return this._method;
  }

  public get path(): string {
    return this._path;
  }

  public get headers(): IncomingHttpHeaders {
    return this._headers;
  }
}
