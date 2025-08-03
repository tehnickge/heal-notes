"use client";

import { Button, Text } from "@mantine/core";
import { useBreakpoint } from "@/hooks/useBreakpoint";
import Select from "@/components/Select/Select";
import { useState } from "react";
import BaseDatePicker from "@/components/DatePicker/DatePicker";

type User = { id: string; name: string };

const users: User[] = [
  { id: "1", name: "Alice" },
  { id: "2", name: "Bob" },
  { id: "3", name: "Boba" },
  { id: "4", name: "Bobb" },
];

export default function HomePage() {
  const bp = useBreakpoint();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <main className={""}>
      <h1 className={""}>Добро пожаловать 🌿</h1>
      <Text className={""}>
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
