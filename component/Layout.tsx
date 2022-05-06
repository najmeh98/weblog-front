import Router, { useRouter } from "next/router";
import React, { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { HelpText } from "./HelpText";

export default function Layout({
  children,
  title,
  textHelp,
  path,
}: {
  children: ReactNode;
  title: string;
  textHelp: string;
  path: string;
}) {
  let t = useTheme();
  let router = useRouter();
  return (
    <ContentWrapper>
      <FormContainer>
        <Title>{title}</Title>
        <Box style={{ borderRadius: t.borderRadius }}>{children}</Box>
        <HelpText
          onClick={() => {
            router.push(path);
          }}
        >
          {textHelp}
        </HelpText>
      </FormContainer>
    </ContentWrapper>
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
  margin: auto;
`;

const Title = styled.h1`
  font-size: 32px;
  font-weight: 400;
  width: 100%;
  text-align: center;
`;
export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  /* height: 300px; */

  border: 1px solid rgb(244, 244, 244);
  box-shadow: 0 1px 11px hsl(0deg 0% 66% / 27%);
  padding: 25px;
`;
