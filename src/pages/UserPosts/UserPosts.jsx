import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

import Posts from "../home/Posts";

const UserPosts = () => {
  const { user, apiURL } = useContext(Context);
  const [posts, setPosts] = useState([]);

  const username = user.username;
  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = await axios.get(`${apiURL}/posts?user=${username}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  return (
   
    <Posts posts={posts} title={"Mis Publicaciones"} />
  
  );
};

export default UserPosts;
