import Button from "../components/Button";
import Header from "../components/Header";
import profileImage from "../assets/profile.jpg";
import { Link } from "react-router-dom";
import { InputSign } from "../components/Inputs";

export default function EditProfile() {
  const handleChange = () => {};
  return (
    <>
      <Header text="Editar perfil" />
      <div className="flex flex-col items-center w-full">
        <div className="flex flex-col justify-center gap-4 items-center py-5 h-full">
          <img
            src={profileImage}
            alt="Profile"
            width={90}
            height={90}
            className="rounded-full"
          />
          <a className="text-xl">Alterar foto</a>
          <form
            action=""
            className="w-full h-full flex flex-col justify-evenly items-center gap-6 p-5"
          >
            <InputSign
              text={"Nome"}
              type={"text"}
              id={"name"}
              name={"name"}
              onChange={handleChange}
            />
            <InputSign
              text={"Email"}
              type={"email"}
              id={"email"}
              name={"email"}
              onChange={handleChange}
            />

            <InputSign
              text={"Senha"}
              type={"password"}
              id={"password"}
              name={"password"}
              onChange={handleChange}
            />
            <Link to="/perfil">
              <Button text="Salvar alterações" />
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
