import "./App.css";
import useAddPost from "./hooks/Mutations/useAddPost";
import useGetPosts from "./hooks/Queries/useGetPosts";

const App = () => {
  const { posts, loadingPosts } = useGetPosts();
  const { mutate } = useAddPost();

  return (
    <>
      <h2>Posts</h2>

      <button
        onClick={() => {
          let data = {
            id: 101,
            title: "foo",
            body: "bar",
            userId: 1,
          };
          mutate(data);
        }}
      >
        Submit
      </button>
      {loadingPosts ? (
        <p>Loading....</p>
      ) : (
        posts?.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </>
  );
};

export default App;
