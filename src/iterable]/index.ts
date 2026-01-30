import connect from "./connect"
import listen from "./listen"
import serve from "./serve"

import type Listener from "./include/listener"
import type HttpListener from "./include/http-listener"
import type Socket from "./include/socket"

// export main functions
export {
  connect,
  listen,
  serve,
}

// export types
export type {
  SocketAddress,
  SocketOptions,
  SocketInfo,
  ListenerOptions,
  ServeOptions,
} from "./types"

// export as interfaces
export type {
  Socket,
  Listener,
  HttpListener,
}
