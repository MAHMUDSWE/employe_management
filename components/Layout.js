import Link from "next/link";
import { Button } from "../components/Button";
import { useRouter } from "next/router";

const NavItem = ({ text, url }) => {
  const router = useRouter();
  const pathname = router.pathname;
  return (
    <Link href={url} className="w-full">
      <div
        className={`w-full hover:border-l-black hover:border-l-[2px] text-sm p-3 bg-white border-gray-200 border ${
          pathname == url && "border-l-black border-l-[2px]"
        }`}
      >
        {text}
      </div>
    </Link>
  );
};

export const Layout = ({ children }) => {
  return (
    <>
      <header className="flex items-center justify-between p-3 h-[70px] border-b border-gray-200">
        <h1 className="text-lg text-gray-700 font-bold ml-1">
          EMPLOYEE MANAGEMENT SYSTEM
        </h1>
      </header>
      <main className="flex w-screen h-[calc(100vh-70px)] overflow-hidden">
        <aside className="w-64 border-r p-4 h-full flex gap-3 flex-col items-center border-gray-200">
          <NavItem text="EMPLOYEES" url="/" />
          <NavItem text="ADD NEW" url="/new" />
        </aside>
        <section className="flex-1 p-4 w-full h-full overflow-hidden">
          {children}
        </section>
      </main>
    </>
  );
};
