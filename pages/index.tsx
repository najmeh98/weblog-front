import { resetIdCounter } from "downshift";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { useAppContext } from "../component/AppContext";
import MainLayout from "../component/MainLayout";
import { SidebarOption } from "../component/Sidebar/SidebarOption";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { isLoggedIn, token } = useAppContext();
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/regiter");
    }
    router.push("/");
  }, [router, token]);

  return (
    <div>
      <Head>
        <title>Welcome to My Weblog</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SidebarOption />
    </div>
  );
};

export default Home;
