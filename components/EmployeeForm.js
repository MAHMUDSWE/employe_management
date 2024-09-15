import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { Input } from "./Input";
import { axiosClient } from "../lib/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

export const EmployeeForm = ({ employeeId }) => {
  const { reset, register, handleSubmit, formState } = useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (employeeId) {
        const response = await axiosClient.get(`/api/users/${employeeId}`);
        reset(response.data);
      }
    };

    fetchEmployee();

    return () => {};
  }, [employeeId]);

  const submit = async (employee) => {
    delete employee.avatar;
    if (employeeId) {
      try {
        const response = await axiosClient.put(
          `/api/users/${employeeId}`,
          employee
        );
        toast("Employee updated successfully!");
        queryClient.refetchQueries({ queryKey: ["users"] });
      } catch (e) {
        toast("Failed to update employee");
      }
    } else {
      try {
        const response = await axiosClient.post("/api/users", employee);
        toast("New employee added successfully!");
        reset();
      } catch (e) {
        toast("Failed to add new employee");
      }
    }
  };

  return (
    <form
      className="flex justify-center items-center flex-col gap-3 p-4"
      onSubmit={handleSubmit(submit)}
    >
      <Input
        {...register("firstName", { required: true })}
        placeholder="Enter firstname"
      />
      <Input
        {...register("lastName", { required: true })}
        placeholder="Enter lastname"
      />
      <Input
        {...register("phone", { required: true })}
        placeholder="Enter phone number"
        type="numeric"
      />
      <Input {...register("email")} placeholder="Enter email" />
      <Input
        {...register("date", { required: true })}
        placeholder="Enter date of birth"
        type="date"
      />
      <Input
        {...register("avatar")}
        placeholder="Enter profile pic"
        type="file"
        accept="img/*"
      />
      <Button className="w-full" disabled={!formState.isValid}>
        {employeeId ? "Update" : "Add"}
      </Button>
    </form>
  );
};
