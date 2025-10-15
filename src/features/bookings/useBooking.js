import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId], //including bookigId is very important because when we switch between different booking pages,
    //  the data that each of them gets will be he same
    queryFn: () => getBooking(bookingId), //this is the async funrtion that returns data when promise resolved, which is then stored in cache.
    retry: false,
  });

  return { isLoading, error, booking };
}
