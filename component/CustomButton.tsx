import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { FormItem, Wrapper } from "./share/Container";

type Props = {
  onClick: () => void;
  label?: string;
  style?: any;
  disable?: boolean;
  bordered?: boolean;
  children?: string;
  width?: string;
  maxWidth?: string;
  padding?: string;
};

export const CustomButton = ({
  onClick,
  label,
  style,
  disable,
  children,
  width,
  padding,
  maxWidth,
}: Props) => {
  let t = useTheme();
  return (
    <Row style={{ margin: t.margin.medium, ...style }}>
      <FormItem style={{ width: width, maxWidth: maxWidth }}>
        <Button
          onClick={onClick}
          disabled={disable}
          style={{
            width: "100%",
            height: "40px",
            backgroundColor: t.color.buttonBg,
            color: t.color.textColor,
            borderRadius: t.borderRadius,
            fontSize: t.fontSize.medium,
            padding: padding,
          }}
        >
          {children}
        </Button>
      </FormItem>
    </Row>
  );
};

const Row = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: ${(p) => (p.bordered ? "flex-end" : "center")}; */
  width: 100%;
  height: 65px;
`;
const Button = styled.button`
  border: none;
  cursor: pointer;
  font-size: 18px;
`;
