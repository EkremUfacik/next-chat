"use client";

import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosBase } from "@/services/axiosInstance";
import { useUser } from "@/hooks/useUser";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface ChatProps {
  chat: Chat;
  messages: Message[];
}

const ChatSection = ({ chat, messages }: ChatProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [userMessages, setUserMessages] = useState(messages);
  console.log(messages);

  const user = useUser();

  const reciever = chat.users.filter((u) => u._id !== user._id)[0];

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

  // 2024-02-28T17:45:27.884Z -> tarih bugüne eşitse saat ve dakika göster düne eşitse dün yazsın daha önceyse tarihi göstersin

  const formatDate = (date: string) => {
    const newDate = new Date(date);
    const today = new Date();
    if (newDate.toDateString() === today.toDateString()) {
      return newDate.toLocaleTimeString().slice(0, 5);
    } else if (
      newDate.toDateString() ===
      new Date(today.setDate(today.getDate() - 1)).toDateString()
    ) {
      return "Yesterday " + newDate.toLocaleTimeString().slice(0, 5);
    } else {
      return newDate.toLocaleDateString();
    }
  };

  return (
    <div className="w-full max-h-full flex flex-col justify-between border rounded-md bg-gray-300">
      <div className="flex items-center gap-2 p-4">
        <Avatar>
          <AvatarImage src={reciever.pic} className="object-cover" />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <p className="font-semibold ">{reciever.username}</p>
      </div>
      <div className="p-4 space-y-2 min-h-[530px]">
        {userMessages.map((msg) => (
          <div
            key={msg._id}
            className={cn(
              "border rounded-md w-fit p-2 bg-slate-200",
              msg.sender._id === user._id && "ml-auto bg-teal-100"
            )}
          >
            <p className="pe-20">{msg.content}</p>
            <p className="text-xs text-end">{formatDate(msg.updatedAt)}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="">
        <Input
          placeholder="Type a message"
          name="message"
          className="outline-none hover:bg-gray-50 focus:bg-gray-50 px-4 py-6"
        />
      </form>
    </div>
  );
};

export default ChatSection;
