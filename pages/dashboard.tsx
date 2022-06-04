import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { config } from "../component/Api";
import { useAppContext } from "../component/AppContext";
import MainLayout from "../component/MainLayout";
import { Space } from "../component/share/Space";

interface State {
  id: number;
  fullName: string;
}
export default function Dashboard() {
  const { state } = useAppContext();

  const { id, fullName }: State = state;
  useEffect(() => {
    axios
      .get(`${config.apiUrl}/api/data/getposts/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  console.log(state);
  const router = useRouter();

  return (
    <div>
      <MainLayout title="داشبورد">
        <Space vertical={10} />
      </MainLayout>
    </div>
  );
}
