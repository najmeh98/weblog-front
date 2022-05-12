import axios from "axios";
import { useRouter } from "next/router";
import { SetStateAction, useCallback, useState } from "react";
import styled from "styled-components";
import { config, Login } from "../component/Api";
import { useAppContext } from "../component/AppContext";
import { useTheme } from "../component/Context/ThemeContext";
import { CustomButton } from "../component/customButton";
import { CustomInput } from "../component/CustomInput";
import { ErrorText } from "../component/ErrorText";
import { HelpText } from "../component/HelpText";
import Layout from "../component/Layout";
import { useFormik } from "formik";
import { Formik } from "formik";
export default function LoginByEmail() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isVerification, setVerification] = useState(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { login: loggedIn } = useAppContext();
  let t = useTheme();
  let url: string;

  const router = useRouter();

  const { isLoggedIn } = useAppContext();
  interface MyFormValues {
    email: string;
    password: string;
  }

  const validate = (values: any) => {
    const errors: MyFormValues = { email: "", password: "" };
    if (!values.email) {
      errors.email = "required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }

    if (!values.password) {
      errors.password = "required";
    } else if (values.password.length < 3) {
      errors.password = "";
    }
  };

  //send by email

  const onSubmitEmail = useCallback(async () => {
    if (email.length === 0 || password.length === 0) {
      setError("تمامی فیلد ها ضروری است");
    }

    setLoading(true);
    try {
      //@ts-ignore
      let response = await Login({ email, password });
      setLoading(false);
      console.log(response);
      let token = response?.data.token;
      if (response?.data.email && response?.status) {
        // localStorage.setItem("token", token);
        loggedIn({ token, email });
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, loggedIn, password]);

  return (
    <Layout
      title="ورود"
      textHelp="حساب کاربری ندارید؟ ثبت نام"
      path="/register"
    >
      <CustomInput
        placeholder="example@gmail.com"
        label="آدرس ایمیل"
        value={email}
        onChange={(event: { target: { value: SetStateAction<string> } }) =>
          setEmail(event.target.value)
        }
        width="100%"
        // style={{ width: "80%" }}
        type="text"
      />
      {/* <ErrorText>{error}</ErrorText> */}

      <CustomInput
        label="رمز عبور"
        value={password}
        onChange={(event: { target: { value: SetStateAction<string> } }) =>
          setPassword(event.target.value)
        }
        width="100%"
        // style={{ width: "80%" }}
        onSubmit={onSubmitEmail}
        type="password"
      />
      <ErrorText>{error}</ErrorText>
      <CustomButton
        onClick={onSubmitEmail}
        width="100%"
        // maxWidth="80%"
        label={""}
        style={{ justifyContent: "center" }}
        disable={loading}
      >
        ورود
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
