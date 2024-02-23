"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const Home = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useUser();

  console.log(user?.id);

  useEffect(() => {
    const socketIo = io("http://localhost:8000");

    socketIo.on("connected", () => {
      console.log("connected");
    });

    socketIo.on("message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socketIo.on("disconnect", () => {
      console.log("disconnected");
    });

    setSocket(socketIo);

    return () => {
      socketIo.off("connected");
      socketIo.off("message");
      socketIo.off("disconnect");
      socketIo.close();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = (e.target as HTMLFormElement).message.value;
    if (socket) {
      socket.emit("message", message);
      setMessages((prev) => [...prev, message]);
    }
    (e.target as HTMLFormElement).reset();
  };

  return (
    <div>
      <h1>Home</h1>
      <form onSubmit={handleSubmit} className="w-60">
        <Input placeholder="message" name="message" />
        <Button type="submit">Send</Button>
      </form>

      <div>
        {messages.map((msg, i) => (
          <p key={i}>{msg}</p>
        ))}
      </div>
    </div>
  );
};

export default Home;
