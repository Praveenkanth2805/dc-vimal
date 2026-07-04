"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.push("/admin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy">
      <form
        onSubmit={handleSubmit}
        className="bg-navy-light border border-border p-10 rounded-2xl w-full max-w-md shadow-2xl"
      >
        <h1 className="font-heading text-3xl text-gold text-center mb-8">
          Admin Login
        </h1>
        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 rounded-lg bg-navy border border-border text-text-primary focus:border-gold outline-none transition"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 rounded-lg bg-navy border border-border text-text-primary focus:border-gold outline-none transition"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-gold text-navy font-semibold py-3 rounded-full hover:bg-gold-dark transition"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}