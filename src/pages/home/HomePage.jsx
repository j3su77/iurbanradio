

import Chat from "./Chat";
import Posts from "./Posts";
import Slider from "./Slider";


const HomePage = () => {


  return (
    <div
      className={` container mx-auto bg-red-0 md:container md:mx-auto`}
      style={{ maxWidth: "1200px" }}
    >
      <Slider />
      
      <Posts title={"Publicaciones"}/>

      <Chat />
    </div>
  );
};

export default HomePage;
