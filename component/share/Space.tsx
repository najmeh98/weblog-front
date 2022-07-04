type Props = {
  horizontal?: string | number;
  vertical?: string | number;
};

export const Space = ({ horizontal, vertical }: Props): JSX.Element => {
  return <div style={{ width: horizontal, height: vertical }} />;
};
