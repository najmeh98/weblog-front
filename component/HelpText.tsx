import { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";

export const HelpText = ({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}): JSX.Element => {
  let t = useTheme();
  return (
    <Text
      style={{
        fontSize: t.fontSize.normal,
        fontFamily: t.fontFamily.MainFont,
        color: t.color.fontColor,
      }}
      onClick={onClick}
    >
      {children}
    </Text>
  );
};

const Text = styled.p`
  margin: 0;
  cursor: pointer;
`;
