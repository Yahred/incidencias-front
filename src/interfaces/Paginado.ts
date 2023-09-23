export interface Paginado<T> {
  docs: T[],
  totalDocs: number,
  totalPages: number,
}
