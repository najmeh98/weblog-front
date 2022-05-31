import axios from "axios";
import { useRouter } from "next/router";
import React, { SetStateAction, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { config, createPost } from "../component/Api";
import { useAppContext } from "../component/AppContext";
import { useTheme } from "../component/Context/ThemeContext";
import { CustomButton } from "../component/CustomButton";
import { CustomDropdown } from "../component/CustomDropdown";
import { CustomFileInput } from "../component/CustomFileInput";
import { CustomInput } from "../component/CustomInput";
import { CustomInputText } from "../component/CustomInputText";
import { Category, Post } from "../component/definition";
import { DropdownSelect, Item } from "../component/downshift";
import Layout, { Box } from "../component/Layout";
import MainLayout from "../component/MainLayout";
import { Space } from "../component/share/Space";
import { ThemedText } from "../component/ThemedText";

export default function AddPost() {
  let router = useRouter();
  let t = useTheme();
  let { token, dispatch } = useAppContext();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    //  file: Blob -----> Bug
    file: "",
  });

  const [tokenvalue, setToken] = useState<any>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string>("");
  const [fileName, setFileName] = useState<string>("Choose File");
  const [category, setCategory] = useState("");

  useEffect(() => {
    let localToken: any = localStorage.getItem("token");
    console.log(localToken);
    setToken(localToken);
  }, []);

  const uploadImageHandler = (
    //@ts-ignore
    e: FileEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // console.log(e.target.files[0]);
    if (e.target && e.target.files) {
      let File: Blob = e.target.files[0];
      //@ts-ignore
      setFormData({ ...formData, file: File });
    }
    //Type 'Blob' is not assignable to type 'string'.ts(2322)
  };

  const CreatePostHandler = useCallback(async () => {
    setLoading(true);
    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);
    data.append("file", formData.file);
    // formData.append("category", category);
    console.log(formData.file);

    // console.log(token);

    const res: any = await axios.post(
      `${config.apiUrl}/api/data/add`,
      data,
      //@ts-ignore
      { headers: { authorization: tokenvalue } }
    );
    console.log(res);
  }, [formData.content, formData.file, formData.title, tokenvalue]);

  return (
    <MainLayout title="ایجاد پست جدید">
      <Space vertical={10} />
      <CustomInput
        label="عنوان"
        placeholder="عنوان..."
        type="text"
        value={formData.title}
        onChange={(event: { target: { value: SetStateAction<string> } }) => {
          setFormData({ ...formData, title: event.target.value });
        }}
      />
      <Space vertical={5} />

      <CustomInput
        label="متن اصلی"
        placeholder="متن اصلی"
        type="textarea"
        value={formData.content}
        onChange={(event) =>
          setFormData({ ...formData, content: event.target.value })
        }
      />
      <Space vertical={10} />

      <CustomInput
        label="انتخاب تصویر"
        type="file"
        enctype="multipart/form-data"
        name="file"
        // value={fileName}
        onChange={uploadImageHandler}
      />
      {/* <CustomFileInput
        label="انتخاب تصویر"
        type="file"
        enctype="multipart/form-data"
        name="file"
        onChange={uploadImageHandler}
      /> */}

      <Space vertical={3} />

      <CustomDropdown
        items={Category}
        selectedItem={category}
        setSelectedItem={setCategory}
      />

      <CustomButton
        padding="10px 30px"
        style={{ justifyContent: "flex-end", paddingLeft: "20px" }}
        onClick={CreatePostHandler}
      >
        انتشار
      </CustomButton>
    </MainLayout>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
`;
