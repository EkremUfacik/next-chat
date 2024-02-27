import LogoutButton from "@/components/LogoutButton";
import UsersList from "@/components/UsersList";
export const dynamic = "force-dynamic";

const Home = () => {
  return (
    <div>
      <LogoutButton />
      <h1>Home</h1>

      <UsersList />
    </div>
  );
};

export default Home;
