export interface ApiPaginatedResponseDTO<T> {
  content: T[];
  hasNext: boolean;
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
}
