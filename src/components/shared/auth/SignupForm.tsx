"use client";

import { useState } from "react";

export function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
      <div className="space-y-1">
        <label className="text-sm">Email</label>
        <input
          className="w-full rounded border px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-1">
        <label className="text-sm">Password</label>
        <input
          className="w-full rounded border px-3 py-2"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button className="rounded bg-black text-white px-4 py-2" type="submit">
        Create account
      </button>
    </form>
  );
}
