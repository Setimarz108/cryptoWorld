import React, { useState, useEffect } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  HomeOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
  LogoutOutlined
} from "@ant-design/icons";


import { FaRegNewspaper } from "react-icons/fa";
import { RiExchangeDollarFill, RiHome7Line, RiCoinsLine } from "react-icons/ri";
import {auth} from "../firebase"
import {useAuthState} from "react-firebase-hooks/auth"

import icon from "../images/cryptocurrency.png";
import userEvent from "@testing-library/user-event";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 1000) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);


  return (
    <div className="nav-container">
      <div className="logo-container ">
        <Avatar src={icon} size="small" style={{ width: "60px" }} />
        <Typography.Title level={2} className="logo">
          <Link to="/"></Link>
        </Typography.Title>

        <Button
          type="button"
          className="inline-block lg:hidden "
          onClick={() => setActiveMenu(!activeMenu)}
        >
          {" "}
          <MenuOutlined />
        </Button>
      </div>

      {activeMenu && (
        <div className="menu" style={{ fontSize: "1rem" }}>
          <div className="flex lg:flex-row  items-center ">
            <div className="flex flex-col transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-100 ">
              <h3 className="mx-auto">
                {" "}
                <RiHome7Line
                  style={{
                    backgroundColor: "#020105",
                    borderRadius: "50%",
                    fontSize: "2.2rem",
                    padding: "7px",
                    color: "#cf46eb",
                  }}
                />
              </h3>
              <Link to="/" className=" ">
                Home
              </Link>
            </div>

            <div className="flex flex-col items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-100">
              <h3 className="mx-auto">
                <RiCoinsLine
                  style={{
                    backgroundColor: "#020105",
                    borderRadius: "50%",
                    fontSize: "2.2rem",
                    padding: "8px",
                    color: "#cf46eb",
                  }}
                />{" "}
              </h3>
              <Link to="/cryptocurrencies" className="">
                Cryptos
              </Link>
            </div>
            <div className="flex flex-col items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-100">
              <h3 className="mx-auto">
                <RiExchangeDollarFill
                  style={{
                    backgroundColor: "#020105",
                    borderRadius: "50%",
                    fontSize: "2.2rem",
                    padding: "7px",
                    color: "#cf46eb",
                  }}
                />
              </h3>
              <Link to="/exchanges" className=" ">
                Exchanges
              </Link>
            </div>
            <div className="flex flex-col items-center transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover: duration-100">
              <h3 className="mx-auto">
                <FaRegNewspaper
                  style={{
                    backgroundColor: "#020105",
                    borderRadius: "50%",
                    fontSize: "2.2rem",
                    padding: "7px",
                    color: "#cf46eb",
                  }}
                />
              </h3>
              <Link to="/news" className="">
                News
              </Link>
            </div>
            <div className="flex flex-col" style={{position:"absolute", right:"12%",top:"10%"}}>
              <LogoutOutlined 
            onClick= {() => auth.signOut()}
            alt={user?.displayName}
            src={user?.photoURL}
            /> <span><h6>Log out</h6></span>
               </div>
                     
          </div>
          
        </div>
      )}

     
            
    </div>
  );
};

export default Navbar;
