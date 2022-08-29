declare namespace Api {
  export interface Cartoon {
    id: number
    title: string
    date: string
    characters: string[]
    comment: string
    thumbnail_hash: string
  }

  export interface SearchCartoonResponse {
    count: number
    next: string | null
    previous: string | null
    results: Cartoon[]
  }

  export interface IdolNameListResponse {
    names: string[]
  }
}
