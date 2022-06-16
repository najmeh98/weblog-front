import router, { useRouter } from "next/router";
import React, { SetStateAction, useCallback, useState } from "react";
import { Verification } from "../component/Api";
import { useAppContext } from "../component/AppContext";
import { CustomButton } from "../component/CustomButton";
import { CustomInput } from "../component/CustomInput";
import { HelpText } from "../component/HelpText";
import Layout from "../component/Layout";

export default function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login: loggedIn, dispatch, state } = useAppContext();
  let router = useRouter();
  //Register
  // console.log(state);
  // console.log(state.id);
  const onSubmitVerification = useCallback(async () => {
    if (!email || !name || !password) return;
    try {
      let response = await Verification({ name, email, password });
      console.log(response);
      const { status }: { status: number } = response?.data || {};
      const { token }: { token: string } = response?.data?.user || {};

      if (token && status) {
        loggedIn({ ...response?.data.user });
        console.log(state);
        router.push("/");
      }
    } catch (error) {
      // if (error.response.status === 403) {
      //   setError(error);
      // }
      setError(error);
    }
  }, [email, loggedIn, name, password, router, state]);

  return (
    <>
      <Layout
        title="ثبت نام"
        textHelp="حساب کاربری دارید؟ ورود"
        path="/loginByEmail"
      >
        <CustomInput
          placeholder="نام"
          label="نام"
          value={name}
          // setValue={setName}
          onChange={(event: { target: { value: SetStateAction<string> } }) =>
            setName(event.target.value)
          }
          style={{ width: "80%" }}
          type="text"
          width="100%"
        />
        <CustomInput
          placeholder="example@gmail.com"
          label="آدرس ایمیل"
          value={email}
          // setValue={setEmail}
          onChange={(event: { target: { value: SetStateAction<string> } }) =>
            setEmail(event.target.value)
          }
          style={{ width: "80%" }}
          type="text"
          width="100%"
        />
        <CustomInput
          label="رمز عبور"
          value={password}
          onChange={(event: { target: { value: SetStateAction<string> } }) =>
            setPassword(event.target.value)
          }
          style={{ width: "80%" }}
          type="password"
        />
        <CustomButton
          onClick={onSubmitVerification}
          width="100%"
          maxWidth="80%"
          label={""}
          style={{ justifyContent: "center" }}
        >
          ثبت نام
        </CustomButton>
      </Layout>
    </>
  );
}
