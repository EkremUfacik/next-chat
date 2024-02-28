"use client";

import { useUser } from "@/hooks/useUser";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { axiosBase } from "@/services/axiosInstance";

const LogoutButton = () => {
  const user = useUser();
  const router = useRouter();

  const handleLogout = async () => {
    await axiosBase.post("/user/logout");
    user.logout();
    router.push("/login");
    router.refresh();
  };

  return (
    <Button variant="destructive" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
