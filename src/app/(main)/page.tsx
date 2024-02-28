import UsersList from "@/components/UsersList";

interface HomeProps {
  searchParams: {
    search: string;
  };
}

const Home = ({ searchParams: { search } }: HomeProps) => {
  console.log(search);
  return (
    <div>
      <h1>Home</h1>
      <div className="flex h-full p-4 gap-4">
        <div className="flex-1">
          <UsersList search={search} />
        </div>
        <div className="flex-[2]">
          <h1>begin message</h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
