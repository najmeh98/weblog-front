import React, { useState } from "react";
import styled, { css } from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { FormItem } from "./share/Container";
import { Space } from "./share/Space";
import { FiEye, FiEyeOff } from "react-icons/fi";
type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  width?: string;
  height?: string;
  // setValue: (value: string) => void;
  // onChange?: (value?: string | number) => void;
  style?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit?: (() => void) | undefined;
  type?: any;
};

export const CustomInput = ({
  label,
  placeholder,
  value,
  width,
  height,
  // setValue,
  onChange,
  style,
  onSubmit,
  type,

  ...props
}: Props) => {
  const [show, setShow] = useState(false);
  let t = useTheme();

  return (
    <FormItem
      style={{
        margin: t.margin.medium,
        width: width,
        height: height,
        ...style,
      }}
    >
      {label && (
        <>
          <label style={{ color: t.color.titleColor }}>{label}</label>
          <Space vertical={5} />
        </>
      )}
      {type === "password" && (
        <Input
          value={value}
          onChange={onChange}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />
      )}
      {!(type === "password" || type === "textarea") && (
        <Input
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />
      )}
      <Space vertical={10} />

      {type === "textarea" && (
        <textarea
          value={value}
          onChange={onChange}
          rows={6}
          style={{ borderColor: t.color.borderColor }}
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
  margin-top: 10px;
`;

const ShowPass = styled.div`
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
