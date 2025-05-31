import { useState } from "react";
import Button from "../components/Button";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { InputSign } from "../components/Inputs";
import { useData } from "../contexts/DataContext";
import { getAvatar } from "../utils/getAvatar";
import api from "../services/api";

export default function ProfileEdit() {
  const { user, fetchUser, setUser } = useData();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
    static_num: user?.static_num || 0,
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      if (!user?.name) {
        throw new Error("Usuário não autenticado");
      }
      const payload: {
        name?: string;
        email?: string;
        password?: string;
        static_num?: number;
      } = {};
      if (formData.name !== user.name) payload.name = formData.name;
      if (formData.email !== user.email) payload.email = formData.email;
      if (formData.password) payload.password = formData.password;
      if (formData.static_num !== user.static_num)
        payload.static_num = formData.static_num;
      if (Object.keys(payload).length === 0) {
        setSuccess(true);
        return;
      }
      console.log(payload);
      const response = await api.put(`/users/${user.userId}`, payload);
      console.log(response);
      await fetchUser();
      setSuccess(true);
      setUser({
        ...user,
        name: formData.name,
        email: formData.email,
        static_num: formData.static_num,
      });
      setTimeout(() => navigate("/perfil"), 1500);
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err);
      if (typeof err === "object" && err !== null && "response" in err) {
        const errorObj = err as { response?: { data?: { error?: string } } };
        setError(errorObj.response?.data?.error || "Erro ao atualizar perfil");
      } else {
        setError("Erro ao atualizar perfil");
      }
    } finally {
    }
  };

  return (
    <>
      <Header text="Editar perfil" />

      <div className="flex flex-col items-center w-full px-4">
        <div className="flex flex-col items-center w-full max-w-md gap-4 py-5">
          <div className="relative">
            <img
              src={getAvatar(formData.static_num)}
              alt="Foto de perfil"
              width={110}
              height={110}
              className="rounded-full border-2 border-gray-200 dark:bg-gray-primary"
            />
            <button
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-secondary border  text-white px-3 py-1 rounded-full text-sm hover:bg-gray-700 transition"
              onClick={() => {
                setFormData({
                  ...formData,
                  static_num: Math.floor(Math.random() * 10000),
                });
                console.log(formData.static_num);
              }}
            >
              Troque
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-full space-y-4 flex flex-col items-center"
          >
            <input
              type="number"
              hidden
              value={formData.static_num}
              name="static_num"
              id="seedEdit"
              onChange={handleChange}
            />
            <InputSign
              text="Nome completo"
              type="text"
              name="name"
              id="nameEdit"
              value={formData.name}
              onChange={handleChange}
            />

            <InputSign
              text="Email"
              type="email"
              name="email"
              id="emailEdit"
              value={formData.email}
              onChange={handleChange}
            />

            <InputSign
              text="Nova senha"
              type="password"
              name="password"
              id="passwordEdit"
              value={formData.password}
              onChange={handleChange}
              placeholder="Deixe em branco para manter a atual"
            />

            {error && (
              <div className="text-red-500 text-sm text-center p-2 bg-red-50 rounded">
                {error}
              </div>
            )}

            {success && (
              <div className="text-green-600 text-sm text-center p-2 bg-green-50 rounded">
                Perfil atualizado com sucesso!
              </div>
            )}

            <div className="pt-4">
              <Button text="Enviar" handleClick={handleSubmit} />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
