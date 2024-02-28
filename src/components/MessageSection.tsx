"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosBase } from "@/services/axiosInstance";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";

interface ChatProps {
  chat: Chat;
  messages: Message[];
}

const ChatSection = ({ chat, messages }: ChatProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userMessages, setUserMessages] = useState(messages);

  const user = useUser();

  useEffect(() => {
    const socketIo = io("http://localhost:8000");

    socketIo.emit("setup", user._id);

    socketIo.on("connected", () => {
      console.log("connected");
    });

    socketIo.emit("join chat", chat._id);

    socketIo.on("new message", (message) => {
      if (message.chat._id === chat._id) {
        console.log(message, "new message");
        setUserMessages((prev) => [...prev, message]);
      }
    });

    socketIo.on("disconnect", () => {
      console.log("disconnected");
    });

    setSocket(socketIo);

    return () => {
      socketIo.off("connected");
      socketIo.off("new message");
      socketIo.off("disconnect");
      socketIo.close();
    };
  }, [user._id, chat._id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const message = (e.target as HTMLFormElement).message.value;

    const { data } = await axiosBase.post("/message", {
      message,
      chatId: chat._id,
    });
    console.log(data);

    socket?.emit("new message", data);

    setUserMessages((prev) => [...prev, data]);
    (e.target as HTMLFormElement).reset();
  };
  return (
    <div className="w-full p-8">
      <div>
        {userMessages.map((msg, i) => (
          <p
            key={i}
            className={cn(
              "text-left",
              msg.sender._id === user._id && "text-right"
            )}
          >
            {msg.content}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="">
        <Input placeholder="message" name="message" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
};

export default ChatSection;
