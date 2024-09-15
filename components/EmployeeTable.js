import {
  BiArrowToLeft,
  BiArrowToRight,
  BiEdit,
  BiSearch,
  BiTrashAlt,
} from "react-icons/bi";
import { useQuery } from "react-query";
import { getUsers } from "../lib/helper";
import { Input } from "./Input";
import { Select } from "./Select";
import { useRouter } from "next/router";
import { Button } from "./Button";
import { useEffect, useRef, useState } from "react";
import { EmployeeDeleteConfirmationModal } from "./DeleteConfirmationModal";
import { EmployeeForm } from "./EmployeeForm";
import { Modal } from "./Modal";

export function EmployeeTable() {
  const router = useRouter();

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["users", router.query],
    queryFn: () => getUsers(router.query),
  });

  const sortOrder = router.query.order;
  const sortBy = router.query.sort_by;
  const page = +router.query.page || 1;
  const search = router.query.search || "";
  const ref = useRef();

  useEffect(() => {
    if (!ref.current) return;
    ref.current.value = search;
  }, [search]);

  const updateQuery = (e, name) => {
    router.push({
      query: { ...router.query, [name]: e.target.value },
      shallow: true,
    });
  };

  const goToPreviousPage = () => {
    router.push({
      query: { ...router.query, page: page - 1 },
      shallow: true,
    });
  };

  const goToNextPage = () => {
    router.push({
      query: { ...router.query, page: page + 1 },
      shallow: true,
    });
  };

  return (
    <>
      <div className="w-full flex flex-col h-[calc(100%-40px)]">
        <div className="flex justify-between">
          <form
            className="flex w-1/3"
            onSubmit={(e) => {
              e.preventDefault();
              router.push({
                query: { ...router.query, search: ref.current.value, page: 1 },
                shallow: true,
              });
            }}
          >
            <Input
              ref={ref}
              placeholder="Search by name, dob, phone or email"
            />
            <button className="h-full aspect-square flex justify-center items-center bg-gray-200">
              <BiSearch />
            </button>
          </form>
          <div className="flex gap-4 w-1/3">
            <Select
              placeholder="Sort by"
              value={sortBy}
              options={[
                { label: "Email", value: "email" },
                { label: "Phone No.", value: "phone" },
                { label: "Date of birth", value: "date" },
                { label: "Name", value: "name" },
              ]}
              onChange={(e) => updateQuery(e, "sort_by")}
            />
            <Select
              placeholder="Sorting order"
              value={+sortOrder}
              options={[
                { label: "Ascending", value: 1 },
                { label: "Descending", value: -1 },
              ]}
              onChange={(e) => updateQuery(e, "order")}
            />
          </div>
        </div>
        <div className="w-full flex-1 overflow-y-scroll mt-4 border border-gray-200 rounded-sm text-sm">
          <table className="w-full relative">
            <thead className="sticky top-0 bg-white">
              <tr>
                <th className="px-2 py-2">
                  <span>Photo</span>
                </th>
                <th className="px-2 py-2">
                  <span>Full Name</span>
                </th>
                <th className="px-2 py-2">
                  <span>Email</span>
                </th>
                <th className="px-2 py-2">
                  <span>Mobile</span>
                </th>
                <th className="px-2 py-2">
                  <span>Date Of Birth</span>
                </th>
                <th className="px-2 py-2">
                  <span>Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="pb-2">
              {data?.users?.map?.((obj) => (
                <Tr {...obj} key={obj._id} />
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex w-full gap-4 mt-4 items-center justify-between">
          <Button
            onClick={goToPreviousPage}
            disabled={page == 1}
            className="flex gap-2 justify-center items-center"
          >
            <BiArrowToLeft />
            <span>Previous page</span>
          </Button>
          <div>
            {page}/{data?.totalPage}
          </div>
          <Button
            disabled={data?.isLastPage}
            onClick={goToNextPage}
            className="flex gap-2 justify-center items-center"
          >
            <span>Next page</span>
            <BiArrowToRight />
          </Button>
        </div>
      </div>
    </>
  );
}

function Tr(employee) {
  const { _id, firstName, lastName, avatar, email, phone, date } = employee;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  return (
    <>
      {showDeleteModal && (
        <EmployeeDeleteConfirmationModal
          onComplete={() => setShowDeleteModal(false)}
          employeeId={_id}
        />
      )}
      {showEditModal && (
        <Modal onBackgroundClick={() => setShowEditModal(false)}>
          <EmployeeForm employee={employee} setShowModal={setShowEditModal} />
        </Modal>
      )}
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
          <div
            className="cursor-pointer"
            onClick={() => setShowEditModal(true)}
          >
            <BiEdit size={25} color={"rgb(34,197,94)"} />
          </div>
          <div
            className="cursor-pointer"
            onClick={() => setShowDeleteModal(true)}
          >
            <BiTrashAlt size={25} color={"rgb(244,63,94)"} />
          </div>
        </td>
      </tr>
    </>
  );
}
