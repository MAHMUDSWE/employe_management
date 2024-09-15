import { EmployeeForm } from "@/components/EmployeeForm";

import { Layout } from "../components/Layout";
export default () => {
  return (
    <div>
      <Layout>
        <h1 className="text-lg text-gray-700 font-bold">ADD NEW EMPLOYEE</h1>
        <div className="w-full h-full justify-center items-center px-20 py-10 ">
          <EmployeeForm />
        </div>
      </Layout>
    </div>
  );
};
