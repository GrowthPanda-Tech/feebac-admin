import { useState, useEffect } from 'react';
import defaultUser from '../../assets/defaultUser.png';
import makeRequest from '../../utils/makeRequest';

export default function User() {
    const [userList, setUserList] = useState([]);

    const fetchAllUser = async () => {
        const response = await makeRequest('site-admin/get-all-user', 'GET');
        setUserList(response.data);
    }
    useEffect(() => {
        fetchAllUser();
    }, []);

    const headers = ["No.", "User ID", "Location"];
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <div className='p-16'>
            <table className="table-auto w-full bg-white rounded-xl mt-8 text-center">
                <thead className="text-xl">
                    <tr>
                        {
                            headers.map((header, index) => (
                                <th key={index} className="p-6"> {header} </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody className="text-lg">
                    {
                        userList.map((user, index) => (
                            <tr key={index}>
                                <td className="p-6">
                                    {index + 1}
                                </td>
                                <td className="p-6">
                                    <div className='flex items-center'>
                                        <img className='w-8 h-8 rounded-full mr-6' src={user.profile_pic == null ? defaultUser : baseUrl + "" + user.profile_pic} />
                                        {user.name}
                                    </div>
                                </td>
                                <td className="p-6">
                                    {user.location == null ? "" : user.location.replace(","," -")}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}
