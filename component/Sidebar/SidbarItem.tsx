import React from "react";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";

type Props = {
  isActive: any;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title: string;
  icon: JSX.Element;
  path: string;
  fillIcon: JSX.Element;
};

export const SidebarItem = ({
  isActive,
  onClick,
  path,
  icon,
  title,
  fillIcon,
}: Props) => {
  let t = useTheme();
  return (
    <Wrapper
      onClick={onClick}
      isActive={isActive}
      style={{
        padding: " 0px 20px",
        display: "flex",
        cursor: "pointer",
      }}
    >
      <Span
        style={{
          paddingLeft: "10px",
          color: t.color.titleColor,
          fontSize: t.fontSize.semiLarge,
          display: "flex",
          alignItems: "center",
        }}
      >
        {isActive ? icon : fillIcon}
      </Span>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  /* height: 100%; */
`;
const Span = styled.span`
  padding-left: 10px;
`;
