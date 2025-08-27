"use client";

import { Button, Checkbox, Container, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./index.module.scss";
import { UserRegistration } from "@/types/user";
import { fetchUserRegistration } from "@/shared/api/userAuthQueries";

const test = async (data: UserRegistration) => {
  return await fetchUserRegistration(data);
};

const RegistrationPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      name: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      username: (value) =>
        value.length >= 4 && value.length <= 15
          ? null
          : "Длина должна быть больше 3 и менее 16 символов",
      name: (value) => (value.length ? null : "Заполните имя"),
      password: (value) =>
        value.length >= 4 && value.length <= 15
          ? null
          : "Длина должна быть больше 3 и менее 16 символов",
      termsOfService: (value) => (value ? null : "Согласие обязательно"),
    },
  });

  return (
    <Container size={"xs"}>
      <div className={styles.root}>
        <form onSubmit={form.onSubmit((values) => test(values))}>
          <TextInput
            withAsterisk
            label="Логин"
            placeholder="Jabi"
            key={form.key("username")}
            {...form.getInputProps("username", { type: "input" })}
          />

          <TextInput
            withAsterisk
            label="Имя"
            placeholder="Kristina"
            key={form.key("name")}
            {...form.getInputProps("name", { type: "input" })}
          />

          <TextInput
            withAsterisk
            label="Пароль"
            placeholder="***"
            key={form.key("password")}
            type={"password"}
            {...form.getInputProps("password", { type: "input" })}
          />

          <Checkbox
            mt="md"
            label="Я выбираю следить за своим ментальным здоровьем 🐥"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Group justify="flex-end" mt="md">
            <Button type="submit">Submit</Button>
          </Group>
        </form>
      </div>
    </Container>
  );
};

export default RegistrationPage;
