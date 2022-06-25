export interface Theme {
  fontSize: {
    smaller: number;
    small: number;
    normal: number;
    medium: number;
    semiLarge: number;
    large: number;
  };
  fontFamily: {
    MainFont: string;
  };
  fontWeight: { regular: string; bold: string };
  margin: {
    samll: number;
    medium: number;
    Large: number;
  };
  height: {
    small: number;
    medium: number;
    large: number;
  };
  width: {
    maxWidth4: string;
    maxWidth3: string;
  };
  padding: {
    small: number;
    normal: number;
    medium: number;
    fullpadding: string;
  };
  color: {
    fontColor: string;
    bgColor: string;
    borderColor: string;
    titleColor: string;
    labelColor: string;
    buttonBg: string;
    textColor: string;
    errortext: string;
  };
  borderRadius: {
    small: number;
    normal: number;
  };
  boxShadowbox: string;
  buttoncolor: string;
  direction: string;
}
