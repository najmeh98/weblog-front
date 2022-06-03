import { useRouter } from "next/router";
import { SidebarItem } from "./SidbarItem";
import { GoHome } from "react-icons/go";
import { CgNotes } from "react-icons/cg";
import { AiOutlineBars } from "react-icons/Ai";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../Context/ThemeContext";
import { IoSettingsOutline } from "react-icons/io5";
import { MdExitToApp } from "react-icons/md";
import { useEffect, useState } from "react";
import axios from "axios";
import { config } from "../Api";
import { useAppContext } from "../AppContext";
const Items = [
  {
    title: "داشبورد",
    icon: <GoHome />,
    path: "/dashboard",
  },
  {
    title: "افزودن پست",
    icon: <CgNotes />,
    path: "/addPost",
  },
  {
    title: "دسته بندی ها",
    icon: <AiOutlineBars />,
    path: "/category",
  },
  {
    title: "تنظیمات پروفایل",
    icon: <IoSettingsOutline />,
    path: "/profile",
  },
  {
    title: "خروج",
    icon: <MdExitToApp />,
    path: "/exit",
  },
];

export const SidebarOption = () => {
  const [userInfo, setuserInfo] = useState("");
  const [loading, setLoading] = useState(false);

  let router = useRouter();
  let t = useTheme();

  const { logout, login, isLoggedIn } = useAppContext();

  //get request
  // useEffect(() => {
  //   setLoading(true);
  //   axios
  //     .get(`${config.apiUrl}/api/data/get-user`)
  //     .then((response) => {
  //       console.log(response);
  //       setLoading(false);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  return (
    <Wrapper
      style={{
        borderLeft: "1px solid t.color.titleColor",
        boxShadow: t.boxShadowbox,
        fontSize: t.fontSize.normal,
        fontWeight: t.fontWeight.bold,
      }}
    >
      {/* <Sidebar style={{ margin: "0px 20px" }}> */}
      <Navbar
        style={{
          height: "50px",
          display: " flex",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid #7a7a7a30",
          // marginLeft: "10px",
        }}
      >
        <FaBars />
      </Navbar>

      {Items.map((item, index) => (
        <SidebarItem
          key={index}
          isActive={() => {
            router.pathname === item.path;
          }}
          // onClick={handler}
          onClick={() => {
            if (item.path === "/profile") {
              router.push({ pathname: "/profile", query: { id: "" } });
            } else if (item.path === "/exit") {
              logout();
              router.push("/register");
            } else {
              router.push(item.path);
            }
          }}
          {...item}
        />
      ))}
      {isLoggedIn && <p>wellcome</p>}
      {/* </Sidebar> */}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  /* justify-content: space-between; */
  box-shadow: 0 1px 11px hsl(0deg 0% 66% / 27%);
  animation: 1s ease 0s 1 normal none running fadeIn;
  /* background: #000; */
  height: 100vh;
  width: 300px;
  gap: 30px;
  top: 0px;
  bottom: 0;
  right: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  position: sticky;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Sidebar = styled.div``;

const Navbar = styled.div`
  width: 93%;
  margin-left: 10px;
  margin-right: 10px;
`;
