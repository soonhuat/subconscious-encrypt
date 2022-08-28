import { Server } from 'socket.io'
import http from 'http'

export let io: Server = null

export function connectSocket(httpServer: http.Server) {
  io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('a new connection')
  })
}
