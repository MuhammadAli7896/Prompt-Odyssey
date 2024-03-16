"use client";

import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faGoogle } from '@fortawesome/free-brands-svg-icons';
import validator from "validator";
import userContext from "@context/userContext";

export default function Signin() {
    const [login, setLogin] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [pending, setPending] = useState(false);
    const router = useRouter();
    const {user, setUser} = useContext(userContext);

    useEffect(() => {
        if (user) {
            router.replace("/");
        }

    }, [user])


    const submitHandler = async () => {
        if (login) {
            if (!email) {
                alert("Please enter your email")
                setPending(false);
                return;
            }
            if (!validator.isEmail(email)) {
                alert("Please enter a valid email")
                setPending(false);
                return;
            }
            if (!password) {
                alert("Please enter your password")
                setPending(false);
                return;
            }
            try {
                setPending(true);
                const response = await signIn("credentials", {
                    email, password, redirect: false
                })

                if (response.error) {
                    alert(response.error || response.statusText);
                    setPending(false);
                    return;
                }
                setUser(true);
                router.replace("/");
            } catch (error) {
                setPending(false);
                alert("Error: " + error);
                setPassword("");
            }

        }
        else {
            if (!name) {
                alert("Please enter your name");
                setPending(false);
                return;
            }
            if (!email) {
                alert("Please enter your email")
                setPending(false);
                return;
            }
            if (!validator.isEmail(email)) {
                alert("Please enter a valid email")
                setPending(false);
                return;
            }
            if (!password) {
                alert("Please enter your password")
                setPending(false);
                return;
            }
            try {
                setPending(true);
                const response = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ password, email, name: name.replace(/\s/g, "").toLowerCase() })
                }
                );

                if (response.ok) {
                    setPending(false);
                    router.replace("/");
                    setUser(true);
                }
                else {
                    setPending(false);
                    alert("Error occured: ", response.message || response.statusText);
                }

            } catch (error) {
                setPending(false);
                alert("Error: " + error);
                setPassword("");

            }
        }
    }

    return (
        <section className="w-full max-w-full flex-center flex-col mb-10">
            <p className="blue_gradient text-center" style={{ fontSize: "30px", fontWeight: "700" }}>{login ? "Login" : "Sign in"}</p>
            <div className=" p-4">
                <form className="">
                    {!login && (
                        <div className="mb-4">
                            <label htmlFor="name" className="block text-gray-700">Enter username</label>
                            <input
                                type="text"
                                id="name"
                                placeholder="Enter your name"
                                value={name}
                                className="mt-1 p-2 border border-gray-300 rounded-md w-[300px] focus:outline-none focus:ring focus:border-blue-300"
                                required
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    )}

                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Enter email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-[300px] focus:outline-none focus:ring focus:border-blue-300"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-gray-700">Enter password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-[300px] focus:outline-none focus:ring focus:border-blue-300 "
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="text-left flex justify-between mx-1">
                        <div>
                            <p className="text-gray-700">{!login && "Already have an account?"}</p>
                            <p className="text-blue-700 underline mx-1"><Link href="/signin" onClick={() => setLogin(!login)}>{!login ? "Login" : "Register an Account"}</Link></p>
                        </div>
                        <div>
                            <button className="outline_btn" type="submit" onClick={submitHandler} disabled={pending} >{!pending ? (!login ? "Sign Up" : "Login") : (!login ? "Signing up" : "Logggin in")}</button>
                        </div>
                    </div>
                    <div className="text-left flex justify-between -mx-2 mt-4">

                        <div className="w-[5.8rem] h-[0.2rem] bg-[#6e7380] mt-3.5" ></div>
                        <div className="text-gray-700 text-lg text-center">Sign in using</div>
                        <div className="w-[5.8rem] h-[0.2rem] bg-[#6e7380] mt-3.5" ></div>
                    </div>
                </form>
                <div className="mt-5 text-center flex flex-center flex-col gap-3">
                    <div className="border-2 border-gray-500 w-[220px] p-2 rounded-xl hover:bg-gray-200 cursor-pointer">
                        <button onClick={async () => { await signIn("github") }}> <FontAwesomeIcon icon={faGithub} className="text-2xl mr-3 -mb-0.5" />Github</button>
                    </div>
                    <div className="border-2 border-gray-500 w-[220px] p-2 rounded-xl hover:bg-gray-200 cursor-pointer">
                        <button onClick={async () => { await signIn("google") }}><FontAwesomeIcon icon={faGoogle} className="text-2xl text-red-700 mr-3 -mb-0.5" />Google</button>
                    </div>
                </div>
            </div>
        </section>
    );
}
