export interface ILink {
  title: string;
  link: string;
}

export interface ISearchResult {
  query: string;
  took: number;
  links: ILink[];
}
