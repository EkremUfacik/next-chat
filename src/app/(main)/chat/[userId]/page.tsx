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
    <div className="max-h-full overflow-auto ">
      <MessageSection chat={chat} messages={messages} />
    </div>
  );
};

export default UserChat;
