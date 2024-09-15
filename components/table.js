import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery } from 'react-query';
import { useSelector, useDispatch } from 'react-redux';
import { toggleChangeAction, updateAction, deleteAction } from '../redux/reducer';
import { getUsers } from "../lib/helper";

export default function Table() {
    // Fetching data with react-query
    const { isLoading, isError, data, error } = useQuery('users', getUsers);

    // Loading and error states
    if (isLoading) return <div>Employee is Loading...</div>;
    if (isError) return <div>Error: {error.message || "Something went wrong"}</div>;

    return (
        <table className="min-w-full table-auto">
            <thead>
                <tr className="bg-gray-800">
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Photo</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Full Name</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Email</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Mobile</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Date Of Birth</span>
                    </th>
                    <th className="px-16 py-2">
                        <span className="text-gray-200">Actions</span>
                    </th>
                </tr>
            </thead>
            <tbody className="bg-gray-200">
                {
                    data.map((obj) => <Tr {...obj} key={obj._id} />)
                }
            </tbody>
        </table>
    );
}

function Tr({ _id, name, avatar, email, phone, date }) {
    const visible = useSelector((state) => state.app.client.toggleForm);
    const dispatch = useDispatch();

    // Handling update action
    const onUpdate = () => {
        dispatch(toggleChangeAction(_id));
        if (visible) {
            dispatch(updateAction(_id));
        }
    };

    // Handling delete action
    const onDelete = () => {
        if (!visible) {
            dispatch(deleteAction(_id));
        }
    };

    return (
        <tr className="bg-gray-50 text-center">
            <td className="px-16 py-2 flex flex-row items-center">
                <img 
                    src={avatar || 'https://via.placeholder.com/150'} 
                    alt="Avatar" 
                    className="h-12 w-12 square-full object-cover" 
                />
            </td>
            <td className="px-16 py-2">
                <span>{name || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{email || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{phone || "Unknown"}</span>
            </td>
            <td className="px-16 py-2">
                <span>{date ? new Date(date).toLocaleDateString() : "Unknown"}</span>
            </td>
            <td className="px-16 py-2 flex justify-around gap-5">
                <button className="cursor" onClick={onUpdate}>
                    <BiEdit size={25} color={"rgb(34,197,94)"} />
                </button>
                <button className="cursor" onClick={onDelete}>
                    <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
                </button>
            </td>
        </tr>
    );
}
