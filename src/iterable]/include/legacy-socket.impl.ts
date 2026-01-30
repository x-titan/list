//! strip unused legacy code
//! dont use this

// private initLegacySocket() {
//   // @ts-ignore
//   if (this.legacySocket) return // socket already initialized

//   const connectOptions: tls.ConnectionOptions & net.NetConnectOpts = {
//     host: this.hostname,
//     port: this.port,
//     allowHalfOpen: this.allowHalfOpen,
//     ALPNProtocols: this.alpn as string[],
//     servername: this.sni as string,
//   }

//   let connect: Function, onConnected
//   if (this.secureTransport === 'on') {
//     connect = tls.connect
//     onConnected = "secureConnect"
//   } else {
//     connect = net.connect
//     onConnected = "connect"
//   }

//   const legacySocket = connect(connectOptions)
//     .on(onConnected, () => {
//       this.onConnected({
//         localAddress: legacySocket.localAddress!,
//         remoteAddress: legacySocket.remoteAddress!,
//         alpn: (legacySocket as tls.TLSSocket).alpnProtocol as string || null,
//       })
//     })
//     .on("error", this.onError.bind(this))
//     .on("close", this.onClose.bind(this))

//   // @ts-ignore
//   this.legacySocket = legacySocket
// }
