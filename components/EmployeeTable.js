import { BiEdit, BiTrashAlt } from "react-icons/bi";
import { useQuery, useQueryClient } from "react-query";
import { getUsers } from "../lib/helper";
import Link from "next/link";

export function EmployeeTable() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  if (isLoading) return <div>Employee is Loading...</div>;
  if (isError)
    return <div>Error: {error.message || "Something went wrong"}</div>;

  return (
    <>
      <table className="w-full border border-gray-200 rounded-xl  text-sm table-auto">
        <thead>
          <tr>
            <th className="px-16 py-2">
              <span>Photo</span>
            </th>
            <th className="px-16 py-2">
              <span>Full Name</span>
            </th>
            <th className="px-16 py-2">
              <span>Email</span>
            </th>
            <th className="px-16 py-2">
              <span>Mobile</span>
            </th>
            <th className="px-16 py-2">
              <span>Date Of Birth</span>
            </th>
            <th className="px-16 py-2">
              <span>Actions</span>
            </th>
          </tr>
        </thead>
        <tbody className="pb-2">
          {data?.map?.((obj) => (
            <Tr {...obj} key={obj._id} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function Tr({ _id, firstName, lastName, name, avatar, email, phone, date }) {
  return (
    <tr className="hover:bg-gray-50 text-center border-b border-gray-200">
      <td className="px-2 py-2 flex flex-row items-center">
        <img
          src={avatar || "https://picsum.photos/200"}
          alt="Avatar"
          className="h-12 w-12 square-full object-cover"
        />
      </td>
      <td className="px-2 py-2">
        <span>{firstName + " " + lastName || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <span>{email || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <span>{phone || "Unknown"}</span>
      </td>
      <td className="px-2 py-2">
        <span>{date ? new Date(date).toLocaleDateString() : "Unknown"}</span>
      </td>
      <td className="px-2 py-2 items-center justify-center flex gap-1">
        <Link
          className="cursor-pointer"
          href={`/?employeeId=${_id}&action=edit`}
          shallow
        >
          <BiEdit size={25} color={"rgb(34,197,94)"} />
        </Link>
        <Link
          className="cursor-pointer"
          href={`/?employeeId=${_id}&action=delete`}
        >
          <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
        </Link>
      </td>
    </tr>
  );
}
