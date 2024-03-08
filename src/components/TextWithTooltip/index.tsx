import { Text, Tooltip } from '@gravity-ui/uikit';

export const TextWithTooltip = ({
  text,
  width = '200px',
}: {
  text: string;
  width?: string;
}) => (
  <Tooltip content={text}>
    <Text ellipsis whiteSpace="nowrap" style={{ maxWidth: width }}>
      {text}
    </Text>
  </Tooltip>
);
