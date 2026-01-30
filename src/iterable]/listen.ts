import Listener from "./include/listener"
import type { ListenerOptions } from "./types"

export default function listen(
  listenerOptions: ListenerOptions,
) {
  if (listenerOptions == null)
    throw new TypeError("listenerOptions is required")

  if (
    (typeof listenerOptions.port !== "number") ||
    (listenerOptions.port <= 0)
  ) throw new TypeError("listenerOptions.port is required")

  return new Listener(listenerOptions)
}
