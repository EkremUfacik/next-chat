"use client";

import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { cn } from "@/lib/utils";

const UserCard = ({ user }: { user: User }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleRoute = () => {
    router.push(`/chat/${user._id}`);
  };
  return (
    <div
      key={user._id}
      className={cn(
        " flex hover:bg-gray-100 cursor-pointer p-2 rounded-lg gap-4 items-center",
        pathname === `/chat/${user._id}` && "bg-gray-100"
      )}
      onClick={handleRoute}
    >
      <Avatar>
        <AvatarImage src={user.pic} className="object-cover" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>

      <p>{user.username}</p>
    </div>
  );
};

export default UserCard;
