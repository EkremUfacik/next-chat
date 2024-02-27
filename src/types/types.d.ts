interface User {
  _id: string;
  username: string;
  email: string;
  pic: string;
  isAdmin: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Chat {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: User[];
  createdAt: string;
  updatedAt: string;
  latestMessage: Message;
}

interface Message {
  _id: string;
  sender: User;
  content: string;
  chat: Chat;
  createdAt: string;
  updatedAt: string;
}
