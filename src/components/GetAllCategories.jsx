import axios from "axios";
import { useEffect, useState } from "react";
import Category from "./Category";
import { useContext } from "react";
import { Context } from "../context/Context";


const GetAllCategories = ({setCate,cate}) => {
    var catTrue = [];
  

    const [categoria, setCategoria] = useState([])
   
    const {  apiURL } = useContext(Context);
   
  const handleCheckboxChange = (id, checked) => {
    if (checked) {
      catTrue.push(id);
      
    }



    if (!checked)  {catTrue = catTrue.filter(word => (word !== id) )
      setCate([cate.filter(word => word !== id)])
      
    }
    
    
    setCate([...cate, catTrue])
  
  };

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get(apiURL + "/categories");
      setCategoria(res.data);
      console.log(res);
    };
    fetchCats();
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

 

  

    return (
        <div class="col-start-2 col-end-9 grid grid-cols-2 gap-3 justify-center items-center">
          <h1 class="text-white mt-10 col-span-full text-xl font-bold text-center">Hashtag</h1>

          {categoria.map((cat, index) => (
            <Category
              key={index}
              cat={cat}
              id={cat.name}
              onChange={handleCheckboxChange}
              cate = {cate}
            />
          ))}
        </div>
    )
}

export default GetAllCategories
