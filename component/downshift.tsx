import { useSelect } from "downshift";
import styled from "styled-components";
import { useTheme } from "./Context/ThemeContext";
import { FaAngleDown } from "react-icons/fa";
const items: string[] = ["All", "Completed", "Uncompleted"];
type filterItem = {
  filterHandler: (selectedItem: any) => void;
  setSelectedItem: (selectedItem: itemsType) => void;
  selectedItem: itemsType | undefined;
};

type itemsType = {
  label: string;
  value: string;
};

export const Item = ({
  selectedItem,
  filterHandler,
  setSelectedItem,
}: filterItem) => {
  const {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items });

  const theme = useTheme();
  let menuStyles = {
    borderWidth: 1,
    width: "100%",
    height: 34,
    paddingHorizontal: 4,
    padding: theme.padding,
    fontSize: theme.fontSize,
    backgroundColor: theme.color.borderColor,
    // borderWidth: "1px solid",
    borderRadius: theme.borderRadius,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#fff",
    cursor: "pointer",
  };
  return (
    <Wrapper>
      {/* <label {...getLabelProps()}>Choose an element:</label> */}
      <Selectd style={{ width: "100%" }}>
        <div style={menuStyles} {...getToggleButtonProps({})}>
          {selectedItem || "Elements"}
          <FaAngleDown />
        </div>
        <ul
          {...getMenuProps()}
          style={{
            borderRadius: theme.borderRadius,
            backgroundColor: theme.color.borderColor,
            cursor: "pointer",
          }}
        >
          {isOpen &&
            items.map((item, index) => (
              <List
                style={
                  highlightedIndex === index
                    ? { backgroundColor: "#bde4ff" }
                    : {}
                }
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
                onClick={() => filterHandler(item)}
              >
                {item}
              </List>
            ))}
        </ul>
      </Selectd>
    </Wrapper>
  );
};

const List = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  position: relative;
  align-items: flex-end;
`;

const Selectd = styled.div`
  /* width: 300px; */
  position: absolute;
  z-index: 1;
  ul {
    list-style: none;
    padding: 0px;
  }
  li {
    color: #fff;
  }
`;
