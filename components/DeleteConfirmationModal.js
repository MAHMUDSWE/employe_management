import { useMutation, useQueryClient } from "react-query";
import { axiosClient } from "../lib/axios";
import { ConfirmationModal } from "./ConfirmationModal";

export const EmployeeDeleteConfirmationModal = ({ employeeId, onComplete }) => {
  const deleteEmployee = async () => {
    await axiosClient.delete(`/api/users/${employeeId}`);
  };

  const queryClient = useQueryClient();
  const { mutate: handleDelete } = useMutation({
    mutationKey: ["users"],
    mutationFn: deleteEmployee,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["users"] });
      onComplete(true);
    },
    onError: () => onComplete(false),
  });

  return (
    <ConfirmationModal
      title={"Are you sure?"}
      subtitle={"You want to delete this employee?"}
      confirmText="Yes"
      onConfirm={handleDelete}
      onCancel={onComplete}
    ></ConfirmationModal>
  );
};
