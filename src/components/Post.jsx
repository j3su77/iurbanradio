import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";


const Post = ({ post }) => {

  const { apiUrlImg } = useContext(Context)

  return (
    <>
    <div className="">
      <div className="rounded overflow-hidden shadow-lg relative mx-4 box-content ">
        <Link to={`/post/${post._id}`} className="w-full text-start">
          <img
            className="w-full h-auto box-content"
            src={ post && post.photo ? apiUrlImg + post.photo
              : "https://cdn.wallpaperhub.app/cloudcache/e/e/d/0/f/5/eed0f57b36988e02b064ed861f55084972a0e6f4.jpg"
            }
            alt={post.title}
            style={{maxWidth: "656px", maxHeight: "auto"}}
          />
          <div className="lg:px-2 pt-1 mt-1 absolute inset-x-0 top-0 ml-">
            {post.categories.map((c, index) => (
              <span key={index} className="inline-block bg-gray-800 rounded-lg px-2 py-1 text-xs font-semibold mr-2 mb-2 shadow-lg ">
                {"#" + (c.name)} 
              </span>
            ))}
          </div>
          <div className=" absolute inset-x-0 bottom-0 ">
            <div className=" px-5 py-2 bg-gray-800 bg-opacity-25">
              <p className="font-bold text-2xl md:text-3xl">{post.title}</p>
            </div>
          </div>
        </Link>
       
      </div>
      </div>
    </>
  );
};

export default Post;
