import React, {useState, useEffect} from "react";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../components/Dashboard/Dashboard";

const Trading = ({}) => {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const roleFromSession = sessionStorage.getItem("userRole");
    const roleFromLocal = localStorage.getItem("userRole");
    setUserRole(roleFromSession || roleFromLocal || ""); // Default to empty string if no role is found
  }, []);
  return (
    <MainLayout>
      <Dashboard userRole={userRole} />
    </MainLayout>
  );
};

export default Trading;
