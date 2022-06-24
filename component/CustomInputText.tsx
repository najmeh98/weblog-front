import { useTheme } from "./Context/ThemeContext";
import { Input } from "./CustomInput";
import { Space } from "./share/Space";
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
export const CustomInputText = ({
  label,
  value,
  onChange,
  type,
  placeholder,
}: Props) => {
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
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
        />
      }
    </div>
  );
};
