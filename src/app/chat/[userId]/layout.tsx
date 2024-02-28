export default function ChatLayout({
  children,
  users,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
}) {
  return (
    <div className="flex h-full p-4 gap-4">
      <div className="flex-1">{users}</div>
      <div className="flex-[2]">{children}</div>
    </div>
  );
}
