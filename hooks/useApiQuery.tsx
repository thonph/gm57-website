"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAPI } from "../utils/fetch-api";

export default function useApiQuery<T>(path: string, paramsObject: any) {
  const key = ['api', path, paramsObject];
  const useRewardQuery = useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const data = await fetchAPI(path, paramsObject);
      return data;
    },
    refetchOnMount: false,
  });

  return useRewardQuery;
}