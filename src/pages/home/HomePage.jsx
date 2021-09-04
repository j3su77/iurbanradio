import { useContext, useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import axios from "axios";
import Chat from "./Chat"
import Posts from "./Posts"
import Slider from "./Slider"
import { Context } from "../../context/Context";




const HomePage = () => {
    const [posts, setPosts] = useState([]);
    const { search } = useLocation()
    const { apiURL } = useContext(Context)

    useEffect(() => {
        const fetchPosts = async () => {
          const res = await axios.get(apiURL + "/posts/" + search);
          setPosts(res.data)
          console.log(res);
        };
        fetchPosts();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [search]);
    
    return (
        <div className={` container mx-auto bg-red-0 md:container md:mx-auto`} style={{maxWidth: "1200px"}}>
            <Slider />
         
            <Posts posts={posts} title={"Publicaciones"} />

            <Chat />
        </div>
    )
}

export default HomePage
