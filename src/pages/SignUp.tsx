import { InputSign } from "../components/Inputs";
import { Link } from "react-router-dom";
import Button, { ButtonBack } from "../components/Button";

export default function Cadastro() {
  return (
    <div className="flex flex-col gap-4 justify-between items-center w-full my-4 mx-10 py-20 md:mx-50 h-full">
      <span className="w-full flex justify-start">
        <ButtonBack />
      </span>
      <span className="w-full flex flex-col itms-start">
        <h2 className="text-3xl font-semibold">Cadastro</h2>
        <p className="text-gray-600 text-md">Crie uma conta para continuar!</p>
      </span>
      <form
        action=""
        className="flex flex-col gap-4 justify-between items-center w-full"
      >
        <InputSign
          text="Nome Completo"
          type="text"
          id="nameId"
          name="nome"
          placeholder="Seu Nome"
        />
        <InputSign
          text="Email"
          type="email"
          id="emailSignInId"
          name="email"
          placeholder="seuemail@mail.com"
        />
        <InputSign
          text="Data de Nascimento"
          type="date"
          id="birthdayId"
          name="birthday"
        />
        <InputSign
          text="Número de Telefone"
          type="text"
          id="phoneId"
          name="phone"
          placeholder="+55 "
        />
        <InputSign
          text="Senha"
          type="password"
          id="passwordSignInId"
          name="password"
          placeholder="********"
        />
        <Button text="Cadastrar" />
      </form>
      <Link to="/login">Já possui uma conta? Faça login.</Link>
    </div>
  );
}
