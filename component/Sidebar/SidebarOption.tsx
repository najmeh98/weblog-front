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
import { ThemedText } from "../ThemedText";
import { FormItem } from "../share/Container";
type item = {
  title: string;
  icon: JSX.Element;
  path?: string;
};
const Items: item[] = [
  {
    title: "Add Post",
    icon: <CgNotes />,
    path: "/posts/addPost",
  },
  {
    title: "Category",
    icon: <AiOutlineBars />,
    path: "/",
  },
  {
    title: "Setting",
    icon: <IoSettingsOutline />,
    path: "/user/profile",
  },

  {
    title: "Exit",
    icon: <MdExitToApp />,
    path: "/exit",
  },
];

export const SidebarOption = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  let router = useRouter();
  let t = useTheme();

  const { logout, login, userInfo } = useAppContext();
  // console.log(state);
  const { id, fullName }: any = userInfo;

  return (
    <Wrapper
      style={{
        borderLeft: "1px solid t.color.titleColor",
        boxShadow: t.boxShadowbox,
        fontSize: t.fontSize.normal,
        fontWeight: t.fontWeight.bold,
        backgroundColor: "#1f2937",
      }}
    >
      <Navbar
        style={{
          height: "50px",
          borderBottom: "1px solid #fff",
        }}
      >
        <FaBars />
      </Navbar>

      <Sidebar>
        {Items.map((item: item, index: number) => (
          <SidebarItem
            key={index}
            isActive={router.pathname === item.path}
            onClick={() => {
              if (item.path === "/user/profile") {
                router.push({
                  pathname: "/user/profile",
                  query: { id: id, slug: fullName },
                });
              } else if (item.path === "/exit") {
                logout();
                router.push("/auth/register");
              } else {
                router.push(item.path as string);
              }
            }}
            {...item}
          />
        ))}
      </Sidebar>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  /* background-image: linear-gradient(
    to bottom,
    #0d4c63,
    #326d85,
    #5290a9,
    #73b5cf,
    #94dbf5
  ); */

  color: #fff;
  box-shadow: 0 1px 11px hsl(0deg 0% 66% / 27%);
  animation: 1s ease 0s 1 normal none running fadeIn;
  height: 100vh;
  width: 300px;
  gap: 20px;
  top: 0px;
  /* gap: 35px; */
  bottom: 0;
  right: 0;
  z-index: 1;
  margin: 0;
  padding: 0;
  position: sticky;
  overflow-y: auto;
  overflow-x: hidden;
`;

const Navbar = styled.div`
  width: 100%;
  padding: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: larger;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 10px;
  gap: 20px;
`;
