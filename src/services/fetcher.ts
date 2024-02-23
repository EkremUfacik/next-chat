const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetcher = (url: string) =>
  fetch(baseURL + url, {
    cache: "no-store",
    credentials: "include",
  }).then((res) => res.json());
