import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputSign } from "../components/Inputs";
import { Link } from "react-router-dom";
import Button, { ButtonBack } from "../components/Button";
import { useEffect } from "react";
import api from "../services/api"; // Importe a instância do Axios

interface SignupResponse {
  message: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Cadastro() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    static_num: Math.floor(Math.random() * 10000),
  });
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
      await api.post<SignupResponse>("/users", form);

      // Redireciona para login após cadastro bem-sucedido
      navigate("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          err.message ||
          "Erro ao cadastrar usuário. Tente novamente."
      );
    }
  };
  return (
    <div className="flex flex-col gap-4 justify-between items-center w-full my-4 mx-10 py-20 md:mx-50">
      <span className="w-full flex justify-start">
        <ButtonBack />
      </span>
      <span className="w-full flex flex-col items-start">
        <h2 className="text-3xl font-semibold">Cadastro</h2>
        <p className="text-gray-600 dark:text-gray-200 text-md">
          Crie uma conta para continuar!
        </p>
      </span>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 justify-between items-center w-full"
      >
        <input
          hidden
          type="number"
          id="seedId"
          name="static_num"
          value={form.static_num}
          onChange={handleChange}
        />
        <InputSign
          text="Nome Completo"
          type="text"
          id="nameId"
          name="name"
          placeholder="Seu Nome"
          value={form.name}
          onChange={handleChange}
        />
        <InputSign
          text="Email"
          type="email"
          id="emailSignInId"
          name="email"
          placeholder="seuemail@mail.com"
          value={form.email}
          onChange={handleChange}
        />
        <InputSign
          text="Senha"
          type="password"
          id="passwordSignInId"
          name="password"
          placeholder="********"
          value={form.password}
          onChange={handleChange}
        />
        <Button text="Cadastrar" handleClick={handleSubmit} />
      </form>

      {error && (
        <p className="text-red-500 bg-black/30 p-2 rounded-lg border border-red-500 font-bold">
          {error}
        </p>
      )}

      <Link to="/login">Já possui uma conta? Faça login.</Link>
    </div>
  );
}
