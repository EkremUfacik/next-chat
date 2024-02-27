import MessageSection from "@/components/MessageSection";
import { fetcher } from "@/services/fetcher";

const UserChat = async ({ params }: { params: { userId: string } }) => {
  const chat: Chat = await fetcher(`/chat/${params.userId}`);
  const messages: Message[] = await fetcher(`/message/${chat._id}`);
  console.log(messages);
  console.log(chat);

  return (
    <div>
      <h1>UserChat</h1>
      <MessageSection chat={chat} messages={messages} />
    </div>
  );
};

export default UserChat;
