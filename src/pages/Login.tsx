import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { Link } from "react-router-dom";

export default function Login() {
    
    const responseMessage = (response: CredentialResponse) => {
        console.log(response);
    };
    
    const errorMessage = () => {
        console.log("Google login failed");
    };
    
    return (
        <div className="container h-full flex flex-col items-center w-screen py-5 justify-between">
            <h1 className="text-5xl text-left mb-6 font-family-heading">Task Master</h1>
            
            <div className="flex flex-col  space-y-4 mb-8 font-family-body w-full px-15">
                <h2 className="text-xl font-semibold">Entre na Sua Conta</h2>
                <p className="text-gray-600">Digite seu email e senha para entrar</p>
                
                <div className="">
                    <label htmlFor="email" className="block text-sm  font-bold">Email</label>
                    <input 
                        type="email" 
                        id="emailInput" 
                        className="bg-gray-primary w-full py-3 px-4 border border-gray-400 rounded-xl "
                        placeholder="seuemail@mail.com"
                    />
                </div>
                
                <div className="">
                    <label htmlFor="password" className="block text-sm font-bold">Senha</label>
                    <input 
                        type="password" 
                        id="passwordInput" 
                        className="bg-gray-primary w-full py-3 px-4 border border-gray-400 rounded-xl "
                        placeholder="**********"

                    />
                </div>
                
                <Link to="#" className="text-sm text-end text-black font-bold hover:underline">
                    Esqueceu a senha?
                </Link>
                
                <button 
                    type="submit" 
                    className="bg-gray-secondary text-white font-bold text-xl p-4 rounded hover:bg-gray-500 w-1/2"
                >
                    Entrar
                </button>
            </div>
            
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