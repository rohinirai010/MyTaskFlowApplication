import React, { useState,useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Navbar/Sidebar";

const MainLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state
  const [userRole, setUserRole] = useState("");
    
      useEffect(() => {
        const roleFromSession = sessionStorage.getItem("userRole");
        const roleFromLocal = localStorage.getItem("userRole");
        setUserRole(roleFromSession || roleFromLocal || ""); // Default to empty string if no role is found
      }, []);

  return (
    <div className="flex h-screen"> 
      {/* Sidebar  */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        userRole={userRole}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-y-hidden">
      <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          userRole={userRole}
        />
        <div
          className={`flex-1 h-[calc(250vh-4rem)] bg-gray-50  p-2 sm:p-4 transition-all duration-300 overflow-auto ${
            isSidebarOpen
              ? "ml-64" //  sidebar (larger screens)
              : "ml-16 lg:ml-64" // Closed sidebar on smaller screens, open on lg and above
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
