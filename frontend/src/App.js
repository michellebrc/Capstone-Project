import "./App.css";
import NavItem from "./Component/NavItem";
import Footer from "./Component/Footer";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <NavItem />
      <Footer />
    </div>
  );
}

export default App;


// import './App.css';
// import NavItem from './Component/NavItem';
// import Footer from './Component/Footer';
// import 'react-toastify/dist/ReactToastify.css';
// import { ToastContainer } from "react-toastify";
// import { Link, Route, Routes, Redirect, Switch } from "react-router-dom";
// import RequireAuth from './Component/RequireAuth';
// import NotFound from "../src/Component/NotFound";
// import MyAccount from "../src/Screens/MyAccount";
// import MyCart from "../src/Screens/MyCart";
// import Menu from "../src/Screens/Menu";
// import Login from "../src/Component/Login";
// import Secret from "../src/Component/Secret";







// function App() {
  
//   return (
//     <div>
//       <NavItem />
//         {/* set up screen routes */}
//         <ToastContainer />
//         <Routes>
//           <Route exact path="/menu" element={<Menu />} />
//           {/* <Route exact path="/" element={<Menu/>} /> */}
//           <Route path="/secret" element={<Secret/>} />   
//           <Route path="/" element={<Login />} />
//           <Route
//             path="/menu"
//             element={
//               <RequireAuth redirectTo="/">
//                 <Menu />
//               </RequireAuth>
//             }
//           />
//           <Route path="/myCart" element={<MyCart />} />
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//         <Footer/>
//     </div>
//   );
// }

// export default App;
