import axios from "axios";

type handleFetchTypes = {
  url: string;
  method: "GET" | "POST" | "DELETE";
  body?: { [key: string]: string };
};

export async function handleFetch<T>({
  url,
  method,
  body,
}: handleFetchTypes): Promise<T> {
  if (method === "GET") {
    const { data } = await axios.get<T>(url);
    return data;
  } else if (method === "POST") {
    const { data } = await axios.post<T>(url, { ...body });
    return data;
  } else if (method === "DELETE") {
    const { data } = await axios.delete<T>(url);
    return data;
  } else {
    throw new Error("Unsupported method");
  }
}
