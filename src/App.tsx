import Header from "./Components/Layout/Header/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Error from "./Pages/Error/Error";
// import CreateCard from "./Pages/CreateCard/CreateCard";
import Footer from "./Components/Layout/Footer/Footer";
import CardDetails from "./Pages/CardDetails/CardDetails";
import Profile from "./Pages/Profile/Profile";
import RoutGuard from "./Components/Shared/RoutGuard";
import { useSelector } from "react-redux";
import { TRootState } from "./Store/BigPie";
import Favorites from "./Pages/Favorites/Favorites";
import MyCards from "./Pages/MyCards/MyCards";
import CreateCard from "./Pages/CreateCard/CreateCard";

function App() {
  const user = useSelector((state: TRootState) => state.UserSlice.user);

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />

        <Route path="/register" element={
          <RoutGuard user={user!} publicOnly={true}>
            <Register />
          </RoutGuard>
        } />

        <Route path="/login" element={
          <RoutGuard user={user!} publicOnly={true}>
            <Login />
          </RoutGuard>
        } />

        <Route path="/profile" element={
          <RoutGuard user={user!} publicOnly={false}>
            <Profile />
          </RoutGuard>
        } />

        <Route path="/favorites" element={
          <RoutGuard user={user!} publicOnly={false}>
            <Favorites />
          </RoutGuard>
        } />

        <Route path="/myCards" element={
          <RoutGuard user={user!} publicOnly={false}>
            <MyCards />
          </RoutGuard>
        } />

        <Route path="/createCard" element={
          <RoutGuard user={user!} publicOnly={false}>
            <CreateCard />
          </RoutGuard>
        } />

        <Route path="/card/:id" element={<CardDetails />} />
        <Route path="/*" element={<Error />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;