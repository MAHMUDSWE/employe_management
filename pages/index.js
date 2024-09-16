"use client";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { EmployeeTable } from "../components/EmployeeTable";

export default function Home() {
  return (
    <section className="overflow-hidden h-screen">
      <Layout>
        <>
          <h1 className="text-lg font-bold mb-3 text-gray-700">
            EMPLOYEE LIST
          </h1>
          <EmployeeTable></EmployeeTable>
        </>
      </Layout>
    </section>
  );
}
