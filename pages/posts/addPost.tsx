import axios from "axios";
import { useRouter } from "next/router";
import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { config } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import { useTheme } from "../../component/Context/ThemeContext";
import { CustomButton } from "../../component/CustomButton";
import { CustomDropdown } from "../../component/CustomDropdown";
import { CustomInput } from "../../component/CustomInput";
import { Category, Post } from "../../component/definition";
import MainLayout from "../../component/MainLayout";
import { ButtonStyle } from "../../component/share/Container";
import { Space } from "../../component/share/Space";
import { ThemedText } from "../../component/ThemedText";

export default function AddPost(): JSX.Element {
  let router = useRouter();
  let t = useTheme();
  let { state, dispatch } = useAppContext();

  const { token }: any = state.userInfo;

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    file: "",
  });

  const uploadImageHandler = (event: any): void => {
    const target = event.target as HTMLInputElement;
    if (!target || !target.files || !target.files[0]) {
      return;
    }
    setFormData({ ...formData, file: event.target.files[0] });
  };
  const CreatePostHandler = useCallback(async (): Promise<void> => {
    if (!formData.title || !formData.content) {
      setError("All fields are required");
      return;
    }

    setLoading(true);

    const datapost = new FormData();
    datapost.append("title", formData.title);
    datapost.append("content", formData.content);
    datapost.append("file", formData.file);

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
        onChange={(event) => {
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
        onChange={uploadImageHandler}
      />

      <Space vertical={3} />

      {/* <CustomDropdown
        items={Category}
        selectedItem={category}
        setSelectedItem={setCategory}
      /> */}
      <Space vertical={15} />

      <ButtonStyle>
        <CustomButton
          padding="10px 30px"
          style={{ justifyContent: "center" }}
          color="errortext"
          onClick={() => router.push("/posts")}
        >
          انصراف
        </CustomButton>

        <CustomButton
          padding="10px 30px"
          style={{ justifyContent: "flex-end", paddingLeft: "20px" }}
          onClick={CreatePostHandler}
        >
          انتشار
        </CustomButton>
      </ButtonStyle>
    </MainLayout>
  );
}

const Wrapper = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
`;
