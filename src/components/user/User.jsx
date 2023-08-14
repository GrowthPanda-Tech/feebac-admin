import useStateEffect from '../../hooks/useStateEffect';
import defaultUser from '../../assets/defaultUser.png';

export default function User() {
    const userList = useStateEffect('array', 'site-admin/get-all-user', 'GET');

    const headers = ["No.", "User", "Location"];
    const baseUrl = import.meta.env.VITE_BACKEND_URL;

    return (
        <table className="table-fixed w-full bg-white rounded-xl text-center">
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
    );
}
