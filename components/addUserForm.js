'use client'; // Client-side rendering
import Success from "./success";
import Bug from "./bug";
import { useMutation } from "react-query";
import { useState } from "react";

export default function AddUserForm({ formData, setFormData }) {
    const [avatarFile, setAvatarFile] = useState(null);

    const addMutation = useMutation(async (formDataModel) => {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formDataModel,
        });

        if (!response.ok) throw new Error('Failed to upload');
        return response.json();
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Object.keys(formData).length === 0) return console.log("Don't have Form Data");
        let { firstname, lastname, email, phone, date } = formData;

        const formDataModel = new FormData();
        formDataModel.append("name", `${firstname} ${lastname}`);
        formDataModel.append("email", email);
        formDataModel.append("phone", phone);
        formDataModel.append("date", date);

        if (avatarFile) {
            formDataModel.append("avatar", avatarFile); // Attach the file
        }

        addMutation.mutate(formDataModel);
    };

    const handleFileChange = (e) => {
        setAvatarFile(e.target.files[0]); // Store selected file
    };

    if (addMutation.isLoading) return <div>Loading!</div>;
    if (addMutation.isError) return <Bug message={addMutation.error.message}></Bug>;
    if (addMutation.isSuccess) return <Success message={"Added Successfully"}></Success>;

    return (
        <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="input-type">
                <input type="text" onChange={setFormData} name="firstname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="FirstName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="lastname" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="LastName" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="email" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Email" />
            </div>
            <div className="input-type">
                <input type="text" onChange={setFormData} name="phone" className="border w-full px-5 py-3 focus:outline-none rounded-md" placeholder="Mobile" />
            </div>
            <div className="input-type">
                <input type="date" onChange={setFormData} name="date" className="border px-5 py-3 focus:outline-none rounded-md" placeholder="Date" />
            </div>
            <div className="input-type">
                <input type="file" onChange={handleFileChange} className="border w-full px-5 py-3 focus:outline-none rounded-md" />
            </div>
            
            <button type="submit" className="flex justify-center text-md w-2/6 bg-green-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
                Add
            </button>
        </form>
    );
}
