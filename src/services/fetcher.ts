import { cookies } from "next/headers";

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetcher = async (url: string) => {
  const token = cookies().get("token")?.value || "";
  const res = await fetch(baseURL + url, {
    cache: "no-store",
    headers: {
      Cookie: `token=${token}`,
    },
  });
  const data = await res.json();
  return data;
};
