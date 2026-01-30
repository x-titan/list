import HttpServer from "./http-server"
import type { PromiseController, ServerOptions } from "../types"
import { createDeferredController, noop } from "../utils"

export default class HttpListener {
  private server: HttpServer
  private closedController: PromiseController<void>

  readonly port: number
  readonly hostname: string
  readonly closed: Promise<void>

  constructor(server: HttpServer, ServerOptions: ServerOptions) {
    this.server = server

    this.port = ServerOptions.port
    this.hostname = ServerOptions.hostname ?? "localhost"

    this.closedController = createDeferredController<void>()

    this.closed = this.closedController.promise
    this.closed.catch(noop) // to avoid unhandledRejection error
  }

  /**
   * Mock the fetch handler for a running server.
   */
  async fetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    return this.server.fetch(input, init)
  }

  unref(): void { }
  ref(): void { }

  close(reason?: any) {
    if (reason)
      this.closedController.reject(reason)
    else
      this.closedController.resolve()
    return this.closed
  }
}