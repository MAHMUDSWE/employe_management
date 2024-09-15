import { useForm } from "react-hook-form";
import { Button } from "./Button";
import { Input } from "./Input";
import { axiosClient } from "../lib/axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useQueryClient } from "react-query";

const handleImage = async (file) => {
  const formData = new FormData();
  const options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true,
  };
  try {
    const compressedImage = await imageCompression(file, options);
    formData.append("image", compressedImage);
  } catch (e) {
    formData.append("image", file);
  }
  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
  if (!response.ok) return;
  return (await response.json()).url;
};

export const EmployeeForm = ({ employee }) => {
  const { reset, register, handleSubmit, formState } = useForm();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (employee) reset(employee);
  }, []);

  const submit = async (data) => {
    if (data.avatar instanceof FileList) {
      data.avatar = await handleImage(data.avatar[0]);
    }
    if (employee) {
      try {
        await axiosClient.put(`/api/users/${employee._id}`, data);
        toast("Employee updated successfully!");
        queryClient.refetchQueries({ queryKey: ["users"] });
      } catch (e) {
        toast("Failed to update employee");
      }
    } else {
      try {
        await axiosClient.post("/api/users", data);
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
        {...register("avatar", { required: true })}
        placeholder="Enter profile pic"
        type="file"
        accept="img/*"
      />
      <Button className="w-full" disabled={!formState.isValid}>
        {employee ? "Update" : "Add"}
      </Button>
    </form>
  );
};
