import { fetcher } from "@/services/fetcher";

import UserCard from "./UserCard";
import SearchInput from "./SearchInput";

const UsersList = async ({ search }: { search: string }) => {
  console.log(search);
  const users: User[] = await fetcher(`/user?search=${search || ""}`);

  console.log(users);

  return (
    <div className="space-y-4">
      <h1>Chats</h1>
      <SearchInput />
      <div className="space-y-1">
        {users?.map((user) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
