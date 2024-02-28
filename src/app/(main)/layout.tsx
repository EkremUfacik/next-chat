import Navbar from "@/components/Navbar";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col h-full ">
      <Navbar />
      {children}
    </main>
  );
}
