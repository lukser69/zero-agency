import { IPost } from "@/types/post.types";
import { myAxios } from "./axios";


export default async function getPosts() {
  let response: IPost[] | null = null;
  await myAxios
    .get('/posts')
    .then((res) => {
      response = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
}