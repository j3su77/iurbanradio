import SinglePost from "../../components/SinglePost";
import Styles from "./single.module.css";

const Single = () => {
  return (
    <div
      className={`${Styles.container_single} relative md:container mx-auto xs:w-full min-h-screen`}
      style={{maxWidth:"1200px"}}
    >
      <SinglePost />
    </div>
  );
};

export default Single;
