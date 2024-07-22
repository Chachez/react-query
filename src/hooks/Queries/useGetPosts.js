import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";

import { getPosts } from "../../redux/actions/posts";
import axiosInstance from "../../utils/axiosInstance";
import useNotification from "../../components/controls/notify";

const fetchPosts = async () => {
  const res = await axiosInstance.get("/posts");
  return res.data;
};

const useGetPosts = () => {
  const { errorNotify } = useNotification();

  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  const {
    data: fetchedPosts,
    error,
    isLoading: loadingPosts,
    isError: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
    refetchOnWindowFocus: false, // Means that refetching posts on window focus is disabled
    // enabled: !!id  // means that this query will only run if ID is not null
    retry: 5, // means that it will run 5 times if it fails till it gives up
  });

  useEffect(() => {
    dispatch(getPosts(fetchedPosts));
    postsError && errorNotify(error);
  }, [fetchedPosts, postsError]);

  // Return posts from fetched data or Redux state
  return { posts: posts?.posts, loadingPosts };
};

export default useGetPosts;
