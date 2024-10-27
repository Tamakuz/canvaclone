import { client } from "../utils";
import { useQuery } from "react-query";

export const useGetImages = () => {
  const query = useQuery({
    queryKey: ["images"],
    queryFn: async () => {
      const response = await client.api.images.$get();

      if (!response.ok) {
        throw new Error("Failed to fetch images");
      }

      const { data } = await response.json();
      return data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return query;
};

