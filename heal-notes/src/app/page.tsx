"use client";

import { Button, Text } from "@mantine/core";
import * as stylex from "@stylexjs/stylex";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Select from "@/components/Select/Select";
import { useState } from "react";
import BaseDatePicker from "@/components/DatePicker/DatePicker";

const styles = stylex.create({
  container: {
    padding: "24px",
    backgroundColor: "var(--color-background)",
    minHeight: "100vh",
  },
  header: {
    fontSize: "24px",
    color: "var(--color-primary)",
    marginBottom: "16px",
  },
  description: {
    fontSize: "16px",
    color: "var(--color-text)",
    marginBottom: "20px",
  },
});

type User = { id: string; name: string };

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
];

export default function HomePage() {
  const bp = useBreakpoint();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className={styles.container}>
      <h1 className={styles.header}>Добро пожаловать 🌿</h1>
      <Text className={styles.description}>
        Ваш текущий брейкпоинт: <strong>{bp}</strong>
      </Text>

      <Button color="grape" size={bp === "xs" || bp === "sm" ? "sm" : "md"}>
        Кнопка для {bp.toUpperCase()}
      </Button>
      <Select
        options={users}
        value={selectedUser}
        onChange={setSelectedUser}
        getOptionKey={(user) => user.id}
        getOptionValue={(user) => user.name}
        placeholder="Select a user"
      />

      <BaseDatePicker
        type={"range"}
        onChange={(value: [Date | null, Date | null]) => {}}
        value={[null, null]}
      />
    </main>
  );
}


// aboba аовфыаыфо оооааа dsajfjf cmfuw fjdsa пиздабол, js ts да
// а я институт закончила