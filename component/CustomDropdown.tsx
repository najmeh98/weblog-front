import { useTheme } from "./Context/ThemeContext";
import { useSelect } from "downshift";
import { useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import styled from "styled-components";
import { ThemedText } from "./ThemedText";
import { Space } from "./share/Space";

// export type DropdownItem = { id: string; label: string };
export type DropdownItem = {};

type Props = {
  items: DropdownItem[];
  selectedItem: DropdownItem | undefined;
  setSelectedItem: (selectedItem: DropdownItem) => void;
};

export const CustomDropdown = ({
  items,
  selectedItem,
  setSelectedItem,
}: Props) => {
  let t = useTheme();

  useEffect(() => {
    if (selectedItem === undefined) {
      setSelectedItem(items[0]);
    } else {
      if (!selectedItem) return;
      setSelectedItem(selectedItem);
    }
  }, [items, selectedItem, setSelectedItem]);

  let menuStyles = {
    border: `1px solid ${t.color.borderColor}`,
    width: "100%",
    height: 40,
    padding: t.padding.fullpadding,
    borderRadius: t.borderRadius,
    display: "flex",
    cursor: "pointer",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    paddingHorizontal: 4,
  };

  let {
    getItemProps,
    getLabelProps,
    getToggleButtonProps,
    highlightedIndex,
    isOpen,
    getMenuProps,
    selectItem,
    toggleMenu,
  } = useSelect({ items: items, selectedItem: selectedItem });

  return (
    <Wrapperdropdown>
      <Selectd style={{ width: "100%" }}>
        <label {...getLabelProps()} style={{ color: t.color.titleColor }}>
          دسته بندی
        </label>
        <Space vertical={10} />
        <div style={menuStyles} {...getToggleButtonProps({})}>
          {/* {selectedItem ? selectedItem.label : "انتخاب کنید"} */}
          {selectedItem || "انتخاب کنید"}
          <FaAngleDown />
        </div>

        <ul
          {...getMenuProps()}
          style={{
            borderRadius: t.borderRadius,
            borderColor: t.color.borderColor,
            // border: `1px solid ${t.color.borderColor}`,
            // border: "none",

            backgroundColor: t.color.bgColor,
            cursor: "pointer",
            position: "absolute",
            width: "100%",
            marginTop: "10px",
            zIndex: 1,
          }}
        >
          {isOpen &&
            items.map((item, index) => (
              <List
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "ButtonHighlight" }
                    : {}
                }
                onClick={() => setSelectedItem(item)}
              >
                <ThemedText
                  lineHeight={1}
                  fontSize="small"
                  fontWeight="regular"
                  style={{ padding: "0px 10px" }}
                >
                  {item}
                </ThemedText>
              </List>
            ))}
        </ul>
      </Selectd>
    </Wrapperdropdown>
  );
};

const Wrapperdropdown = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  max-width: 300px;
  margin: 10px;
  ul {
    list-style: none;
    padding: 0px;
    margin: 0;
  }
`;

const List = styled.div`
  display: flex;
  padding: 0;
`;

const Selectd = styled.div`
  ul {
    list-style: none;
    padding: 0px;
    margin: 0;
  }
`;
