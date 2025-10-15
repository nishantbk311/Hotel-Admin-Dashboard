import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      // this line to update cache manually by setting it once again
      // update cache immediately, no need to refetch
      // query key is always an array but can be written as string also
      queryClient.setQueryData(["user"], user);

      // queryClient.invalidateQueries({ queryKey: ["user"] }); //so that the cache in invalid and react-query refetches the data from 'cabins'.
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}
