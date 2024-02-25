import { Link } from "react-router-dom";
import Logout from "./LogoutButton";
import { useEffect, useState } from "react";
import axios from "../helpers/axios";
import TopUpModal from "./TopUpModal";
export default function NavBar() {
  const [user, setUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUser();
  }, []);
  const openTopUpModal = () => {
    setIsModalOpen(true)
  }
  const closeTopUpModal = () => {
    setIsModalOpen(false)
  }
  const handleAddSuccess = () => {
    fetchUser()
  }
  if (localStorage.getItem("access_token")) {
    return (
        <div>
        <div className="navbar bg-black">
          <div className="flex-1">
              <button className="btn btn-ghost text-xl text-white">vOffice</button>
          </div>
          <div className="flex-1">
            <Link to="/rooms">
              <button className="btn btn-ghost text-xl text-white">Rooms Available</button>
            </Link>
          </div>
          <div className="flex-none">
            <div className="flex-1 mx-5">
              <a className="text-xl text-white">Credits: {user.credits}</a>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 9h16v10H4zm0 0l8-5 8 5V5l-8 5-8-5v14z" /></svg>
                  <span className="badge badge-sm indicator-item">{user.RoomUsages ? user.RoomUsages.length : 0}</span>
                </div>
              </div>
              <div tabIndex={0} className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow">
                <div className="card-body">
                  <span className="font-bold text-lg">{user.RoomUsages ? user.RoomUsages.length : 0} Bookings</span>
                  <div className="card-actions">
                    <Link to="/my-bookings">
                      <button className="btn bg-black text-white">View Bookings</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li>
                  <button className="justify-between" onClick={openTopUpModal}>
                    Top Up Credits
                  </button>
                </li>
                <li><Logout /></li>
              </ul>
            </div>
          </div>
        </div>
        {isModalOpen && (
          <TopUpModal closeModal={closeTopUpModal} onAddSuccess={handleAddSuccess} />
        )}
      </div>
    );
  } else {
    return (
      <div className="navbar bg-black">
        <div className="flex-1">
          <Link to="/">
            <button className="btn btn-ghost text-xl text-white">
              vOffice
            </button>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal text-white font-bold">
            <li>
              <Link to="/login">
                <h1>Login</h1>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <h1>Register</h1>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

