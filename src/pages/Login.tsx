import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Link } from "react-router-dom";
import { InputSign } from "../components/Inputs";
import Button, { ButtonBack } from "../components/Button";

export default function Login() {
  const responseMessage = (response: CredentialResponse) => {
    console.log(response);
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
      <span className="w-full flex flex-col itms-start">
        <h2 className="text-xl font-semibold">Entre na Sua Conta</h2>
        <p className="text-gray-600 text-sm">
          Digite seu email e senha para entrar
        </p>
      </span>
      <div className="flex flex-col gap-4 md:flex-row w-full">
        <InputSign
          text="Email"
          type="email"
          id="emailLoginId"
          name="email"
          placeholder="seuemail@mail.com"
        />
        <InputSign
          text="Senha"
          type="password"
          id="passwordLoginId"
          name="password"
          placeholder="********"
        />
      </div>
      <Link
        to="#"
        className="text-sm text-end text-black font-bold hover:underline"
      >
        Esqueceu a senha?
      </Link>
      <Button text="Entrar" />{" "}
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
