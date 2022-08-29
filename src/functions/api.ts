async function getApiResponse<T>(path: string, params?: URLSearchParams): Promise<T> {
  const url = new URL(path, import.meta.env.VITE_API_SERVER_URL)
  if (params !== undefined) {
    url.search = params.toString()
  }

  const response = await fetch(url.href, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
    },
    mode: 'cors',
    credentials: 'omit',
  })

  return await response.json()
}

export async function searchCartoon(title?: string, characters: string[] = [], startAt?: string, endAt?: string, limit?: number, offset?: number): Promise<Api.SearchCartoonResponse> {
  const params = new URLSearchParams
  if(title !== undefined) {
    params.append('title', title)
  }
  for(const character of characters) {
    params.append('character', character)
  }
  if(startAt !== undefined) {
    params.append('start_at', startAt)
  }
  if(endAt !== undefined) {
    params.append('end_at', endAt)
  }
  if (limit !== undefined) {
    params.append('limit', limit.toString())
  }
  if (offset !== undefined) {
    params.append('offset', offset.toString())
  }

  return await getApiResponse('cartoon/search', params)
}

export async function getCharacterNameList(): Promise<Api.IdolNameListResponse> {
  return await getApiResponse('idol_name/list')
}
