import { useState } from "react"


const Category = ({ id, cat, onChange = () => {} }) => {
    const [actualState, changeCheckState] = useState(false);
    const handleCheckbox = e => {
        changeCheckState(e.target.checked);
        
       
        
        if (onChange) {
          onChange(id, e.target.checked);
        }

    

      };


    return (
    
            <label class="items-center col-span-1">
              <input checked={actualState} onChange={handleCheckbox}  id={id} type="checkbox" class="form-checkbox h-5 w-5" />
              <span class="mr-5"> {cat.name}</span>
            </label>
     
    )
}

export default Category
