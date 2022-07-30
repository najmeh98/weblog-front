import { AxiosError } from "axios";
import router, { useRouter } from "next/router";
import React, { SetStateAction, useCallback, useState } from "react";
import { Verification } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import { CustomButton } from "../../component/CustomButton";
import { CustomInput } from "../../component/CustomInput";
import { HelpText } from "../../component/HelpText";
import Layout from "../../component/Layout";
import { FlexRow } from "../../component/share/Container";
import { OwnProp } from "./type";

export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [userInfo, setUserInfo] = useState<OwnProp>({
    name: "",
    family: "",
    password: "",
    repassword: "",
    username: "",
    phone: "",
    email: "",
    address: "",
    sex: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login: loggedIn } = useAppContext();
  let router = useRouter();
  //Register

  const onSubmitVerification = useCallback(async (): Promise<void> => {
    if (!userInfo.email || !userInfo.name || !userInfo.password) return;
    try {
      let response = await Verification(userInfo);
      console.log(response);
      const status: number | undefined = response?.status;
      const { token }: { token: string } = response?.data?.user || {};

      if (status == 200 && token) {
        // Ok 200
        loggedIn({ ...response?.data.user });
        router.push("/");
      }
    } catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        switch (err.response.status as number) {
          case 401:
            //اخطار در ایجاد کاربر جدید
            break;
          case 400:
            // کاربر تکراری
            break;
        }
      }
    }
  }, [loggedIn, router, userInfo]);

  return (
    <>
      <Layout
        title="Sign Up"
        link="Log in"
        textHelp="Already have an account?"
        path="/auth/loginByEmail"
      >
        <FlexRow>
          <CustomInput
            placeholder="name"
            label="name"
            value={userInfo.name}
            onChange={(event) =>
              setUserInfo({ ...userInfo, name: event.target.value })
            }
            type="text"
            width="100%"
          />
          <CustomInput
            placeholder="last Name"
            label="last Name"
            value={userInfo.family}
            onChange={(event) =>
              setUserInfo({ ...userInfo, family: event.target.value })
            }
            type="text"
            width="100%"
          />
        </FlexRow>

        <FlexRow>
          <CustomInput
            placeholder="username"
            label="username"
            value={userInfo.username}
            onChange={(event) =>
              setUserInfo({ ...userInfo, username: event.target.value })
            }
            type="text"
            width="100%"
          />
          <CustomInput
            placeholder="phone"
            label="phone"
            value={userInfo.phone}
            onChange={(event) =>
              setUserInfo({ ...userInfo, phone: event.target.value })
            }
            type="text"
            width="100%"
          />
        </FlexRow>

        <FlexRow>
          <CustomInput
            label="password"
            value={userInfo.password}
            onChange={(event) =>
              setUserInfo({ ...userInfo, password: event.target.value })
            }
            width="100%"
            type="password"
          />

          <CustomInput
            label="repassword"
            value={userInfo.repassword}
            onChange={(event) =>
              setUserInfo({ ...userInfo, repassword: event.target.value })
            }
            width="100%"
            type="password"
          />
        </FlexRow>

        <CustomInput
          placeholder="example@gmail.com"
          label="email"
          value={userInfo.email}
          onChange={(event) =>
            setUserInfo({ ...userInfo, email: event.target.value })
          }
          type="text"
          width="100%"
        />

        <CustomInput
          placeholder="address"
          label="address"
          value={userInfo.address}
          onChange={(event) =>
            setUserInfo({ ...userInfo, address: event.target.value })
          }
          type="text"
          width="100%"
        />

        <CustomButton
          onClick={onSubmitVerification}
          width="100%"
          style={{ justifyContent: "center" }}
        >
          Create Account
        </CustomButton>
      </Layout>
    </>
  );
}
