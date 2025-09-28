import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import VendorDashboard from "./pages/VendorDashboard";
import AdminRouting from "./Admin/AdminRouting";
import ShowProductdetail from "./product/ShowProductdetail";
import SearchProduct from "./product/SearchProduct";
import CategoryProduct from "./product/CategoryProduct";
import TotalCart from "./product/TotalCart";
import CategoryButton from "./product/CategoryButton";
import ShippingAddress from "./shoper/ShippingAddress";
import OrderSummery from "./shoper/OrderSummery";
import PaymentOption from "./shoper/PaymentOption";
import Orderdeliver from "./shoper/Orderdeliver";
import TotalOrder from "./shoper/TotalOrder";
import Register from "./Authentication/Register";
import Login from "./Authentication/Login";
import { useDispatch, useSelector } from "react-redux";
import { closeSidebar } from "./Redux-Toolkit/mySlice";
import Profile from "./Profile/Profile";
import My_Orders from "./Profile/My_Orders";
import ProfileInfo from "./Profile/ProfileInfo";
import Wishlist from "./Profile/Wishlist";
import Address from "./Profile/Addresses";
import PaymentMethod from "./Profile/SavedPaymentMethods";
import Settings from "./Profile/Settings";
import Logout from "./Profile/Logout";
import Pay from "./Pay/Pay";
import CashSummary from "./Cash/CashSummary";
import SuccessPage from "./Cash/SuccessPage";
import CashAddressPage from "./Cash/CashAddressPage";
import SavedPaymentMethods from "./Profile/SavedPaymentMethods";
import Filter from "./Profile/Filter";
import Filter_Child from "./Profile/Filter_Child";
import Cashdelivery from "./Cash/Cashdelivery";

function App() {
  const location = useLocation();
    const sidebarOpen = useSelector((state)=> state.all.sidebarOpen)
      const dispatch = useDispatch();



  const hideCategoryButtonPaths = ['/cart', '/shipping', '/checkout', '/pay', '/deliver', '/total', '/register', '/login','myorder','/admin'];
  const AllhideButtonPaths = ['/register', '/login',"/admin"];
  

  return (
    <>
      {!AllhideButtonPaths.includes(location.pathname) && <Navbar />}
      {!hideCategoryButtonPaths.includes(location.pathname) && <CategoryButton />}
<Profile isOpen={sidebarOpen} onClose={() => {dispatch(closeSidebar())}} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor" element={<VendorDashboard />} />
        <Route path="/admin" element={<AdminRouting />} />
        <Route path="/show" element={<ShowProductdetail />} />
        <Route path="/search/:name" element={<SearchProduct />} />
        <Route path="/category/:name" element={<CategoryProduct />} />
        <Route path="/cart" element={<TotalCart />} />
        <Route path="/shipping" element={<ShippingAddress />} />
        <Route path="/checkout" element={<OrderSummery />} />
        <Route path="/pay" element={<Pay />} />
        <Route path="/deliver" element={<Orderdeliver />} />
        <Route path="/Cash_deliver" element={<Cashdelivery />} />
        <Route path="/total" element={<TotalOrder />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
       <Route path="/info" element={<ProfileInfo />} />
        <Route path="/myorder" element={<My_Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/address" element={<Address />} />
        <Route path="/PaymentMethod" element={<SavedPaymentMethods />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/cap" element={<CashAddressPage />} />
        <Route path="/summary" element={<CashSummary />} />
        <Route path="/succss" element={<SuccessPage />} />
        <Route path="/filter" element={<Filter />} />
        <Route path="/filter/child" element={<Filter_Child />} />


 




      
      </Routes>
    </>
  );
}

export default App;
