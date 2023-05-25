import React, { useContext, useEffect, useRef, useState } from "react";
import "./NavIcons.css";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext/AuthContext";

// icons
import { CiLogout } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { CiEdit } from "react-icons/ci";
import HomeFilled from "../../../img/home-filled.png";
import HomeUnfilled from "../../../img/home-unfilled.png";
import MessageFilled from "../../../img/message-filled.png";
import MessageUnfilled from "../../../img/message-unfilled.png";
import NotificationUnfilled from "../../../img/notification-unfilled.png";
import SettingsFilled from "../../../img/settings-filled.png";
import SettingsUnfilled from "../../../img/settings-unfilled.png";
import ProfileFilled from "../../../img/profile-filled.png";
import ProfileUnfilled from "../../../img/profile-unfilled.png";

const DropdownItem = ({ item }) => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = async () => {
    dispatch({ type: "INTITIAL_STATE" });
    const res = await axios.post("/auth/logout");
    console.log(res);
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (item.id === 0) {
      navigate("/profile");
    } else if (item.id === 1) {
      navigate("/edit-profile");
    } else if (item.id === 2) {
      logout();
    }
  };

  return (
    <li className="dropdownItem" onClick={(e) => handleClick(e)}>
      <p>
        {item.icon}
        {item.label}
      </p>
    </li>
  );
};

const NavIcons = () => {
  const location = useLocation();
  const path = location.pathname;
  const settings = useRef();
  const [open, setOpen] = useState(false);
  const options = [
    { label: "My Profile", icon: <CiUser />, id: 0 },
    { label: "Edit Profile", icon: <CiEdit />, id: 1 },
    { label: "Logout", icon: <CiLogout />, id: 2 },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (!settings.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="NavIcons">
      <div className="navIcons">
        <Link to="/" className="navLink">
          <img src={path === "/" ? HomeFilled : HomeUnfilled} alt="" />
        </Link>

        <Link to="/inbox" className="navLink">
          <img
            src={path === "/inbox" ? MessageFilled : MessageUnfilled}
            alt=""
          />
        </Link>

        <img src={NotificationUnfilled} alt="" />

        <div className="settings" onClick={() => setOpen(!open)} ref={settings}>
          <img src={open ? SettingsFilled : SettingsUnfilled} alt="" />
          <div className={`Dropdown ${open ? "active" : "inactive"}`}>
            <ul>
              {options.map((item, key) => {
                return <DropdownItem item={item} key={key} />;
              })}
            </ul>
          </div>
        </div>

        <Link to="/profile" className="navLink">
          <img
            src={path === "/profile" ? ProfileFilled : ProfileUnfilled}
            alt=""
          />
        </Link>
      </div>
    </div>
  );
};

export default NavIcons;
