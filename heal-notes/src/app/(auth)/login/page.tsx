"use client";

import { useUserAuthQueries } from "@/stores/useUserAuth.queries";
import {
  Button,
  Container,
  Group,
  Paper,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const router = useRouter();

  const redirectToHome = () => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  };

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      username: "",
      password: "",
    },

    validate: {
      username: (value) =>
        value.length >= 4 && value.length <= 15
          ? null
          : "Длина должна быть больше 3 и менее 16 символов",
      password: (value) =>
        value.length >= 4 && value.length <= 15
          ? null
          : "Длина должна быть больше 3 и менее 16 символов",
    },
  });
  const {
    fetchUserLogin,
    isErrorUserLogin,
    isSuccessUserLogin,
    userLoginData,
    isPendingUserLogin,
  } = useUserAuthQueries();

  if (isSuccessUserLogin) {
    redirectToHome();
  }
  return (
    <Container size="xs">
      <Paper shadow="xs" radius="md" p="md" bg="pastelLavender.1">
        {isErrorUserLogin && "Ошибка"}
        {isSuccessUserLogin && `Успешно вошли, ${userLoginData?.username}!`}

        <Text>Авторизация</Text>
        <form onSubmit={form.onSubmit((values) => fetchUserLogin(values))}>
          <TextInput
            withAsterisk
            label="Логин"
            placeholder="Jabi"
            key={form.key("username")}
            {...form.getInputProps("username", { type: "input" })}
          />

          <TextInput
            withAsterisk
            label="Пароль"
            placeholder="***"
            key={form.key("password")}
            type="password"
            {...form.getInputProps("password", { type: "input" })}
          />

          <Group justify="center" mt="md">
            {!isPendingUserLogin ? (
              <Button type="submit">Войти</Button>
            ) : (
              <Button type="submit" disabled>
                Выполняется вход...
              </Button>
            )}
          </Group>
        </form>
        <Text>
          <Link href="/registration">Нет аккаунта? Зарегистрироваться.</Link>
        </Text>
      </Paper>
    </Container>
  );
};

export default LoginPage;
