import { FocusEventHandler } from "react";
import { useTheme } from "./Context/ThemeContext";
import { Input } from "./CustomInput";
import { Space } from "./share/Space";
type Props = {
  label?: string;
  placeholder?: string;
  value?: string;
  width?: string;
  height?: string;
  style?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit?: FocusEventHandler<HTMLInputElement> | undefined;
  type?: any;
};
export const CustomInputText = ({
  label,
  value,
  onChange,
  type,
  placeholder,
  onSubmit,
}: Props): JSX.Element => {
  let t = useTheme();

  return (
    <div>
      {label && (
        <>
          <label style={{ color: t.color.titleColor }}>{label}</label>
          <Space vertical={5} />
        </>
      )}
      {
        <Input
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          style={{ padding: t.padding.normal, height: t.height.small }}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     onSubmit();
          //   }
          // }}
        />
      }
    </div>
  );
};
