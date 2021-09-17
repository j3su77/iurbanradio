import {  useState } from "react";

const Category = ({ id, cat, cate, onChange = () => {} }) => {
  const [select, setSelect] = useState(false);
  const [actualState, changeCheckState] = useState(false);
  const handleCheckbox = (e) => {
    changeCheckState(e.target.checked);

    setSelect(!select);

    if (onChange) {
      onChange(id, e.target.checked);
    }
  };

  return (
    <div className="bg-gray-800">
      <div className={" text-white p-1 " + (select && " bg-blue-600")}>
        <label
          class={
            " col-span-1 flex justify-start items-center" +
            (select && " bg-blue-800")
          }
        >
          <input
            checked={actualState}
            onChange={handleCheckbox}
            id={id}
            type="checkbox"
            className="bg-red-600 w-7 h-7 mr-2 border border-gray-300 rounded cursor-pointer "
          />
          <span class="font-semibold text-lg text-justify mx-auto">
            {" "}
            {cat.name}
          </span>
        </label>
      </div>
    </div>
  );
};

export default Category;
