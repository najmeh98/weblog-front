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
type item = {
  title: string;
  icon: JSX.Element;
  path?: string;
};
const Items: item[] = [
  {
    title: "داشبورد",
    icon: <GoHome />,
    path: "/dashboard",
  },
  {
    title: "افزودن پست",
    icon: <CgNotes />,
    path: "/posts/addPost",
  },
  {
    title: "دسته بندی ها",
    icon: <AiOutlineBars />,
    path: "/",
  },
  {
    title: "تنظیمات پروفایل",
    icon: <IoSettingsOutline />,
    path: "/user/profile",
  },

  {
    title: "خروج",
    icon: <MdExitToApp />,
    path: "/exit",
  },
];

export const SidebarOption = (): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  let router = useRouter();
  let t = useTheme();

  const { logout, login, state } = useAppContext();
  console.log(state);
  const { id, fullName }: any = state.userInfo;

  return (
    <Wrapper
      style={{
        borderLeft: "1px solid t.color.titleColor",
        boxShadow: t.boxShadowbox,
        fontSize: t.fontSize.normal,
        fontWeight: t.fontWeight.bold,
      }}
    >
      <Navbar
        style={{
          height: "50px",
          display: " flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #7a7a7a30",
          cursor: "pointer",
        }}
      >
        <FaBars />
        <ThemedText
          onClick={() => router.push("/")}
          style={{
            fontWeight: t.fontWeight.bold,
            fontSize: t.fontSize.semiLarge,
            color: t.color.titleColor,
          }}
        >
          {fullName}
        </ThemedText>
      </Navbar>

      {Items.map((item: item, index: number) => (
        <SidebarItem
          key={index}
          // isActive={() => {
          //   router.pathname === item.path;
          // }}
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
