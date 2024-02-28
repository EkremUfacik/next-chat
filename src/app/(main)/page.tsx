import UsersList from "@/components/UsersList";

interface HomeProps {
  searchParams: {
    search: string;
  };
}

const Home = ({ searchParams: { search } }: HomeProps) => {
  console.log(search);
  return (
    <div className="flex h-full p-4 gap-4 pt-20">
      <div className="flex-1 h-full">
        <UsersList search={search} />
      </div>
      <div className="flex-[2] border flex justify-center items-center bg-zinc-200 rounded-md">
        <h1 className="text-xl font-semibold">
          Click on a user to start chatting
        </h1>
      </div>
    </div>
  );
};

export default Home;
