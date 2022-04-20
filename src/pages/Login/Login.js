import React, {useEffect, useState} from "react";
import { LockClosedIcon } from '@heroicons/react/solid'
import axios from "axios"
import { useHistory } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory();

    const onSubmit = async () => {
        setLoading(true)
        if (!username) {
            setError(true)
            setErrorMessage('Username Tidak Boleh Kosong!')
            setLoading(false)
        } else if (!password) {
            setError(true)
            setErrorMessage('Password Tidak Boleh Kosong!')
            setLoading(false)
        } else {
            axios.post('https://fakestoreapi.com/auth/login', {
                username: username,
                password: password
            })
                .then(r => {
                    console.log(r)
                    localStorage.setItem("token", r.data.token)
                    history.push("/users");
                    history.go(0)
                })
                .catch(function (error) {
                    setError(true)
                    setErrorMessage(error.response.data)
                    localStorage.clear()
                })
                .finally(() => {
                    setLoading(false)
                })


            // username: "mor_2314",
            // password: "83r5^_"
        }
    }

    const deleteMessageError = () => {
        setError(false)
        setErrorMessage('')
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token !== null) {
            history.push("/users");
            history.go(0)
        }
    },[])

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" action="#" method="POST">
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="username"
                                    autoComplete="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>

                            <button
                                type="button"
                                disabled={loading}
                                onClick={onSubmit}
                                className={"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 " + (loading ? "bg-gray-800" : "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500")}
                            >
                                {
                                    loading ? (
                                        <>
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                <svg role="status" className="inline mr-3 w-4 h-4 text-white animate-spin"
                                                       viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                                        fill="#E5E7EB"/>
                                                    <path
                                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                                        fill="currentColor"/>
                                                </svg>
                                            </span>

                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                                                </span>
                                            Sign in
                                        </>
                                    )
                                }
                            </button>


                        </div>
                    </form>
                </div>
            </div>
            <Modal message={errorMessage} type="negative" onClose={deleteMessageError} show={error}/>
        </>
    )
}
