import HttpServer from "./include/http-server"
import type { ServeOptions } from "./types"

export default function serve(options: ServeOptions) {
  if (options == null)
    throw new TypeError("options is required")
  if (
    (typeof options.port !== "number") ||
    (options.port <= 0)
  ) throw new TypeError("options.port is required")
  if (!(options.fetch instanceof Function)) 
    throw new TypeError("options.fetch is required")

  const server = new HttpServer(options.fetch)
  return server.listen(options)
}