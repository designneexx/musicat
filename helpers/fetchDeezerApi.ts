export const RAPID_API_HOST = 'deezerdevs-deezer.p.rapidapi.com'
export const API_URL = `https://${RAPID_API_HOST}/`
export const RAPID_API_KEY =
  'd056004aaemsh45df73b2cc893a1p1d896cjsn06cb1aadb495'

export async function fetchDeezerApi<ResponseData>(
  apiPath: string,
  init?: RequestInit
): Promise<ResponseData> {
  const options = {
    headers: {
      'X-RapidAPI-Host': RAPID_API_HOST,
      'X-RapidAPI-Key': RAPID_API_KEY,
      ...init?.headers,
    },
    ...init,
  }

  const res = await fetch(`${API_URL}${apiPath}`, options)

  if (!res.ok) return Promise.reject({ error: 'Ошибка' })

  const data = await res.json()

  if (data.error) {
    return Promise.reject({ error: 'Ошибка' })
  }

  return data
}
