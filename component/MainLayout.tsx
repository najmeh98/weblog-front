import React, { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { SidebarOption } from "./Sidebar/SidebarOption";
import { ThemedText } from "./ThemedText";

export default function MainLayout({
  children,
  title,
}: {
  children: ReactNode;
  title: string;
}): JSX.Element {
  let t = useTheme();
  return (
    <Wrapper>
      <SidebarOption />

      <Conatiner>
        <MainWrapper
          style={{
            boxShadow: t.boxShadowbox,
            borderRadius: t.borderRadius.normal,
          }}
        >
          <ThemedText fontSize="normal" fontWeight="bold">
            {title}
          </ThemedText>
          {children}
        </MainWrapper>
      </Conatiner>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin: auto;

  /* justify-content: space-between; */
`;

const Conatiner = styled.main`
  margin: 50px auto;
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const MainWrapper = styled.div`
  width: 100%;
  max-width: 700px;
  padding: 30px;
`;
