import { AxiosError } from "axios";
import router, { useRouter } from "next/router";
import React, { SetStateAction, useCallback, useState } from "react";
import { Verification } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import { CustomButton } from "../../component/CustomButton";
import { CustomInput } from "../../component/CustomInput";
import { HelpText } from "../../component/HelpText";
import Layout from "../../component/Layout";

export default function Register(): JSX.Element {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login: loggedIn } = useAppContext();
  let router = useRouter();
  //Register

  const onSubmitVerification = useCallback(async (): Promise<void> => {
    if (!email || !name || !password) return;
    try {
      let response = await Verification({ name, email, password });
      console.log(response);
      const { status }: { status: number } = response?.data || {};
      const { token }: { token: string } = response?.data?.user || {};

      if (token && status) {
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
  }, [email, loggedIn, name, password, router]);

  return (
    <>
      <Layout
        title="ثبت نام"
        textHelp="حساب کاربری دارید؟ ورود"
        path="/auth/loginByEmail"
      >
        <CustomInput
          placeholder="نام"
          label="نام"
          value={name}
          onChange={(event) => setName(event.target.value)}
          style={{ width: "80%" }}
          type="text"
          width="100%"
        />
        <CustomInput
          placeholder="example@gmail.com"
          label="آدرس ایمیل"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{ width: "80%" }}
          type="text"
          width="100%"
        />
        <CustomInput
          label="رمز عبور"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
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
