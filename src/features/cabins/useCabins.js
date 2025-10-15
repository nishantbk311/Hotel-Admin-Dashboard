import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins, //this is the async funrtion that returns data when promise resolved, which is then stored in cache.
  });

  return {isLoading, error, cabins};
}
