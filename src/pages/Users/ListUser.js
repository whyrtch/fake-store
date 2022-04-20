/* This example requires Tailwind CSS v2.0+ */
import React, {useEffect, useState} from 'react'
import axios from "axios";
import Loading from "../../components/Loading/Loading";
import {useHistory} from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";

export default function ListUser() {
    const history = useHistory();
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)

    const perPage = 3;
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [sliceData, setSliceData] = useState([])

    const getData = () => {
        setLoading(true)
        axios.get('https://fakestoreapi.com/users')
            .then(r => {
                console.log('data',r)
                setData(r.data)
                setCurrentPage(0)
                setSliceData(data.slice(0, perPage))
                setTotalPage(Math.ceil(data.length / perPage))
            })
            .catch(function (error) {
                setData([])
            }).finally(() => {
                setLoading(false)
            })
    }

    const onDeleteUser = (id) => {
        setLoading(true)
        axios.delete(`https://fakestoreapi.com/users/${id}`)
            .then(r => {
                console.debug('delete success',r)
                const newData = data.filter(d => d.id !== id);
                setData(newData)
            })
            .catch(function (error) {
                setData([])
            }).finally(() => {
                setLoading(false)
            })
    }

    const onEditUser = (data) => {
        history.push({
            pathname: "/edit-user",
            state: data,
        });
        history.go(0)
    }

    const onPageChange = (page) => {
        const offset = page * perPage
        setSliceData(data.slice(offset, offset + perPage))
    }

    const onNextPage = () => {
        const page = currentPage + 1;
        onPageChange(page)
        setCurrentPage(page)
    }

    const onPrevPage = () => {
        const page = currentPage - 1;
        onPageChange(page)
        setCurrentPage(page)
    }

    useEffect(() => {
        getData()
    },[data.length === 0])

    return (
        <div className="px-4 sm:px-6 lg:px-8 sm:py-6 ">
            {loading && <Loading/>}
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Users</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all the users in your account including their name, email and etc.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                        onClick={() => {
                            history.push("/add-user");
                            history.go(0)
                        }}
                        type="button"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add user
                    </button>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                        id
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        username
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Name
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Email
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                        Address
                                    </th>
                                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                                </thead>
                                <tbody className="bg-white">
                                {sliceData.length > 0 && sliceData.map((person, personIdx) => (
                                    <tr key={person.email} className={personIdx % 2 === 0 ? undefined : 'bg-gray-50'}>
                                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{person.id}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.username}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                            {person.name.firstname + ' ' + person.name.lastname}
                                        </td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.phone}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.address.city + ', ' + person.address.street + ' no ' + person.address.number}</td>
                                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button onClick={() => onEditUser(person)} className="text-indigo-600 hover:text-indigo-900 mr-6">
                                                Edit
                                            </button>
                                            <button onClick={() => onDeleteUser(person.id)} className="text-red-600 hover:text-red-900">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <Pagination
                    total={data.length} perPage={perPage}
                    totalPage={totalPage}
                    totalElement={sliceData.length}
                    currentPage={currentPage}
                    nextPage={onNextPage}
                    prevPage={onPrevPage}
                />
            </div>
        </div>
    )
}
