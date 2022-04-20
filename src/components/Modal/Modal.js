import React from "react";
import {CheckIcon, ExclamationIcon} from "@heroicons/react/solid";

export default function Modal({show, onClose, message, type}) {
    return (
        <div style={{display: show ? "block" : "none"}}>
            <div
                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
            >

                <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
                    <div>
                        <div className={"mx-auto flex items-center justify-center h-12 w-12 rounded-full " + (type === 'positive' ? "bg-green-100" : "bg-red-100")}>
                            {
                                type === 'positive' ? (
                                    <CheckIcon className="h-6 w-6 text-green-600" aria-hidden="true" />
                                ) : (
                                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                )
                            }
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <div className="mt-2">
                                <p className="text-sm text-gray-500">
                                    {message}
                                </p>
                            </div>
                        </div>
                        <div className="mt-5 sm:mt-6">
                            <button
                                type="button"
                                className={"inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm " +
                                    (type === "positive" ? " bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500" : " bg-red-600 hover:bg-red-700 focus:ring-red-500")}
                                onClick={onClose}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"/>
        </div>
    );
}