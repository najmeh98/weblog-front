import { css } from "styled-components";

export const desktop = (body: any) => css`
  @media (min-width: 1024px) and (max-width: 1399px) {
    ${body};
  }
`;

export const largeDescktop = (body: any) => css`
  @media (min-width: 1400px) {
    ${body};
  }
`;

export const tablet = (body: any) => css`
  @media (min-width: 800px) and (max-width: 1024px) {
    ${body};
  }
`;
export const mobile = (body: any) => css`
  @media (max-width: 800px) {
    ${body}
  }
`;
export const notmobile = (inner: any) => css`
  @media (max-width: 500px) {
    ${inner};
  }
`;
