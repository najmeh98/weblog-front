import axios from "axios";
import { useRouter } from "next/router";
import React, { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { config, createPost, SendPostrequest } from "../component/Api";
import { useAppContext } from "../component/AppContext";
import { useTheme } from "../component/Context/ThemeContext";
import { CustomButton } from "../component/CustomButton";
import { CustomDropdown } from "../component/CustomDropdown";
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

  const [formData, setFormData] = useState();

  const [category, setCategory] = useState();
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<string>("");
  const [fileName, setFileName] = useState<string>("Choose File");
  const [uploadedFile, setuploadedFile] = useState({});

  const uploadImageHandler = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
    console.log(e.target.files[0].name);
  };

  const CreatePostHandler = useCallback(async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("file", file);
    // formData.append("category", category);

    console.log(file);
    const post: Post = {
      title,
      content,
      // category,
      file,
    };
    // dispatch({
    //   type: "post created",
    //   post: post,
    //   title: title,
    //   content: content,
    //   file: file,
    //   category: category,
    // });
    try {
      const res = await axios.post(
        `${config.apiUrl}/api/data/add-post`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
            // token: token,
          },
        }
      );
      console.log(res);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }, [content, file, title]);

  return (
    <MainLayout>
      <Wrapper
        style={{ boxShadow: t.boxShadowbox, borderRadius: t.borderRadius }}
      >
        <ThemedText fontSize="normal" fontWeight="bold">
          ایجاد پست جدید
        </ThemedText>
        <Space vertical={10} />
        <CustomInput
          label="عنوان"
          placeholder="عنوان..."
          type="text"
          value={title}
          onChange={(event: { target: { value: SetStateAction<string> } }) => {
            setTitle(event.target.value);
            console.log(event.target.value);
          }}
        />
        {/* <Space vertical={5} /> */}

        <CustomInput
          label="متن اصلی"
          placeholder="متن اصلی"
          type="textarea"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
        <Space vertical={5} />

        <CustomInput
          label="انتخاب تصویر"
          type="file"
          enctype="multipart/form-data"
          name="file"
          // value={fileName}
          onChange={uploadImageHandler}
        />

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
      </Wrapper>
    </MainLayout>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
`;
