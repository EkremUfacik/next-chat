import { fetcher } from "@/services/fetcher";
import Link from "next/link";

const UsersList = async () => {
  const users = await fetcher("/user");

  console.log(users);

  return (
    <div>
      <h1>UsersList</h1>
      <div>
        {users?.map((user: any) => (
          <Link key={user._id} href={`/chat/${user._id}`}>
            <div key={user._id} className="border w-40">
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
