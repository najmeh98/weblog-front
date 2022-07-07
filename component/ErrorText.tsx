import { ReactNode } from "react";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";

export const ErrorText = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  let t = useTheme();
  return (
    <Text
      style={{
        fontSize: t.fontSize.smaller,
        fontFamily: t.fontFamily.MainFont,
        color: t.color.errortext,
      }}
    >
      {children}
    </Text>
  );
};

const Text = styled.p`
  width: 100%;
  margin: 0px;
`;
