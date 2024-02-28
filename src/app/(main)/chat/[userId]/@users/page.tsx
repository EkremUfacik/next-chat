import UsersList from "@/components/UsersList";

const Users = async ({
  searchParams: { search },
}: {
  searchParams: { search: string };
}) => {
  console.log(search);

  return (
    <div className="h-full">
      <UsersList search={search} />
    </div>
  );
};

export default Users;
