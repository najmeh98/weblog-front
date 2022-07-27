import React from "react";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";

type Props = {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  title: string;
  icon: JSX.Element;
  isActive: boolean;
};

export const SidebarItem = ({
  isActive,
  onClick,
  icon,
  title,
}: Props): JSX.Element => {
  let t = useTheme();
  return (
    <Wrapper
      onClick={onClick}
      style={{
        display: "flex",
        cursor: "pointer",
        background: isActive ? "#374151" : "",
      }}
    >
      <Span
        style={{
          color: "#9ca3af",
        }}
      >
        {/* {isActive ? icon : fillIcon} */}
        {icon}
      </Span>
      {title}
    </Wrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  white-space: nowrap;
  letter-spacing: 0.2px;
  transition: all 0.5s;
  font-size: 17px;
  margin: 0px;
  padding: 13px 13px 13px 0px;
  border-radius: 10px;
`;
const Span = styled.span`
  padding: 0px 15px;
  display: flex;
  align-items: center;
  font-size: larger;
`;
