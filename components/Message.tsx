import { Paper, Text } from "@mantine/core";

interface MessageProps {
  text: string;
  leftSide?: boolean;
}

export default function Message({ text, leftSide }: MessageProps) {
  return (
    <Paper
      withBorder
      radius={"lg"}
      py={8}
      px={16}
      bg={leftSide ? "gray.2" : "white"}
      style={{
        borderBottomRightRadius: leftSide ? undefined : 0,
        borderBottomLeftRadius: leftSide ? 0 : undefined,
        alignSelf: leftSide ? "flex-start" : "flex-end",
      }}
    >
      <Text
        fw={500}
        style={{
          whiteSpace: "pre-line",
        }}
        ta={leftSide ? "start" : "end"}
      >
        {text}
      </Text>
    </Paper>
  );
}
