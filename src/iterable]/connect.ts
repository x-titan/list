import Socket from "./include/socket"
import SocketError from "./include/error"
import { isSocketAddress } from "./utils"

import type {
  SocketAddress,
  SocketOptions
} from "./types"

/**
 * @throws { SocketError }
 */
export default function connect(
  address: SocketAddress | string | URL,
  options?: SocketOptions
) {
  if (typeof address === "string") {
    const url = new URL("http://" + address)
    if (url.port === "")
      throw new SocketError("Invalid url, port is missing")

    address = {
      hostname: url.hostname!,
      port: parseInt(url.port)
    }
  }

  if (address instanceof URL) {
    if (address.port === "")
      throw new SocketError("Invalid url, port is missing")

    address = {
      hostname: address.hostname!,
      port: parseInt(address.port)
    }
  }

  if (!isSocketAddress(address))
    throw new SocketError("Invalid address")

  if (!Number.isInteger(address.port) || address.port <= 0)
    throw new SocketError("port is required")

  return new Socket({
    ...address,
    ...options
  })
}
