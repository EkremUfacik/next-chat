import { fetcher } from "@/services/fetcher";

import UserCard from "./UserCard";
import SearchInput from "./SearchInput";

const UsersList = async ({ search }: { search: string }) => {
  console.log(search);
  const users: User[] = await fetcher(`/user?search=${search || ""}`);

  console.log(users);

  return (
    <div className="space-y-4 border p-4 h-full rounded-md bg-zinc-100 ">
      <h1 className="text-lg font-semibold">Chats</h1>
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
