export interface IErrorResponse {
  id: string;
  links?: IResponseErrorSelfLink | IResponseErrorRelatedLink;
  status: string;
  code: string;
  title: string;
  detail: string;
  source?: IResponseErrorSource;
  meta?: IResponseErrorMetaData;
}

export interface IResponseErrorSelfLink {
  self: string;
}

export interface IResponseErrorRelatedLink {
  href: string;
  meta: IResponseErrorRelatedLinkMetaData;
}

export interface IResponseErrorRelatedLinkMetaData {
  count: number;
}

export interface IResponseErrorSource {
  pointer?: string;
  parameter?: string;
}

export interface IResponseErrorMetaData {
  copyright: string;
  authors: any;
}
