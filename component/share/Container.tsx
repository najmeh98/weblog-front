import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const FormItem = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: flex-start;

  direction: ltr !important;
`;
export const ButtonStyle = styled.div`
  display: flex;
`;
export const FlexRow = styled.div`
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  width: 100%;
`;

export const MainWrapper = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 30px auto;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;
