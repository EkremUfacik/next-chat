"use client";

import LogoutButton from "@/components/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  const user = useUser();
  return (
    <div className="absolute w-full">
      <div className="flex shadow-md justify-between items-center py-2 px-8">
        <Link href="/">
          <Image src="/send.png" alt="logo" width={50} height={50} />
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar>
              <AvatarImage src={user.pic} className="object-cover" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <LogoutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
