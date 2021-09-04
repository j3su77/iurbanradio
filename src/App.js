import { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AudioPlayer from "./components/radio/AudioPlayer";
import {  Context } from "./context/Context";
import HomePage from "./pages/home/HomePage";
import Login from "./pages/login/Login";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import PageNotFound from "./pages/404/PageNotFound"
import UserPosts from "./pages/UserPosts/UserPosts";
import Settings from "./pages/home/settings/Settings";
function App() {
  const { user } = useContext(Context);
  console.log(user);
  return (
 
      <div className="bg-hero-pattern text-gray-300">
        <Router>
          <Navbar />
          <AudioPlayer />
          <Switch>
            <Route exact path="/post/:postId" component={Single} />

            <Route exact path="/login" component={user ? HomePage : Login} />

            <Route exact path="/write" component={user ? Write : Login} />

            <Route exact path="/myposts" component={user ? UserPosts : Login} />

            <Route exact path="/configuracion" component={user ? Settings : Login} />


            <Route exact path="/" component={HomePage} />
            <Route path="*" component={PageNotFound}/>
          </Switch>
        </Router>
      </div>
   
  );
}

export default App;
