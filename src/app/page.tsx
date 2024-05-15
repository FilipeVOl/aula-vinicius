"use client";

import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });

  const { setUser } = useContext(UserContext);

  const setEmail = (email: string) =>
    setFormState((prevState) => ({ ...prevState, email }));
  const setPassword = (password: string) =>
    setFormState((prevState) => ({ ...prevState, password }));
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    fetch("http://localhost:8000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.usuario.token) {
          localStorage.setItem("token", data.usuario.token);
          const userData = {
            id: data.usuario.id,
            token: data.usuario.token,
          };
          setUser(userData);
          router.push("/listar");
        }
      });
  };

  return (
    <main>
      <div className="h-[100vh] w-full bg-gradient-radial from-blue-400 to-blue-800 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg shadow-lg h-[23rem] w-[30%] text-black">
          <form className="flex flex-col h-auto" onSubmit={handleSubmit}>
            <h1 className=" text-5xl font-bold text-center">Login</h1>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 indent-4"
              >
                Email
              </label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                value={formState.email}
                className="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 indent-4"
              >
                Senha
              </label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                name="password"
                value={formState.password}
                className="mt-1 mb-8 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex flex-row justify-center gap-4">
              <button
                type="submit"
                className="mt-4 bg-blue-500 h-[3rem] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-[5rem]"
              >
                Entrar
              </button>
              <Link className="w-[7rem]" href="/cadastro">
                <button className="mt-4 w-full h-[3rem] bg-gray-300 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Cadastrar
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
