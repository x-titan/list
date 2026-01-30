export interface SocketAddress {
  hostname: string
  port: number
}

export type SecureTransportKind = "off" | "on" | "starttls"

export interface SocketInfo {
  /**
   * The IP address of the remote peer.
   * `"google.com:443"`
   */
  remoteAddress: string | null

  /**
   * The IP address of the local peer.
   * `"localhost:12345"`
   */
  localAddress: string | null

  /**
   * The ALPN protocol negotiated between the peers.
   * @see https://en.wikipedia.org/wiki/Application-Layer_Protocol_Negotiation
   * 
   * ```
   * "HTTP/1.1" | "h2"
   * ```
   */
  alpn: string | null
}

export interface PromiseController<T> {
  promise: Promise<T>
  get isCompleted(): boolean

  resolve: (value: T) => void
  reject: (reason?: any) => void
}

export type FetchHandler = (
  request: Request,
  info: SocketInfo
) => Promise<Response> | Response

export interface SocketOptions {
  secureTransport?: SecureTransportKind
  allowHalfOpen?: boolean
  sni?: string | null
  alpn?: string[]
  signal?: AbortSignal
}

export interface ServerOptions {
  port: number
  hostname?: string
  signal?: AbortSignal
}

export interface ListenerOptions {
  port: number
  hostname?: string
  signal?: AbortSignal
}

export interface ServeOptions {
  port: number
  fetch: FetchHandler
  hostname?: string
  signal?: AbortSignal
}
