import React, { useState, useEffect } from "react";
import { Clock, CheckSquare, AlertTriangle, List } from "lucide-react";
import DashboardTable from "./DashboardTable";
import ConnectedTaskTables from "./ConnectedTaskTables";

// TaskCard Component
const TaskCard = ({ icon, title, count, color }) => (
  <div
    className={`p-4 bg-white rounded-xl shadow-md flex items-center space-x-4 ${color}`}
  >
    {icon}
    <div>
      <h3 className="text-gray-500">{title}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  </div>
);

// Dashboard Component
const Dashboard = () => {
  const [userRole, setUserRole] = useState("");
  const [username, setUsername] = useState("");
  const today = new Date().toISOString().split('T')[0];
  
  const [tasks, setTasks] = useState([
    {
      id: 1,
      client: "Goldmines",
      package: "Starter",
      startDate: "2025-01-22",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: 29,
      dailyCompletions: {
        [today]: { posts: false, reels: false, mockups: false },
      },
    },
    {
      id: 2,
      client: "Money Mining",
      package: "Premium",
      startDate: "2025-01-22",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: 49,
      dailyCompletions: {
        [today]: { posts: false, reels: false, mockups: false },
      },
    },
    {
      id: 3,
      client: "Billion Bucks",
      package: "Super Pro",
      startDate: "2025-01-22",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: 80,
      dailyCompletions: {
        [today]: { posts: false, reels: false, mockups: false },
      },
    },
  ]);

  const [taskMetrics, setTaskMetrics] = useState({
    totalTasks: 0,
    totalSubtasks: 0,
    pendingSubtasks: 0,  // Changed to track pending subtasks
    completedSubtasks: 0,  // Changed to track completed subtasks
    dailyTasksTotal: 0,
    dailyTasksCompleted: 0
  });

  useEffect(() => {
    const roleFromSession = sessionStorage.getItem("userRole");
    const roleFromLocal = localStorage.getItem("userRole");
    setUserRole(roleFromSession || roleFromLocal || "");

    const usernameFromSession = sessionStorage.getItem("username");
    const usernameFromLocal = localStorage.getItem("username");
    setUsername(usernameFromSession || usernameFromLocal || "");
  }, []);

  // Handler for task completion
  const handleTaskCompletion = (taskId, taskType) => {
    setTasks(prevTasks => {
      const updatedTasks = prevTasks.map(task => {
        if (task.id === taskId) {
          const currentValue = task.dailyCompletions[today]?.[taskType] || false;
          const updatedCompletions = {
            ...task.dailyCompletions,
            [today]: {
              ...(task.dailyCompletions[today] || {}),
              [taskType]: !currentValue,
            },
          };
          
          // Update completedSubtasks count
          const completedCount = Object.values(updatedCompletions[today]).filter(Boolean).length;
          
          return {
            ...task,
            dailyCompletions: updatedCompletions,
            completedSubtasks: completedCount,
            status: completedCount === task.totalSubtasks ? "Completed" : "Pending"
          };
        }
        return task;
      });
      updateMetrics(updatedTasks);
      return updatedTasks;
    });
  };

  // Updated metrics calculation
  const updateMetrics = (currentTasks) => {
    let dailyTasksTotal = 0;
    let dailyTasksCompleted = 0;
    let totalSubtasks = 0;
    let completedSubtasks = 0;

    currentTasks.forEach(task => {
      // Calculate total subtasks across all clients
      totalSubtasks += task.totalSubtasks;
      completedSubtasks += task.completedSubtasks;

      const todayTasks = task.dailyCompletions[today];
      if (todayTasks) {
        dailyTasksTotal += Object.keys(todayTasks).length;
        dailyTasksCompleted += Object.values(todayTasks).filter(Boolean).length;
      }
    });

    const pendingSubtasks = totalSubtasks - completedSubtasks;

    setTaskMetrics({
      totalTasks: currentTasks.length,
      totalSubtasks,
      pendingSubtasks,
      completedSubtasks,
      dailyTasksTotal,
      dailyTasksCompleted
    });
  };

  useEffect(() => {
    updateMetrics(tasks);
  }, []);

  const calculatePendingDailyTasks = () => {
    return taskMetrics.dailyTasksTotal - taskMetrics.dailyTasksCompleted;
  };

  return (
    <div className="py-2 sm:py-6 px-2 sm:px-4 min-h-screen bg-blue-50 rounded-xl w-full">
      {username && (
        <h1 className="text-2xl sm:text-3xl font-bold sm:font-medium px-3 sm:px-0 text-center sm:text-left text-gray-800 mb-6">
          Welcome, {username}!
        </h1>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-[1.5rem] sm:mb-[3rem]">
        {userRole === "admin" ? (
          <>
            <TaskCard
              icon={<List className="text-blue-500" />}
              title="Total Clients"
              count={taskMetrics.totalTasks}
              color="border-l-4 border-blue-500"
            />
            <TaskCard
              icon={<List className="text-purple-500" />}
              title="Total Tasks"
              count={taskMetrics.totalSubtasks}
              color="border-l-4 border-purple-500"
            />
            <TaskCard
              icon={<AlertTriangle className="text-yellow-500" />}
              title="Pending Tasks"
              count={taskMetrics.pendingSubtasks}
              color="border-l-4 border-yellow-500"
            />
            <TaskCard
              icon={<CheckSquare className="text-green-500" />}
              title="Completed Tasks"
              count={taskMetrics.completedSubtasks}
              color="border-l-4 border-green-500"
            />
          </>
        ) : userRole === "employee" ? (
          <>
            <TaskCard
              icon={<List className="text-blue-500" />}
              title="Today's Total Tasks"
              count={taskMetrics.dailyTasksTotal}
              color="border-l-4 border-blue-500"
            />
            <TaskCard
              icon={<AlertTriangle className="text-yellow-500" />}
              title="Today's Pending Tasks"
              count={calculatePendingDailyTasks()}
              color="border-l-4 border-yellow-500"
            />
            <TaskCard
              icon={<CheckSquare className="text-green-500" />}
              title="Today's Completed Tasks"
              count={taskMetrics.dailyTasksCompleted}
              color="border-l-4 border-green-500"
            />
            <div className="p-4 bg-white rounded-xl shadow-md flex items-center space-x-4 border-l-4 border-red-400">
              <Clock className="text-red-400" />
              <div>
                <h3 className="text-gray-500">Time Left Today</h3>
                <p className="text-2xl font-bold">{new Date().toLocaleTimeString()}</p>
                <p className="text-sm text-gray-400">
                  Pending Tasks: {calculatePendingDailyTasks()}
                </p>
              </div>
            </div>
          </>
        ) : null}
      </div>

      {userRole === "admin" ? (
        <DashboardTable />
      ) : userRole === "employee" ? (
        <ConnectedTaskTables 
          tasks={tasks}
          onTaskCompletion={handleTaskCompletion}
        />
      ) : null}
    </div>
  );
};

export default Dashboard;