import axios from "axios";

type handleFetchTypes = {
  url: string;
  method: "GET" | "POST" | "DELETE" | "PUT";
  body?: { [key: string]: string };
};

export async function handleFetch<T>({
  url,
  method,
  body,
}: handleFetchTypes): Promise<T> {
  switch (method) {
    case "GET":
      const getResponse = await axios.get<T>(url);
      return getResponse.data;
    case "POST":
      const postResponse = await axios.post<T>(url, { ...body });
      return postResponse.data;
    case "PUT":
      const putResponse = await axios.put<T>(url, { ...body });
      return putResponse.data;
    case "DELETE":
      const deleteResponse = await axios.delete<T>(url);
      return deleteResponse.data;
    default:
      throw new Error("Unsupported method");
  }
}
