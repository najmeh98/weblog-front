import React, { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";
import { Box } from "../Layout";
import { SidebarOption } from "../Sidebar/SidebarOption";

export const BoxContainer = ({
  children,
  style,
}: {
  children: ReactNode;
  style?: any;
}) => {
  let t = useTheme();

  return (
    <>
      <WrapperBox
        style={{
          borderRadius: t.borderRadius.normal,
          width: "100%",
          ...style,
        }}
      >
        {children}
      </WrapperBox>
    </>
  );
};

export const WrapperBox = styled.div`
  box-shadow: rgb(0 0 0 / 10%) 0px 0px 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  line-height: 1.8rem;
  height: 100%;
`;
