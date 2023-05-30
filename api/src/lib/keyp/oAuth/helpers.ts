export const getExpiration = (expiresIn: number): Date =>
  new Date(new Date(Date.now() + expiresIn * 1000))

export const encodeBody = (body: Record<string, string>): string =>
  Object.keys(body)
    .map(
      (key) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(String(body[key]))
    )
    .join('&')
