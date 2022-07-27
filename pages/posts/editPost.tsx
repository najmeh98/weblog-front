import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { config } from "../../component/Api";
import { useTheme } from "../../component/Context/ThemeContext";
import useSWR from "swr";
import { fetcher } from "../../utils/fetcher";
import MainLayout from "../../component/MainLayout";
import { useAppContext } from "../../component/AppContext";
import { Space } from "../../component/share/Space";
import { CustomInput } from "../../component/CustomInput";
import { CustomButton } from "../../component/CustomButton";
import styled from "styled-components";

type editFormValueType = {
  title: string;
  content: string;
  file: string;
};

export default function EditPost(): JSX.Element {
  let t = useTheme();
  let router = useRouter();
  const id = router.query.id;

  // AppContext
  const { dispatch, posts, userInfo } = useAppContext();

  const token: string = userInfo?.token;

  console.log(token);
  console.log(posts);

  const index = posts.findIndex((post: any) => post.id == id);
  // let filterpost = posts.filter((post: any) => post.id == id);

  const post: any = posts[index];

  const [formValue, setFormValue] = useState<editFormValueType>({
    title: post?.title || "",
    content: post?.content || "",
    file: post?.file || "",
  });

  const [loading, setloading] = useState(false);

  // useEffect(() => {
  //   setFormValue({ title: post.title, content: post.content, file: post.file });
  // }, [post.content, post.file, post.title]);

  const uploadEditImage = (event: any): void => {
    const target = event.target as HTMLInputElement;

    if (!target || !target.files) {
      return;
    }
    setFormValue({ ...formValue, file: event.target.files[0] });
  };

  console.log("info", formValue.title, formValue.content, formValue.file);

  const EditInfoPost = () => {
    const formdata = new FormData();
    formdata.append("title", formValue.title);
    formdata.append("content", formValue.content);
    formdata.append("file", formValue.file);
    console.log("info", formValue.title, formValue.content, formValue.file);

    setloading(true);

    axios
      .post(`${config.apiUrl}/api/data/editPost/${id}`, formdata, {
        headers: {
          authorization: token,
        },
      })
      .then((result: any) => {
        setloading(false);
        console.log(result);
        if (result.statusText === "OK" && result?.data?.findpost) {
          dispatch({ type: "post edited", payload: { ...result?.data?.data } });
          router.push("/posts");
        }
      })
      .catch((err: any) => {
        setloading(false);
        console.log(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  return (
    <MainLayout title="ویرایش پست">
      <Space vertical={10} />
      <CustomInput
        type="text"
        label="عنوان پست"
        placeholder=" عنوان ..."
        value={formValue.title}
        onChange={(e) => setFormValue({ ...formValue, title: e.target.value })}
      />
      <Space vertical={5} />
      <CustomInput
        type="textarea"
        label="متن اصلی "
        placeholder="متن اصلی"
        value={formValue.content}
        onChange={(e) =>
          setFormValue({ ...formValue, content: e.target.value })
        }
      />
      <Space vertical={10} />
      <CustomInput
        label="انتخاب تصویر"
        type="file"
        enctype="multipart/form-data"
        onChange={uploadEditImage}
      />
      <Space vertical={15} />

      <ButtonStyle>
        <CustomButton
          padding="10px 30px"
          style={{ justifyContent: "center" }}
          color="errortext"
          onClick={() => router.push("/")}
        >
          انصراف
        </CustomButton>

        <CustomButton
          padding="10px 30px"
          style={{ justifyContent: "center" }}
          onClick={EditInfoPost}
        >
          تایید
        </CustomButton>
      </ButtonStyle>
    </MainLayout>
  );
}

const ButtonStyle = styled.div`
  display: flex;
`;
