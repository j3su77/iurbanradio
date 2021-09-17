import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../context/Context";
import { FaUpload } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";
import Category from "../../components/Category";
const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { user, apiURL } = useContext(Context);
  const [cats, setCats] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const catsSelect = [];
    const newPost = {
      username: user.username,
      title,
      desc,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;

      data.append("name", filename);
      data.append("file", file);

      newPost.photo = filename;

      for (let ca of catTrue) {
        catsSelect.push({ name: ca });
      }

      newPost.categories = catsSelect;

      try {
        await axios.post(apiURL + "/upload", data);
      } catch (error) {}
      try {
        const res = await axios.post(apiURL + "/posts", newPost);

        window.location.replace("/post/" + res.data._id);
      } catch (error) {}
    }
  };

  return (
    <div className="container m-auto">
      <form
        className="col-span-full bg-transparent md:bg-jdark sm:container mx-auto sm:w-full grid grid-rows-3 grid-cols-9"
        onSubmit={handleSubmit}
      >
        <div
          className="relative col-span-full row-span-3 bg-gray-300 flex justify-center items-center"
          style={{ height: "365px" }}
        >
          {file && (
            <>
              <img className="h-48" src={URL.createObjectURL(file)} alt="" />
            </>
          )}
          {!file ? (
            <>
              <BiImageAdd
                size="260px"
                className="text-jdark absolute  text-opacity-25 z-10"
                style={{ fontSize: "8rem" }}
              />

              <label class="w-15 h-15 px-3 pb-2 pt-1 bg-white shadow-md tracking-wide border border-blue cursor-pointer hover:bg-jdark hover:text-white text-jdark ease-linear transition-all duration-150 rounded-full  flex items-center font-semibold  justify-center z-20 self-end mb-4">
                <span class="mt-2 text-base inline-block leading-normal">
                  <FaUpload className="inline-block mx-2 -mt-1 self-center" />
                  Subir imagen
                </span>
                <input
                  type="file"
                  id="fileInput"
                  class="hidden"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </label>
            </>
          ) : (
            <label class="w-15 h-15 px-4 absolute bottom-2 right-2 py-6 bg-white shadow-md tracking-wide  border border-blue cursor-pointer hover:bg-purple-600 hover:text-white text-purple-600 ease-linear transition-all duration-150 rounded-full">
              <i class="fas fa-cloud-upload-alt fa-3x"></i>
              <span class="mt-2 text-base leading-normal">
                cambiar una imagen
              </span>
              <input
                type="file"
                id="fileInput"
                class="hidden"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
          )}
        </div>
        <label class="col-span-full md:col-start-3 md:col-end-8 mt-10   ">
          <input
            type="text"
            placeholder="Titulo de la publicación"
            className="w-full bg-transparent p-4 text-3xl focus:outline-none border-transparent border-b-2 border-white"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <textarea
          className=" col-span-full md:col-start-2 md:col-end-9 row-span-6 mt-11 form-textarea block w-full p-7 text-gray-900 font-normal text-xl "
          placeholder="ingresa la informacion"
          type="text"
          rows="12"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>

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

        <div className="col-start-1 col-end-10 my-20 flex justify-center items-center row-auto ">
          <button
            type="submit"
            className="w-48 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
          >
            Publicar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;