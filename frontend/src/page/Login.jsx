import { LoginForm } from "@/components/login-form";
import { useLogin } from "@/lib/Api";
import React from "react";

const Login = () => {
  const { mutate } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    mutate({email, password});
  };

  return (
    <div className="flex min-h-svh flex-col items-center justify-center cbg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm handleLogin={handleLogin} />
      </div>
    </div>
  );
};

export default Login;
