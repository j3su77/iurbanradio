import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import dateformat from "dateformat";

import { FaEdit, FaTrashAlt, FaLink } from "react-icons/fa";
import { FcCancel } from "react-icons/fc";
import Category from "./Category";

const SinglePost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user, apiUrlImg, apiURL } = useContext(Context);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [updateMode, setUpdateMode] = useState(false);
  const [cats, setCats] = useState([]);

  const fecha = new Date(post.createdAt).toDateString();

  const temp = [];

  useEffect(() => {
    const getPost = async () => {
      try {
        const res = await axios.get(`${apiURL}/posts/${path}`);
        setPost(res.data);
        setTitle(res.data.title);
        setDesc(res.data.desc);
        temp(res.data.categories);
      } catch (error) {
        console.log(error);
      }
    };
    getPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);




  var catTrue = [];

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get(apiURL + "/categories");
      setCats(res.data);
      console.log(res);
    };
    fetchCats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      catTrue.push(id);
    }

    if (!checked) catTrue = catTrue.filter((word) => word !== id);
  };


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
    const catsSelect = [];

    for (let ca of catTrue) {
      catsSelect.push({ name: ca });
    }

    const conjunto = new Set(catsSelect);
    const unicos = [...conjunto];

    console.log(unicos);

    try {
      await axios.put(apiURL + "/posts/" + path, {
        username: user.username,
        categories: unicos,
        title,
        desc,
      });
      setUpdateMode(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    post && (
      <>
        <div
          className={`sm:container mx-auto sm:w-full grid grid-rows-3 grid-cols-6`}
          style={{ maxWidth: "1200px" }}
        >
          <div
            className="col-span-full row-span-3"
            style={{ minWidth: "365px", minHeight: "100%" }}
          >
            {post && post.photo && (
              <img
                className=" w-full mx-auto object-cover"
                src={
                  post.photo.includes("http")
                    ? post.photo
                    : apiUrlImg + post.photo
                }
                alt=""
                style={{ height: "365px" }}
              />
            )}
          </div>

          {user && post && post.username === user.username && (
            <div className="col-end-7 flex items-center py-5  col-span-full bg-jdark">
              <div className="mx-3 ml-10 bg-gray-300  flex items-center justify-center rounded-full w-12 h-12">
                {!updateMode && (
                  <FaEdit
                    className="text-3xl  text-green-600 "
                    onClick={() => setUpdateMode(true)}
                  />
                )}
                {updateMode && (
                  <FcCancel
                    className="text-3xl  text-green-600 "
                    onClick={() => setUpdateMode(false)}
                  />
                )}
              </div>

              <div className=" mr-10 ml-auto bg-gray-300  flex items-center justify-center rounded-full w-12 h-12">
                <FaTrashAlt
                  className="text-2xl mx-3  text-red-500 "
                  onClick={handleDelete}
                />
              </div>
            </div>
          )}

          <span className="col-start-1 col-end-5 md:col-end-3 ml-3 text-left leading-5 mt-4 italic font-semibold">
            Creado por:
            <Link to={`/?user=${post.username}`} className="mx-3">
              <span className="capitalize inline-flex leading-4 not-italic font-semibold items-center bg-gray-300 text-jdark  px-1 rounded-sm nowrap">
                {post.username}{"   "}
                <FaLink className="inline-block text-green-600 text-xs ml-2 " />
              </span>
            </Link>
          </span>
          <span className="col-start-5 col-end-7  italic text-sm  mt-4  text-center">
            {dateformat(fecha, "dd/ mm / yyyy")}
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
              <h1 className="text-center text-4xl mt-12  font-semibold col-span-2">
                {title}
              </h1>
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
            <div
              dangerouslySetInnerHTML={{ __html: desc }}
              className="col-start-1 col-end-7 my-20 px-3 lg:px-8"
            ></div>
          )}

          {updateMode && (
              <div class="col-start-2 col-end-8 grid grid-cols-2 gap-2 justify-center items-center">
              <h1 class="text-white my-10 col-span-full text-center">Categorias</h1>
    
              {cats.map((cat, index) => (
                <Category
                  key={index}
                  cat={cat}
                  id={cat.name}
                  onChange={handleCheckboxChange}
                />
              ))}
            </div>
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
    )
  );
};

export default SinglePost;
