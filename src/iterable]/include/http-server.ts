import HttpListener from "./http-listener"
import type {
  FetchHandler,
  ServerOptions,
  SocketInfo,
} from "../types"
import {
  isSocketInfo,
  responseNoContent,
} from "../utils"
import Socket from "./socket"

/**
 * Server cant serve a socket. The server can only handle a request.
 * Represent a fetcher interface for Listener.
 * Listener will mount this server to a socket.
 */
export default class HttpServer {
  private handler: FetchHandler = responseNoContent

  constructor(handler?: FetchHandler) {
    if (handler)
      this.update(handler)
  }

  listen(serverOptions: ServerOptions) {
    if (serverOptions == null)
      throw new TypeError("serverOptions is required")
    if (typeof serverOptions.port !== "number" || serverOptions.port <= 0)
      throw new TypeError("serverOptions.port is required")

    return new HttpListener(this, serverOptions)
  }

  update(handler: FetchHandler) {
    if (!(handler instanceof Function))
      throw new TypeError("handler must be a function")
    this.handler = handler
  }

  /**
   * Mock the fetch handler for a running server.
   */
  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    const isRequestAndInfo =
      (input instanceof Request) &&
      isSocketInfo(init)

    let request: Request
    let response: Response
    let info: SocketInfo

    if (isRequestAndInfo) {
      request = input
      info = init
    } else {
      request = new Request(input, init)
      info = {
        remoteAddress: null,
        localAddress: null,
        alpn: null
      }
    }

    try {
      response = await this.handler(request, info)

      if (response instanceof Error)
        throw response
    } catch (error) {
      response = new Response("Internal Server Error", { status: 500 })
    }

    if (!(response instanceof Response))
      response = responseNoContent()

    return response
  }
}
