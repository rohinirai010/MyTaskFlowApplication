import React, { useState } from "react";
import TodayTaskEmployeeTable from "./ConnectedTaskTables";
import EmployeeTasksTable from "./EmployeeTaskTable";

const EmployeeTaskDashboard = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      client: "Goldmines",
      package: "Starter",
      startDate: "2025-01-22",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: 29,
      subtasks: createSubtasks("Starter"),
    },
    {
      id: 2,
      client: "Money Mining",
      package: "Premium",
      startDate: "2025-01-22",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: 49,
      subtasks: createSubtasks("Premium"),
    },
    {
      id: 3,
      client: "Billion Bucks",
      package: "Super Pro",
      startDate: "2025-01-22",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: 80,
      subtasks: createSubtasks("Super Pro"),
    },
  ]);

  const createSubtasks = (packageType) => {
    let subtasks = [];
    switch (packageType) {
      case "Starter":
        subtasks = [
          ...Array(12).fill().map((_, i) => ({ id: i + 1, name: `Post ${i + 1}` })),
          ...Array(5).fill().map((_, i) => ({ id: 13 + i, name: `Reel ${i + 1}` })),
          ...Array(12).fill().map((_, i) => ({ id: 18 + i, name: `Mockup Image ${i + 1}` })),
        ];
        break;
      case "Premium":
        subtasks = [
          ...Array(21).fill().map((_, i) => ({ id: i + 1, name: `Post ${i + 1}` })),
          ...Array(10).fill().map((_, i) => ({ id: 22 + i, name: `Reel ${i + 1}` })),
          ...Array(18).fill().map((_, i) => ({ id: 32 + i, name: `Mockup Image ${i + 1}` })),
        ];
        break;
      case "Super Pro":
        subtasks = [
          ...Array(30).fill().map((_, i) => ({ id: i + 1, name: `Post ${i + 1}` })),
          ...Array(20).fill().map((_, i) => ({ id: 31 + i, name: `Reel ${i + 1}` })),
          ...Array(30).fill().map((_, i) => ({ id: 51 + i, name: `Mockup Image ${i + 1}` })),
        ];
        break;
      default:
        subtasks = [];
    }
    return subtasks;
  };

  return (
    <div className="employee-task-dashboard">
      <h1 className="text-center text-2xl font-bold">Employee Task Dashboard</h1>
      <EmployeeTasksTable tasks={tasks} setTasks={setTasks} />
      <TodayTaskEmployeeTable tasks={tasks} />
    </div>
  );
};

export default EmployeeTaskDashboard;
