export type Note = {
  rowid: number,
  createdAt: number,
  updatedAt: number|null,
  deletedAt: number|null,
  contents: string,
  title: string
}
