import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Post from "../../components/Post";
import { Context } from "../../context/Context";
import { HiEmojiSad } from "react-icons/hi";
import Spinner from "../../components/Spinner";
import { FaChevronRight, FaChevronLeft, FaEllipsisH } from "react-icons/fa";

const Posts = ({ title }) => {
  const { user } = useContext(Context);
  const location = useLocation();
  const searchPath = [];

  const [posts, setPosts] = useState([]);
  const { search } = useLocation();
  const { apiURL } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  searchPath.push(location.search.split("=")[0]);
  searchPath.push(location.search.split("=")[1]);

  const [currentPage, setCurrentPage] = useState(1);

  const [itemsPerPage] = useState(5);

  const pages = [];

  for (let i = 1; i <= Math.ceil(posts.length / itemsPerPage); i++) {
    pages.push(i);
  }

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const handleClick = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <button
          className={
            number === currentPage
              ? "inline-flex items-center justify-center w-10 h-10 bg-gray-900 font-semibold text-md border-4 border-white rounded shadow-md mr-2"
              : "inline-flex items-center justify-center w-10 h-10 text-sm border font-semibold rounded shadow-md bg-gray-800 border-gray-800 mr-2"
          }
          style={{ border: number === currentPage && "3px solid #c1c1c1" }}
          title={`Page ${number}`}
          key={number}
          id={number}
          onClick={handleClick}
        >
          {number}
        </button>
      );
    } else {
      return null;
    }
  });

  const handleNextbtn = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;

  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = (
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 py-0 border rounded-md shadow-md bg-gray-800 border-gray-800 text-sm font-semibold mr-2"
        onClick={handleNextbtn}
      >
        <FaEllipsisH className="text-sm" />
      </button>
    );
  }

  let pageDecrementBtn = null;

  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = (
      <button
        type="button"
        className="inline-flex items-center justify-center w-10 h-10 py-0 border rounded-md shadow-md bg-gray-800 border-gray-800 mr-2"
        onClick={handlePrevbtn}
      >
        <FaEllipsisH className="text-sm" />
      </button>
    );
  }

  if (searchPath[0] === "?user") {
    title = `Publicaciones de "${searchPath[1]}" `;
  }

  if (searchPath[0] === "?cat") {
    title = `Publicaciones en la categoria "${searchPath[1]}" `;
  }

  user && searchPath[1] === user.username && (title = "Mis publicaciones");

  useEffect(() => {
    setIsLoading(true);

    const fetchPosts = async () => {
      const res = await axios.get(apiURL + "/posts/" + search);
      setPosts(res.data);
      console.log(res);
      setIsLoading(false);
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <>
      <div className="w-full col-span-full my-12">
        <h1 className="font-bold text-3xl text-center">{title}</h1>
      </div>
      {isLoading ? (
        <div className="w-full col-span-full my-5 flex items-center justify-center">
          <Spinner />
        </div>
      ) : posts.length ? (
        <div className="my-4 md:p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 2x1:grid-cols-3  gap-y-6 gap-x-0 container mx-auto items-center justify-center  min-h-screen">
          <>
            {currentItems.map((post) => (
              <Post key={post._id} post={post} />
            ))}
          </>
          {/* ------- Pagination ------- */}
          <div className="w-full col-span-full my-5 flex items-center justify-center ">
            <button
              title="previous"
              type="button"
              className={
                currentPage === pages[0]
                  ? "hidden"
                  : "inline-flex items-center justify-center w-10 h-10 py-0 border rounded-md shadow-md bg-gray-800 border-gray-800 mr-2 ml-2"
              }
              onClick={handlePrevbtn}
              disabled={currentPage === pages[0] ? true : false}
            >
              <FaChevronLeft className="text-sm" />
            </button>

            {pageDecrementBtn}
            {renderPageNumbers}
            {pageIncrementBtn}

            <button
              title="next"
              type="button"
              className={
                currentPage === pages[pages.length - 1]
                  ? "hidden"
                  : "inline-flex items-center justify-center w-10 h-10 py-0 border rounded-md shadow-md bg-gray-800 border-gray-800 mr-2"
              }
              onClick={handleNextbtn}
              disabled={currentPage === pages[pages.length - 1] ? true : false}
            >
              <FaChevronRight className="text-sm" />
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full col-span-full my-12 font-normal text-2xl text-center flex-column justify-center items-center mx-auto">
          <h1 className="block">
            Lo sentimos pero no hay publicaciones para "{searchPath[1]}"
          </h1>
          <HiEmojiSad className="block self-center text-center mx-auto text-7xl mt-7" />
        </div>
      )}
    </>
  );
};

export default Posts;
