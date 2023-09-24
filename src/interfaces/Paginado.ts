export interface Paginado<T> {
  docs: T[],
  count: number,
  totalPages: number,
}
