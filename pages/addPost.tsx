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
import Layout, { Box } from "../component/Layout";
import MainLayout from "../component/MainLayout";
import { Space } from "../component/share/Space";
import { ThemedText } from "../component/ThemedText";

export default function AddPost() {
  let router = useRouter();
  let t = useTheme();
  let { state, dispatch } = useAppContext();

  const { token }: any = state.userInfo;

  const [tokenvalue, setToken] = useState<any>("");
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string>("");
  // const [fileName, setFileName] = useState<string>("Choose File");
  const [category, setCategory] = useState("");

  //  از state استفاده  کردم ******
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: "",
  });

  const uploadImageHandler = (e: {
    target: { files: React.SetStateAction<string>[] };
  }) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files) {
      let File = e.target.files[0];
      setFormData({ ...formData, file: e.target.files[0] });
      // setFile(e.target.files[0]);
      console.log("file:", file);
    }
  };
  const CreatePostHandler = useCallback(async () => {
    setLoading(true);

    // از FormData  استفاده کردم *********
    //در هر صورت file ارسال نمیشه
    const datapost = new FormData();
    datapost.append("title", formData.title);
    datapost.append("content", formData.content);
    datapost.append("file", formData.file);
    // console.log(formData.file)
    // let data = {
    //   title: title,
    //   content: content,
    //   file: fileInfo,
    // };
    // console.log(data);

    //router --> /add فقط برای تست
    console.log(formData);
    console.log(datapost);
    axios
      .post(`${config.apiUrl}/api/data/add-post`, datapost, {
        headers: {
          authorization: token,
        },
      })
      .then((res) => {
        console.log(res);

        if ((res.status as number) == 200 && res.data) {
          dispatch({ type: "post created", payload: { ...formData } });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, formData, token]);

  return (
    <MainLayout title="ایجاد پست جدید">
      <Space vertical={10} />
      <CustomInput
        label=" عنوان پست"
        placeholder="عنوان..."
        type="text"
        value={formData.title}
        onChange={(event: { target: { value: SetStateAction<string> } }) => {
          setFormData({ ...formData, title: event.target.value });
          // setTitle(event.target.value);
        }}
      />
      <Space vertical={5} />

      <CustomInput
        label="متن اصلی"
        placeholder="متن اصلی"
        type="textarea"
        value={formData.content}
        onChange={
          (event) => setFormData({ ...formData, content: event.target.value })
          // setContent(event.target.value)
        }
      />
      <Space vertical={10} />

      <CustomInput
        label="انتخاب تصویر"
        type="file"
        enctype="multipart/form-data"
        onChange={uploadImageHandler}
      />

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
{
  /* <CustomFileInput
          label="انتخاب تصویر"
          type="file"
          enctype="multipart/form-data"
          name="file"
          onChange={uploadImageHandler}
        /> */
}
{
  /* <input
          type="file"
          encType="multipart/form-data"
          onChange={(e: {
            target: { files: React.SetStateAction<string>[] };
          }) => {
            return setFile(e.target.files[0]);
          }}
        /> */
}
