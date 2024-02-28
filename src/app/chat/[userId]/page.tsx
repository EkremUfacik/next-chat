import MessageSection from "@/components/MessageSection";
import { fetcher } from "@/services/fetcher";

interface UserChatProps {
  params: {
    userId: string;
  };
  searchParams: {
    search: string;
  };
}

const UserChat = async ({
  params,
  searchParams: { search },
}: UserChatProps) => {
  const chat: Chat = await fetcher(`/chat/${params.userId}`);
  const messages: Message[] = await fetcher(`/message/${chat._id}`);
  console.log(messages);
  console.log(chat);

  return (
    <div>
      <h1>UserChat</h1>
      <div className="flex">
        <MessageSection chat={chat} messages={messages} />
      </div>
    </div>
  );
};

export default UserChat;
