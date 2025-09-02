"use client";

import {
  Button,
  Checkbox,
  Container,
  Group,
  TextInput,
  Paper,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserAuthQueries } from "@/stores/useUserAuth.queries";

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

  const {
    fetchUserRegistration,
    isErrorUserRegistration,
    userRegistrationData,
    isSuccessUserRegistration,
    isPendingUserRegistration,
  } = useUserAuthQueries();

  return (
    <Container size="xs">
      <Paper shadow="xs" radius="md" p="md" bg="pastelLavender.1">
        {isErrorUserRegistration && "Ошибка"}
        {isSuccessUserRegistration &&
          `Успешно создан аккаунт, ${userRegistrationData?.username}!`}

        <form
          onSubmit={form.onSubmit((values) => fetchUserRegistration(values))}
        >
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
            type="password"
            {...form.getInputProps("password", { type: "input" })}
          />

          <Checkbox
            mt="md"
            label="Я выбираю следить за своим ментальным здоровьем 🐥"
            key={form.key("termsOfService")}
            {...form.getInputProps("termsOfService", { type: "checkbox" })}
          />

          <Group justify="center" mt="md">
            {!isPendingUserRegistration ? (
              <Button type="submit">Зарегистрироваться</Button>
            ) : (
              <Button type="submit" disabled>
                Регистрация...
              </Button>
            )}
          </Group>
        </form>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
