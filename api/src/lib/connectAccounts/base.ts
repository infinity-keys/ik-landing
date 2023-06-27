export type ConnectConfig = {
  authUrl: string
  tokenUrl: string
  profileUrl: string
  authUrlParams: Record<string, string>
}

export abstract class ConnectAccountOauthProvider<T> {
  protected authUrl: string
  protected tokenUrl: string
  protected profileUrl: string
  protected authUrlParams: Record<string, string>

  constructor({ authUrl, tokenUrl, profileUrl, authUrlParams }: ConnectConfig) {
    this.authUrl = authUrl
    this.tokenUrl = tokenUrl
    this.profileUrl = profileUrl
    this.authUrlParams = authUrlParams
  }

  generateAuthUrl(state: string): URL {
    const url = new URL(this.authUrl)
    for (const [key, value] of Object.entries(this.authUrlParams)) {
      url.searchParams.append(key, value)
    }
    url.searchParams.append('state', state)
    return url
  }

  abstract exchangeToken(code?: string): Promise<{
    accessToken: string
    refreshToken: string
  }>

  abstract getProfile(accessToken: string): Promise<Record<string, string>>

  abstract upsertConnection(
    profileId: string,
    accessToken: string,
    refreshToken: string
  ): Promise<T>

  abstract deleteConnection(): Promise<T>
}
