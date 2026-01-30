
// Arguably, this should be a type of `DOMException` rather than
// `TypeError`. More discussion is necessary on the form and structure of
// socket-related errors.
//

// https://sockets-api.proposal.wintertc.org/#socket-error
export default class SocketError extends TypeError {
  constructor(message: string) {
    super(message)
    this.name = "SocketError"
  }
}
