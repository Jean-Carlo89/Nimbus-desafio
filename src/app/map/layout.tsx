import SideBar from "../../components/Sidebar";

type DashboardLayoutProps = {
  children: React.ReactNode;
};
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="  h-[100vh] w-full flex justify-center items-center  ">
      <main className="h-full w-full mx-auto container">
        <div className="flex flex-col  border-pink-200 border-2 container h-[90vh] max-h-[2000px]  mt-5 rounded-[20px]  ">
          <div className="flex h-full justify-center w-full ">
            <div className=" w-[30%]  ">
              <SideBar></SideBar>
            </div>
            <div className=" bg-[#F1F2F5]  flex  ">{children}</div>
          </div>
        </div>
      </main>
    </div>
  );
}
