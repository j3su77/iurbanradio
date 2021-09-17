import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

import Posts from "../home/Posts";


const UserPosts = () => {
  const { user, apiURL } = useContext(Context);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const username = user.username;
  useEffect(() => {
    setIsLoading(true);
    const getPosts = async () => {
      try {
        const res = await axios.get(`${apiURL}/posts?user=${username}`);
        setPosts(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
    <>
      <div className="w-full col-span-full my-5 ">
        <h1 className="font-bold text-3xl text-center block">
          Mis publicaciones
        </h1>
      </div>
      <Posts posts={posts} isLoading={isLoading} />)
    </>
  );
};

export default UserPosts;
