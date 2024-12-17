"use server";

import { addUser, getUserByEmail } from "@/lib/db";
import bcrypt from "bcryptjs";

export default async function handleSignUp(credentials) {
  const { name, email, password, confirmPassword } = credentials;

  const handleGetUserError = (e) => {
    console.log("handleSignUp/getUserByEmail : error caught");

    const error_message = "Internal server error. Please try again later";
    return { error_message };
  };
  const iuser = await getUserByEmail(email).catch(handleGetUserError);
  console.log(iuser);

  if (iuser?.error_message) return { ok: false, message: iuser.error_message };

  if (iuser)
    return {
      ok: false,
      message: "User already exists. Please sign in",
    };

  if (password !== confirmPassword)
    return {
      ok: false,
      message: "Passwords do not match. Please sign up again",
    };

  const hashedPassword = bcrypt.hashSync(
    password,
    parseInt(process.env.SALT_ROUNDS)
  );

  const new_user_credentials = {
    email,
    name,
    password: hashedPassword,
  };

  const handleAddUserError = (error) => {
    console.log("handleSignUp/addUser : error caught");

    return {
      ok: false,
      message: "Internal server error. Please try again later",
    };
  };
  const response = await addUser(new_user_credentials).catch(
    handleAddUserError
  );
  console.log(response);

  if (!response)
    return {
      ok: true,
      message: "User account created. Please sign in",
    };

  return response;
}
