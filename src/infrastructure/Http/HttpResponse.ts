import { OutgoingHttpHeaders } from 'http';

import { ResponseStatusCode, ResponseType } from './HttpType';

export default class HttpResponse {
  private readonly _headers: OutgoingHttpHeaders;

  constructor(
    private readonly _body: string,
    private readonly _type: ResponseType = ResponseType.HTML,
    private readonly _status: number = ResponseStatusCode.SUCCESS,
    headers?: OutgoingHttpHeaders
  ) {
    this._headers = headers || {
      'Content-Type': this._type === ResponseType.HTML ? 'text/html' : 'application/json'
    };
  }

  public static json(body: string): HttpResponse {
    return new HttpResponse(body, ResponseType.JSON, ResponseStatusCode.SUCCESS);
  }

  public static html(body: string): HttpResponse {
    return new HttpResponse(body, ResponseType.HTML, ResponseStatusCode.SUCCESS);
  }

  public static notFound(): HttpResponse {
    return new HttpResponse('', ResponseType.HTML, ResponseStatusCode.NOT_FOUND);
  }

  public static accepted(): HttpResponse {
    return new HttpResponse('', ResponseType.HTML, ResponseStatusCode.ACCEPTED);
  }

  public static noContent(): HttpResponse {
    return new HttpResponse('', ResponseType.HTML, ResponseStatusCode.NO_CONTENT);
  }

  public get status(): number {
    return this._status;
  }

  public get body(): string {
    return this._body;
  }

  public get type(): ResponseType {
    return this._type;
  }

  public get headers(): OutgoingHttpHeaders {
    return this._headers;
  }
}
