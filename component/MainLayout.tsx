import React, { ReactNode } from "react";
import styled from "styled-components";
import { SidebarOption } from "./Sidebar/SidebarOption";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Wrapper>
      <SidebarOption />

      <Conatiner>{children}</Conatiner>
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
  margin: 30px auto;
  width: 100%;
  max-width: 1300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
