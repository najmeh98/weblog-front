import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { Props } from "./CustomInput";
import { FormItem } from "./share/Container";
import { Space } from "./share/Space";

export const CustomFileInput = ({
  label,
  onChange,
  type,
  enctype,
  placeholder,
  name,
}: Props) => {
  let t = useTheme();

  return (
    <FormItem method="POST" encType={enctype} style={{ margin: "10px" }}>
      {label && (
        <>
          <label style={{ color: t.color.titleColor }}>{label}</label>
          <Space vertical={10} />
        </>
      )}
      <Input
        onChange={onChange}
        type={type}
        name={name}
        placeholder={placeholder}
        style={{ padding: t.padding.normal, height: t.height }}
      />
    </FormItem>
  );
};

export const Input = styled.input`
  outline: none;
  border: 1px solid rgb(204, 204, 204);
  direction: rtl !important;
  display: flex;
  text-align: right;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
`;
