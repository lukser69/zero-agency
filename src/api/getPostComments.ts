import { IComment } from "@/types/post.types";
import { myAxios } from "./axios";

export default async function getPostComments(id: number): Promise<IComment[] | null> {
  let response: IComment[] | null = null;
  await myAxios
    .get(`/posts/${id}/comments`)
    .then((res) => {
      response = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
}