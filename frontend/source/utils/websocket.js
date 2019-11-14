export const initWebsocket = (socket) => {
  socket.onopen = (event) => {
    socket.send('hello world');
  }
}