"use client";
import {
  AppShell,
  Button,
  Flex,
  Loader,
  Paper,
  Stack,
  Text,
  Textarea,
} from "@mantine/core";
import Message from "../components/Message";
import { useState } from "react";
import { useForm } from "@mantine/form";

type Message = {
  text: string;
  sendBy: "user" | "bot";
};

export default function HomePage() {
  // Array<Message> para forumular uma conversa, talvez salvar no futuro?
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      text: "",
    },
    validate: {
      text: (value) => value.trim().length > 0,
    },
  });

  function sendMessage() {
    if (form.values.text.trim().length === 0) {
      return;
    }
    setMessages((messages) => [
      ...messages,
      { text: form.values.text, sendBy: "user" },
    ]);
    form.setFieldValue("text", "");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setMessages((messages) => [
        ...messages,
        { text: "Olá, como posso te ajudar?", sendBy: "bot" },
      ]);
    }, 3000);
  }

  return (
    <AppShell>
      <AppShell.Main
        h={"100dvh"}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        p={32}
      >
        <Flex
          direction={"column"}
          w={{
            base: "100%",
            md: "70%",
            lg: "60%",
          }}
          gap={24}
        >
          <Stack gap={16} align="center" w={"100%"}>
            {messages.map((message, index) => (
              <Message
                key={index}
                text={message.text}
                leftSide={message.sendBy === "bot" ? true : undefined}
              />
            ))}
          </Stack>
          {loading && <Loader type="dots" color="dark" />}
          <form
            onSubmit={form.onSubmit(sendMessage)}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              gap: 16,
            }}
          >
            <Textarea
              w={"100%"}
              placeholder="Send your message..."
              {...form.getInputProps("text")}
            />
            <Button
              variant="filled"
              size="md"
              styles={{
                label: {
                  overflow: "visible",
                },
              }}
              type="submit"
              onClick={sendMessage}
            >
              Submit
            </Button>
          </form>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
