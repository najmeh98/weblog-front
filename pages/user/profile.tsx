import axios, { AxiosError } from "axios";
import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { config } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import MainLayout from "../../component/MainLayout";
import { Space } from "../../component/share/Space";
import styled from "styled-components";
import { useTheme } from "../../component/Context/ThemeContext";
import { CustomButton } from "../../component/CustomButton";
import { ButtonStyle } from "../../component/share/Container";
import { CustomInput } from "../../component/CustomInput";
import { formValueType } from "./profileType";

const initialValues = {
  password: "",
  newpassword: "",
  Renewpassword: "",
  bio: "",
  skill: "",
};

export default function Profile(): JSX.Element {
  const { userInfo, dispatch } = useAppContext();

  const token: string = userInfo?.token;

  const { query } = useRouter();

  const slug: string | string[] | undefined = query.slug;

  const id: any = query.id;

  const [loading, setloading] = useState(false);
  let t = useTheme();

  const [profileValue, setProfileValue] =
    useState<formValueType>(initialValues);

  const router = useRouter();
  console.log(id);
  const handleProfile = (): void => {
    if (profileValue.newpassword !== profileValue.Renewpassword) {
      // رمز عبور وارد شده با هم مطابقت ندارند.
    } else {
      setloading(true);

      axios
        .post(`${config.apiUrl}/api/data/getUser/${id}/${slug}`, profileValue, {
          headers: {
            authorization: token,
          },
        })
        .then((result) => {
          setloading(false);
          console.log(result);

          if (result?.data?.data && result.statusText === "OK") {
            //اطلاعات مورد نظر با موفقیت ثبت شد
            dispatch({
              type: "logged in",
              payload: { ...result?.data.data },
            });
            router.push("/posts");
          }
        })
        .catch((error) => {
          console.log(error);
          const err = error as AxiosError;
          if (err.response) {
            switch (err.response.status as number) {
              case 404:
                //کاربر با این مشخصات وجود ندارد
                break;
              case 401:
                //پسورد وارد شده مطابقت ندارد
                break;
              case 402:
                //پسورد وارد شده اشتباه است
                break;
            }
          } else {
            console.log(error);
            //error 500
          }
        });
    }
  };

  return (
    <MainLayout title="Profile">
      <Space vertical={10} />
      <CustomInput
        type="password"
        label="password"
        placeholder="password..."
        value={profileValue.password}
        onChange={(e) => {
          setProfileValue({ ...profileValue, password: e.currentTarget.value });
        }}
      />
      <CustomInput
        type="password"
        label="new password "
        placeholder="new password ..."
        value={profileValue.newpassword}
        onChange={(e) =>
          setProfileValue({
            ...profileValue,
            newpassword: e.target.value,
          })
        }
      />
      <CustomInput
        type="password"
        label="repeat the new password"
        placeholder="repeat the new password ..."
        value={profileValue.Renewpassword}
        onChange={(e) =>
          setProfileValue({
            ...profileValue,
            Renewpassword: e.currentTarget.value,
          })
        }
      />
      <CustomInput
        type="text"
        label=" skill "
        placeholder="skill ..."
        value={profileValue.bio}
        onChange={(e) =>
          setProfileValue({ ...profileValue, bio: e.currentTarget.value })
        }
      />

      <CustomInput
        type="textarea"
        label="biography"
        placeholder="biography ..."
        value={profileValue.skill}
        onChange={(e) =>
          setProfileValue({ ...profileValue, skill: e.target.value })
        }
      />
      <Space vertical={15} />

      <ButtonStyle>
        <CustomButton
          padding="10px 30px"
          style={{ justifyContent: "center" }}
          color="errortext"
          onClick={() => router.push("/posts")}
        >
          Cancel
        </CustomButton>

        <CustomButton
          padding="10px 30px"
          style={{ justifyContent: "center" }}
          onClick={handleProfile}
        >
          Add
        </CustomButton>
      </ButtonStyle>
    </MainLayout>
  );
}

const StyleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyleInput = styled.input`
  outline: none;
  border: 1px solid rgb(204, 204, 204);
  direction: ltr !important;
  display: flex;
  text-align: right;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
  margin-top: 10px;
  resize: none;
`;
