"use client";

import {
  Button,
  Checkbox,
  Container,
  Group,
  TextInput,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useUserAuthQueries } from "@/stores/useUserAuth.queries";
import Link from "next/link";
import { useRouter } from "next/navigation";


const RegistrationPage = () => {
  const router = useRouter();
  const redirectToLogin = () => {
    setTimeout(() => {
      router.push("/login");
    }, 5000);
  };
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

  if (isSuccessUserRegistration) {
    redirectToLogin();
  }
  return (
    <Container size="xs">
      <Paper shadow="xs" radius="md" p="md" bg="pastelLavender.1">
        {isErrorUserRegistration && "Ошибка"}
        {isSuccessUserRegistration &&
          `Успешно создан аккаунт, ${userRegistrationData?.username}!`}
        <Text>Регистрация</Text>
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
        <Text>
          <Link href="/login">Уже есть аккаунт? Войти.</Link>
        </Text>
      </Paper>
    </Container>
  );
};

export default RegistrationPage;
