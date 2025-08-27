"use client";

import { useParams } from "next/navigation";

type UserIdProps = Record<"id", string>;

const CurrentUserPage = () => {
  const params = useParams<UserIdProps>();

  return <div>Current user Page {params.id}</div>;
};

export default CurrentUserPage;
