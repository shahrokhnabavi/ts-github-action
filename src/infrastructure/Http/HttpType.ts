export type UrlParams = { [key: string]: string };

export enum ResponseType {
  JSON,
  HTML
}

export enum ResponseStatusCode {
  SUCCESS = 200,
  ACCEPTED = 202,
  NO_CONTENT = 204,
  NOT_FOUND = 404
}

export type MethodVerbs = 'get' | 'post' | 'delete' | 'put' | 'patch';

export enum RequestMethods {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
  PUT = 'put'
}

export interface ParsedQueryString {
  [key: string]: undefined | string | string[] | ParsedQueryString | ParsedQueryString[];
}

export type ParsedBody = {
  [key: string]: number | undefined | string | boolean | ParsedBody | ParsedBody[];
};
