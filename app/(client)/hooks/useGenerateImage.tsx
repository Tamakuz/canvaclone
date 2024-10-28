import { useQuery } from "react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "../utils";

type ResponseType = InferResponseType<
  (typeof client.api.ai)["generate-image"]["$post"]
>;
type RequestType = InferRequestType<
  (typeof client.api.ai)["generate-image"]["$post"]
>["json"];

export const useGenerateImage = (prompt: string) => {
  const query = useQuery<ResponseType, Error>(
    ["generate-image", prompt],
    async () => {
      const response = await client.api.ai["generate-image"].$post({ 
        json: { prompt } 
      });
      return await response.json();
    },
    {
      enabled: !!prompt,
    }
  );

  return query;
};
