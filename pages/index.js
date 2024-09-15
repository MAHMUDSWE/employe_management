"use client";
import { Layout } from "@/components/Layout";
import { useRouter } from "next/router";
import { EmployeeForm } from "@/components/EmployeeForm";
import { Modal } from "../components/Modal";
import { EmployeeTable } from "../components/EmployeeTable";
import { EmployeeDeleteConfirmationModal } from "../components/DeleteConfirmationModal";

export default function Home() {
  const router = useRouter();
  const employeeId = router.query.employeeId;
  const action = router.query.action;

  return (
    <section className="overflow-hidden h-screen">
      <Layout>
        <>
          <h1 className="text-lg font-bold mb-3 text-gray-700">
            EMPLOYEE LIST
          </h1>
          <EmployeeTable></EmployeeTable>
          {employeeId &&
            (action == "delete" ? (
              <EmployeeDeleteConfirmationModal
                employeeId={employeeId}
                onComplete={() => router.push("/")}
              ></EmployeeDeleteConfirmationModal>
            ) : (
              <Modal
                onBackgroundClick={() =>
                  router.push({ query: {}, shallow: true })
                }
              >
                <EmployeeForm employeeId={employeeId} />
              </Modal>
            ))}
        </>
      </Layout>
    </section>
  );
}
