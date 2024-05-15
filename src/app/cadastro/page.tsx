"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Cadastro() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPasswordConfirmation] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (password !== password_confirmation) {
      alert("As senhas não são iguais");
      return;
    }
    fetch("http://localhost:8000/api/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({ name, email, password, password_confirmation }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
          router.push("/");
        }
      });
  };

  return (
    <div className="h-[100vh] w-full bg-gradient-radial from-blue-400 to-blue-800 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg h-[35rem] w-[40rem] text-black">
        <form onSubmit={handleSubmit}>
          <h1 className="text-5xl font-bold text-center my-8">Cadastro</h1>
          <div className="mt-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 indent-4"
            >
              Nome
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              name="name"
              className="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 indent-4"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              name="email"
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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name="password"
              className="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 indent-4"
            >
              Confirmar senha
            </label>
            <input
              type="password"
              id="password"
              value={password_confirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              name="password"
              className="mt-1 p-2 border border-gray-300 block w-full rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div className="flex mt-8 justify-center">
            <button
              type="submit"
              className="mt-4 w-[20%] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cadastrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
