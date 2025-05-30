import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { InputSign } from "../components/Inputs";
import Button, { ButtonBack } from "../components/Button";
import api from "../services/api"; // Importe a instância do Axios

interface LoginResponse {
  token: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
}

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dash");
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const { data } = await api.post<LoginResponse>("/login", form);
      console.log(data);
      // Armazene o token
      localStorage.setItem("token", data.token);

      // Redirecione para o dashboard
      navigate("/dash");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Erro ao fazer login. Tente novamente."
      );
    }
  };
  const responseMessage = (response: CredentialResponse) => {
    console.log(response); // Aqui você pode enviar para seu backend se estiver lidando com auth Google
  };

  const errorMessage = () => {
    console.log("Google login failed");
  };

  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full my-4 mx-6 md:mx-50">
      <span className="w-full flex justify-start">
        <ButtonBack />
      </span>
      <h1 className="text-5xl text-left mb-6 font-family-heading">
        Task Master
      </h1>
      <span className="w-full flex flex-col items-start">
        <h2 className="text-xl font-semibold">Entre na Sua Conta</h2>
        <p className="text-gray-600 text-sm">
          Digite seu email e senha para entrar
        </p>
      </span>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 xl:flex-row w-full"
      >
        <InputSign
          text="Email"
          type="email"
          id="emailLoginId"
          name="email"
          placeholder="seuemail@mail.com"
          value={form.email}
          onChange={handleChange}
        />
        <InputSign
          text="Senha"
          type="password"
          id="passwordLoginId"
          name="password"
          placeholder="********"
          value={form.password}
          onChange={handleChange}
        />
        <Button text="Entrar" handleClick={handleSubmit} />
      </form>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <Link
        to="#"
        className="text-sm text-end text-black font-bold hover:underline"
      >
        Esqueceu a senha?
      </Link>

      <div className="text-center w-full my-6">
        <div className="flex items-center justify-center gap-7">
          <div className="bg-gray-secondary h-[4px] flex-1 rounded-full"></div>
          <span className="text-black text-sm font-medium">ou</span>
          <div className="bg-gray-secondary h-[4px] flex-1 rounded-full"></div>
        </div>
        <div className="flex justify-center mt-6">
          <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            shape="circle"
            size="large"
          />
        </div>
      </div>

      <Link to="/cadastro">Não possui uma conta? Cadastre-se</Link>
    </div>
  );
}
