import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";

import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { FcCancel } from 'react-icons/fc';

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user, apiUrlImg , apiURL} = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);



  useEffect(() => {
    const getPost = async () => {
    try {
      const res = await axios.get(`${apiURL}/posts/${path}`);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
      console.log(res);
    } catch (error) {
      console.log(error)
    }
    };
    getPost();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  const handleDelete = async () => {
    try {
      await axios.delete(apiURL + "/posts/" + path, {
        data: {
          username: user.username,
        },
      });
      window.location.replace("/");
    } catch (error) {}
  };

  const handleUpdate = async () => {
    try {
      await axios.put(apiURL + "/posts/" + path, {
        username: user.username,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
   post && <>
    <div
      className={`sm:container mx-auto sm:w-full grid grid-rows-3 grid-cols-6`}
      style={{maxWidth: "1200px"}}
    >
      
      <div className="col-span-full row-span-3" style={{minWidth: "365px", minHeight: "100%"}}>
        {post && post.photo && (
          <img
            className=" w-full mx-auto object-cover"
            src={post.photo.includes('http') ?  post.photo  :  apiUrlImg + post.photo}
            alt=""
            style={{ height: "365px" }}
          />
        )}
      </div>

      {user && post && post.username === user.username && (
        <div className="col-end-7 flex items-center py-5  col-span-full bg-jdark">
          <div className="mx-3 ml-10 bg-gray-300  flex items-center justify-center rounded-full w-12 h-12">
         {
           !updateMode 
           && (<FaEdit
            className="text-3xl  text-green-600 "
            onClick={() => setUpdateMode(true)}/>)}
            {updateMode && <FcCancel
            className="text-3xl  text-green-600 "
            onClick={() => setUpdateMode(false)}
              />
            }
          </div>

          <div className=" mr-10 ml-auto bg-gray-300  flex items-center justify-center rounded-full w-12 h-12">
          <FaTrashAlt
            className="text-2xl mx-3  text-red-500 "
            onClick={handleDelete}
          />
          </div>

        </div>
      )}



<span className="col-start-1 col-end-3 text-center">
        Creado por:
        <Link to={`/?user=${post.username}`} className="link mx-3 capitalize">
          <b>{post.username}</b>
        </Link>
      </span>
      <span className="col-start-5 col-end-7 text-right">
        {new Date(post.createdAt).toDateString()}
      </span>


      <div className="col-start-1 col-end-7 flex justify-center items-center ">
        {updateMode ? (
          <input
            type="text"
            value={title}
            className=" mt-12"
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
          />
        ) : (
          <h1 className="text-center text-4xl mt-12  font-semibold col-span-2">{title}</h1>
        )}
      </div>
    

     

      {updateMode ? (
        <textarea
          className="col-start-1 col-end-7 mt-20 bg-black border-none focus:outline-none"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows="10"
        ></textarea>
      ) : (
        <div dangerouslySetInnerHTML={{ __html: desc }} className="col-start-1 col-end-7 mt-20 px-3 lg:px-8"></div>
      )}
      {updateMode && (
        <button
          className="col-start-3 col-end-5 bg-indigo-600 mt-20 mb-14 p-3"
          onClick={handleUpdate}
          type="submit"
        >
          update
        </button>
      )}
    </div>
    </>
  );
};

export default SinglePost;
