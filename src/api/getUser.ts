import { IUser } from "@/types/auth.types";
import { myAxios } from "./axios";


export default async function getUser(id: number): Promise<IUser | null> {
  let response: IUser | null = null;
  await myAxios
    .get(`/users/${id}`)
    .then((res) => {
      response = res.data;
    })
    .catch((error) => {
      console.error(error);
    });

  return response;
}