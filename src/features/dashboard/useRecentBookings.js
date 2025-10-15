import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getBookingsAfterDate } from "../../services/apiBookings";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  // default is 7
  const numDays = !searchParams.get("last")
    ? 7
    : Number(searchParams.get("last"));

  // to subtract date
  // important function
  const queryDate = subDays(new Date(), numDays).toISOString();

  const { isLoading, data: bookings } = useQuery({
    queryFn: () => getBookingsAfterDate(queryDate),
    // we already have bookings key so adding last-days also to differ
    queryKey: ["bookings", `last-${numDays}`],
  });

  return { isLoading, bookings };
}
