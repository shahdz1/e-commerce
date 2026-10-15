export interface ListResponse<type> {
  results: number;
  metadata: Metadata;
  data: type[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
