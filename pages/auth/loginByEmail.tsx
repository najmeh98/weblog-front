import axios from "axios";
import { useRouter } from "next/router";
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { config, Login } from "../../component/Api";
import { useAppContext } from "../../component/AppContext";
import { useTheme } from "../../component/Context/ThemeContext";
import { CustomButton } from "../../component/CustomButton";
import { CustomInput } from "../../component/CustomInput";
import { ErrorText } from "../../component/ErrorText";
import { HelpText } from "../../component/HelpText";
import Layout from "../../component/Layout";

export default function LoginByEmail() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVerification, setVerification] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { login: CheckLoggedIn } = useAppContext();
  let t = useTheme();
  let url: string;

  const router = useRouter();

  const { dispatch } = useAppContext();

  interface MyFormValues {
    email: string;
    password: string;
  }

  //send by email

  const onSubmitEmail = useCallback(async (): Promise<void> => {
    if (email.length === 0 || password.length === 0) {
      setError("تمامی فیلد ها ضروری است");
    }

    try {
      setLoading(true);
      setVerification(true);
      //@ts-ignore
      let res = await Login({ email, password });
      setLoading(false);
      console.log(res);

      const token: string = res?.data.token || {};
      const status: string = res?.data || {};

      if (token && status) {
        CheckLoggedIn({ ...res?.data.user });
        dispatch({
          type: "logged in",
          payload: { ...res?.data.user },
          // isLoggedIn: true,
        });

        router.push("/");
      }
    } catch (error) {
      console.log(error);
      setVerification(false);
    }
  }, [CheckLoggedIn, dispatch, email, password, router]);

  return (
    <Layout
      title="ورود"
      textHelp="حساب کاربری ندارید؟ ثبت نام"
      path="/auth/register"
    >
      <CustomInput
        placeholder="example@gmail.com"
        label="آدرس ایمیل"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        width="100%"
        type="text"
      />
      {/* <ErrorText>{error}</ErrorText> */}

      <CustomInput
        label="رمز عبور"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        width="100%"
        onSubmit={onSubmitEmail}
        type="password"
      />
      <ErrorText>{error}</ErrorText>
      <CustomButton
        onClick={onSubmitEmail}
        width="100%"
        label={""}
        style={{ justifyContent: "center" }}
        disable={loading}
      >
        {isVerification ? "در حال تایید" : "ورود"}
      </CustomButton>
    </Layout>
  );
}

const ContentWrapper = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  color: #000;
  overflow: hidden;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  width: 100%;
  text-align: center;
`;

const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  height: 300px;
  margin: 10px auto;
  border: 1px solid rgb(244, 244, 244);
  box-shadow: 0 1px 11px hsl(0deg 0% 66% / 27%);
  padding: 10px;
`;
