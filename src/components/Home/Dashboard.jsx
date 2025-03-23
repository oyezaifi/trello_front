import BoardList from "../../Board/BoardList";
import Sidebar from "./sidebar";

const DashboardPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  return (
    <div>
      <Sidebar onLogout={handleLogout} />
      <div className="w-full  pl-64 ">
        <div className=" pt-10 flex px-100   items-center justify-around mb-8 ">
          <h1 className="text-3xl font-bold text-gray-800">My Boards</h1>
          <div className="text-gray-600">
            Welcome back, <span className="font-semibold">User</span>!
          </div>
        </div>
        <BoardList />
      </div>
    </div>
  );
};

export default DashboardPage;
