function useWebSocket (url: string) {
    const ws = new WebSocket(url);

    return ws;

}

export default useWebSocket;