export interface ILink {
  title: string;
  link: string;
}

export interface ISearchResult {
  query: string;
  took: number;
  links: ILink[];
}

export interface IQueueItem {
  query: string;
  transactionId: number;
}
