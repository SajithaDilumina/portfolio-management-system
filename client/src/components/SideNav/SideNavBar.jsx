/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa"; // Importing FontAwesome icons
import { useNavigate } from "react-router-dom";

const SideNavBar = () => {
  const [showSideNav, setShowSideNav] = useState(false); // State to toggle side navbar
  const [activeTab, setActiveTab] = useState(""); // State to track the active tab
const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    console.log("Logout clicked");
  };

  useEffect(() => {
    const activeTab = localStorage.getItem("activeTab");
    if (activeTab) {
      setActiveTab(activeTab);
    }
  }, []);

  const handleTabClick = (tabName) => {
    setActiveTab(tabName); 
    localStorage.setItem("activeTab", tabName);
  };

  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className={`inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 ${
          showSideNav ? "hidden" : ""
        }`}
        onClick={() => setShowSideNav(!showSideNav)}
      >
        <span className="sr-only">Open sidebar</span>
        <FaBars className="w-6 h-6" />
      </button>

      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${
          showSideNav ? "" : "-translate-x-full"
        } sm:translate-x-0 bg-opacity-80 bg-customGray backdrop-blur-lg`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            <li>
              <a
                // href="#"
                // onClick={() => handleTabClick("dashboard")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "dashboard" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Dashboard icon */}
                <svg
                  className="w-5 h-5 transition duration-75"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </a>
            </li>

            <li>
              <a
                href="/UserManagement"
                onClick={() => handleTabClick("User Management")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "User Management"
                    ? "bg-[#418ca3] text-white"
                    : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg
                  className="w-5 h-5 transition duration-75"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  {/* Your SVG icon */}
                </svg>
                <span className="ms-3">User Management</span>
              </a>
            </li>
            <li>
              <a
                href="/adminJobs"
                onClick={() => handleTabClick("career")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "career" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg
                  className="w-5 h-5 transition duration-75"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  {/* Your SVG icon */}
                </svg>
                <span className="ms-3">Career Management</span>
              </a>
            </li>
            <li>
              <a
                href="/adminReservations"
                onClick={() => handleTabClick("Reservation Management")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "Reservation Management"
                    ? "bg-[#418ca3] text-white"
                    : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg
                  className="w-5 h-5 transition duration-75"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  {/* Your SVG icon */}
                </svg>
                <span className="ms-3">Reservation Management</span>
              </a>
            </li>

            <li>
              <a
                href="/feedbackManagement"
                onClick={() => handleTabClick("FeedBack Management")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "FeedBack Management" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg className="w-5 h-5 transition duration-75" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                  {/* Your SVG icon */}
                </svg>
                <span className="ms-3">FeedBack Management</span>
              </a>
            </li><li>
              <a
                href="/qualificationManager"
                onClick={() => handleTabClick("Qualification Management")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "Qualification Management" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg className="w-5 h-5 transition duration-75" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                  {/* Your SVG icon */}
                </svg>
                <span className="ms-3">Qualification Management</span>
              </a>
            </li>
            <li>
              <a
                href="/PortfolioAdmin"
                onClick={() => handleTabClick("PortfolioAdmin")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "PortfolioAdmin" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg className="w-5 h-5 transition duration-75" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                  {/* Your SVG icon */}
                             </svg>
                <span className="ms-3">Portfolio Management</span>
              </a>
            </li>
                    <li>
              <a
                href="/MediaManagement"
                onClick={() => handleTabClick("MediaManagement")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "MediaManagement" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg className="w-5 h-5 transition duration-75" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                  {/* Your SVG icon */}
                             </svg>
                <span className="ms-3">Media Management  </span>
              </a>
            </li>
            <li>
              <a
                href="/paymentManagement"
                onClick={() => handleTabClick("paymentManagement")}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group ${
                  activeTab === "paymentManagement" ? "bg-[#418ca3] text-white" : ""
                }`}
              >
                {/* Career icon placeholder */}
                <svg className="w-5 h-5 transition duration-75" aria-hidden="true" fill="currentColor" viewBox="0 0 22 21">
                  {/* Your SVG icon */}
                             </svg>
                <span className="ms-3">Payment Management  </span>
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-customGray group w-full"
              >
                <FaSignOutAlt className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ms-3">Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideNavBar;
