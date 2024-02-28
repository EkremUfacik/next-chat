export default function ChatLayout({
  children,
  users,
}: {
  children: React.ReactNode;
  users: React.ReactNode;
}) {
  return (
    <div className="flex h-full p-4 gap-4 pt-20">
      <div className="flex-1 h-full">{users}</div>
      <div className="flex-[2] h-full">{children}</div>
    </div>
  );
}
