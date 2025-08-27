"use client";

import { Button, Checkbox, Container, Group, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import styles from "./index.module.scss";

const RegistrationPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      termsOfService: (value) => (value ? null : "Согласие обязательно"),
    },
  });

  return (
    <Container size={"xs"}>
      <div className={styles.root}>
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <TextInput
            withAsterisk
            label="Email"
            placeholder="your@email.com"
            key={form.key("email")}
            {...form.getInputProps("email", { type: "input" })}
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
