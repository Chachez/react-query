import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import useNotification from "../../components/controls/notify";
import axiosInstance from "../../utils/axiosInstance";
import { addPost } from "../../redux/actions/posts"; // Import the correct action

const addPostMutation = async (post) => {
  const res = await axiosInstance.post("/posts", post);
  console.log(post);
  return res.data;
};

const useAddPost = (post) => {
  const dispatch = useDispatch();
  const { errorNotify, successNotify } = useNotification();
  const queryClient = useQueryClient();

  const { mutate, isError, isLoading, error } = useMutation({
    mutationFn: () => addPostMutation(post),
    onSuccess: (data) => {
      dispatch(addPost(data));
      successNotify("Post added successfully");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: (error) => {
      errorNotify(error.message || "An error occurred");
    },
  });

  return {
    isLoading: isLoading,
    isError: isError,
    error: error,
    mutate: mutate,
  };
};

export default useAddPost;
