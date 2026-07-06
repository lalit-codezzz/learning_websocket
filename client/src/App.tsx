import { useEffect, useRef, useState } from 'react';
import './App.css'
// import useWebSocket from './hooks/useWebSocket';

type Message = {
  content: string;
  sender: string;
}

function App() {


  const [messages, setMessages] = useState<Message[]>([]);

  const [ws, setWs] = useState<WebSocket>();
  const inputRef = useRef<HTMLInputElement>(null);



  useEffect(() => {
    const w = new WebSocket("ws://localhost:8080");
    w.onopen = function () {
      setWs(w);
    };
    w.onmessage = function (e) {
      console.log(e.data);
      const msg = JSON.parse(e.data);
      setMessages(prev => [...prev, msg]);
    }
    // return () => {
    //   w.close();
    // }
  }, []);

  return (
    <article>
      <div style={{ display: "flex", flexDirection: "column", width: "300px", margin: "2rem auto", rowGap: "2rem" }}>
        <label>Enter the message:</label>
        <input ref={inputRef} type="text" />
        <button onClick={() => {
          if (ws !== undefined) {
            const msg = {content: inputRef.current?.value || "", sender: "Lalit"};
            setMessages(prev => [...prev, msg]);
            ws.send(JSON.stringify(msg));
          }
        }}>Send</button>
      </div>

      <div style={{ border: "1px solid white", height: "400px", width: "300px", margin: "0 auto", overflow: "auto"}}>
        <h1>Chat History</h1>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {
            messages.length > 0 ? messages.map((msg) => {
              {
                if (msg.sender === "Lalit") {
                  return <section style={{ backgroundColor: "rgb(92, 145, 92)", color: "#fff", padding: ".5rem", paddingRight: "1rem", width: "40%", alignSelf: "flex-end", display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                    <p style={{ fontSize: "12px" }}>{msg.content}</p>
                    <span style={{ fontWeight: "bold", fontSize: "10px" }}>{msg.sender}</span>
                  </section>
                } else {
                  return <section style={{ backgroundColor: "rgb(63, 63, 63)", color: "#fff", padding: ".5rem", paddingLeft: "1rem", width: "40%", display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <p style={{ fontSize: "12px" }}>{msg.content}</p>
                    <span style={{ fontWeight: "bold", fontSize: "10px" }}>{msg.sender}</span>
                  </section>
                }
              }
            }) : <p style={{ color: "#606060", fontSize: "12px" }}>Start a new chat (No messages yet!)</p>
          }
        </div>
      </div>

    </article>
  );
}

export default App
