import Router, { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { HelpText } from "./HelpText";
import { MainWrapper } from "./share/Container";
import { ThemedText } from "./ThemedText";

export default function Layout({
  children,
  title,
  textHelp,
  path,
  link,
  width,
  style,
}: {
  children: ReactNode;
  title: string;
  textHelp?: string;
  path: string;
  link?: string;
  width?: string;
  style?: any;
}): JSX.Element {
  let t = useTheme();
  let router = useRouter();
  return (
    <MainWrapper>
      {/* <FormContainer> */}
      <Container style={{ borderRadius: t.borderRadius.normal }}>
        <ThemedText>{title}</ThemedText>
        {children}
        <HelpText
          onClick={() => {
            router.push(path);
          }}
        >
          {textHelp}{" "}
          <span
            style={{ color: t.color.buttonBg, fontWeight: t.fontWeight.bold }}
          >
            {link}
          </span>
        </HelpText>
      </Container>
      {/* </FormContainer> */}
    </MainWrapper>
  );
}
const ContentWrapper = styled.div`
  width: 100%;
  margin: 10px auto;
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
  /* margin: auto; */
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  width: 100%;
  text-align: center;
  margin: 10px;
`;
export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* max-width: 500px; */
  /* height: 300px; */

  border: 1px solid rgb(230, 235, 235);
  box-shadow: rgb(16 30 115 / 6%) 0px 6px 26px 0px;
  padding: 30px;
`;
