import React, {
  ChangeEvent,
  DetailedHTMLProps,
  TextareaHTMLAttributes,
  useState,
} from "react";
import styled, { css } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { FormItem } from "./share/Container";
import { Space } from "./share/Space";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface TextInput {
  type: "text";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface FileInput {
  type: "file";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface TextArea {
  type: "textarea";
  onChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
interface TextPassword {
  type: "password";
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export type InputCommonProps = {
  label?: string;
  placeholder?: string;
  value?: string;
  width?: string;
  height?: string;
  enctype?: string | undefined;
  name?: string;
  style?: any;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (() => void) | undefined;
  type?: string;
};

type Props = (TextInput | TextArea | FileInput | TextPassword) &
  InputCommonProps;

interface ImgProps {
  password?: boolean;
  onClick: () => void;
}

export const CustomInput: React.FC<Props> = ({
  label,
  placeholder,
  value,
  width,
  name,
  height,
  enctype,
  onChange,
  style,
  onSubmit,
  type,
}) => {
  const [show, setShow] = useState(false);

  let t = useTheme();

  return (
    <FormItem
      // method="posts"
      // enctype={enctype}
      style={{
        margin: t.margin.medium,
        width: width,
        height: height,
        ...style,
      }}
    >
      {label && (
        <>
          <label style={{ color: t.color.labelColor }}>{label}</label>
        </>
      )}
      {type === "password" && (
        <Input
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height.small }}
        />
      )}
      {!(type === "password" || type === "textarea") && (
        <Input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height.small }}
        />
      )}

      {type === "textarea" && (
        <textarea
          value={value}
          onChange={onChange}
          rows={6}
          style={{
            borderColor: t.color.borderColor,
            resize: "none",
            padding: t.padding.normal,
          }}
        ></textarea>
      )}

      {type === "password" && (
        <div style={{ position: "relative" }}>
          <ShowPass onClick={() => setShow(!show)} password>
            {!show && <FiEye />} {show && <FiEyeOff />}
          </ShowPass>
        </div>
      )}
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
  margin-top: 10px;
  resize: none;
  &::placeholder {
    font-size: 13px;
  }
`;

const ShowPass = styled.div<ImgProps>`
  width: 40px;
  height: 40px;
  position: absolute;
  left: 0px;
  top: -50px;

  cursor: pointer;
  ${(p) =>
    p.password &&
    css`
      border-right: 1px solid rgb(204, 204, 204);
      cursor: pointer;
    `}
  svg {
    display: block;
    margin: 10px auto;
  }
`;
