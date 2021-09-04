import Post from "../../components/Post";

const Posts = ({ posts ,title}) => {
  return (
    <div className="my-4 md:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2x1:grid-cols-3  gap-y-6 gap-x-0 container mx-auto">
      <div className="w-full col-span-full my-12">
        <h1 className="font-bold text-3xl text-center ">{title}</h1>
      </div>

      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Posts;
