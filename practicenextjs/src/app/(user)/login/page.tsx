"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
export default function LoginPage() {
  const [message, setMessage] = useState("");

  const router = useRouter();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;

    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    ).value;

    const password = (
      form.elements.namedItem("password") as HTMLInputElement
    ).value;

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      setMessage("Login successful");

      router.push("/products");
    } else {
      setMessage(data.message);
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          placeholder="Email"
        />

        <br />
        <br />

        <input
          type="password"
          name="password"
          placeholder="Password"
        />

        <br />
        <br />

        <button type="submit">
          Login
        </button>
      </form>

      <p>{message}</p>
    </div>
  );
}