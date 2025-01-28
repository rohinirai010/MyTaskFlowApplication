// import React, { useState } from "react";
// import { CheckCircle2, Circle } from "lucide-react";

// // Utility function to calculate the time remaining
// const calculateTimeLeft = (deadline) => {
//   const deadlineDate = new Date(deadline);
//   const now = new Date();
//   const timeDiff = deadlineDate - now;

//   if (timeDiff <= 0) return "Deadline passed";

//   const daysLeft = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
//   const hoursLeft = Math.floor(
//     (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//   );
//   const minutesLeft = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

//   return `${daysLeft} day(s), ${hoursLeft} hour(s), ${minutesLeft} minute(s) left`;
// };

// const TodayTaskEmployeeTable = () => {
//   const [todayTasks, setTodayTasks] = useState([
//     {
//       id: 1,
//       employee: "John Doe",
//       client: "Goldmines",
//       deadline: "2025-02-01T12:00:00", // Example deadline
//       postTasks: [
//         {
//           id: 1,
//           description: "Create social media post about product launch",
//           status: "Pending",
//         },
//         {
//           id: 2,
//           description: "Design infographic for monthly report",
//           status: "Pending",
//         },
//       ],
//       reelsTasks: [
//         {
//           id: 1,
//           description: "Record short product demo video",
//           status: "Pending",
//         },
//       ],
//       mockupTasks: [
//         {
//           id: 1,
//           description: "Create product mockup image",
//           status: "Pending",
//         },
//       ],
//       dailyStatus: "Incomplete",
//     },
//     {
//       id: 2,
//       employee: "Jane Smith",
//       client: "Money Mining",
//       deadline: "2025-01-30T12:00:00", // Example deadline
//       postTasks: [
//         { id: 1, description: "Develop content strategy", status: "Pending" },
//       ],
//       reelsTasks: [
//         {
//           id: 1,
//           description: "Shoot behind-the-scenes reel",
//           status: "Pending",
//         },
//       ],
//       mockupTasks: [
//         { id: 1, description: "Design brand style mockup", status: "Pending" },
//       ],
//       dailyStatus: "Incomplete",
//     },
//   ]);

//   const markTaskDone = (taskId, taskType, subtaskId) => {
//     setTodayTasks((prevTasks) =>
//       prevTasks.map((task) => {
//         if (task.id === taskId) {
//           const updatedTask = { ...task };
//           const targetTasks = updatedTask[`${taskType}Tasks`];

//           const updatedSubtasks = targetTasks.map((subtask) =>
//             subtask.id === subtaskId
//               ? { ...subtask, status: "Completed" }
//               : subtask
//           );

//           updatedTask[`${taskType}Tasks`] = updatedSubtasks;

//           const allPostTasksDone = updatedTask.postTasks.every(
//             (task) => task.status === "Completed"
//           );
//           const allReelsTasksDone = updatedTask.reelsTasks.every(
//             (task) => task.status === "Completed"
//           );
//           const allMockupTasksDone = updatedTask.mockupTasks.every(
//             (task) => task.status === "Completed"
//           );

//           updatedTask.dailyStatus =
//             allPostTasksDone && allReelsTasksDone && allMockupTasksDone
//               ? "Completed"
//               : "Incomplete";

//           return updatedTask;
//         }
//         return task;
//       })
//     );
//   };

//   const renderTaskColumn = (tasks, taskType, taskId) => (
//     <div className="space-y-2">
//       {tasks.map((task) => (
//         <div
//           key={task.id}
//           className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm"
//         >
//           <div className="flex items-center space-x-2">
//             {task.status === "Completed" ? (
//               <CheckCircle2 className="w-5 h-5 text-green-600" />
//             ) : (
//               <Circle className="w-5 h-5 text-gray-400" />
//             )}
//             <span
//               className={`text-sm ${
//                 task.status === "Completed"
//                   ? "line-through text-gray-500"
//                   : "text-gray-800"
//               }`}
//             >
//               {task.description}
//             </span>
//           </div>
//           {task.status !== "Completed" && (
//             <button
//               onClick={() => markTaskDone(taskId, taskType, task.id)}
//               className="px-3 py-1 text-xs font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
//             >
//               Done
//             </button>
//           )}
//         </div>
//       ))}
//     </div>
//   );

//   return (
//     <div className="container mx-auto  py-8">
//       <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
//         Today's Tasks
//       </h2>

//       {/* Mobile/Tablet View */}
//       <div className=" grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
//         {todayTasks.map((task) => (
//           <div
//             key={task.id}
//             className="bg-white shadow-lg border border-gray-200 p-4 rounded-xl"
//           >
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-semibold text-gray-700">
//                 {task.client}
//               </h3>
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-medium ${
//                   task.dailyStatus === "Completed"
//                     ? "bg-green-200 text-green-800"
//                     : "bg-yellow-200 text-yellow-800"
//                 }`}
//               >
//                 {task.dailyStatus}
//               </span>
//             </div>

//             <div className="space-y-4">
//               <div className="mb-2">
//                 <p className="text-sm text-gray-600">
//                   <strong>Deadline:</strong>{" "}
//                   {task.deadline
//                     ? new Date(task.deadline).toLocaleString()
//                     : "No deadline"}
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Time Left:</strong>{" "}
//                   {task.deadline
//                     ? calculateTimeLeft(task.deadline)
//                     : "No deadline"}
//                 </p>
//               </div>
//               <div className="h-[10rem] overflow-y-auto flex flex-col gap-4 mt-6">
//                 <div className="">
//                   <h4 className="font-medium text-gray-600 mb-2">Post Tasks</h4>
//                   {renderTaskColumn(task.postTasks, "post", task.id)}
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-600 mb-2">
//                     Reels Tasks
//                   </h4>
//                   {renderTaskColumn(task.reelsTasks, "reels", task.id)}
//                 </div>
//                 <div>
//                   <h4 className="font-medium text-gray-600 mb-2">
//                     Mockup Tasks
//                   </h4>
//                   {renderTaskColumn(task.mockupTasks, "mockup", task.id)}
//                 </div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Desktop View */}
//       <div className="hidden overflow-x-auto rounded-tl-lg rounded-tr-lg">
//         <table className="w-full table-fixed bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gradient-to-r from-blue-600/60 via-blue-600/50 to-blue-500/90 text-white">
//               <th className="p-4 text-left font-medium">Client</th>
//               <th className="p-4 text-left font-medium">Deadline</th>
//               <th className="p-4 text-left font-medium">Time Left</th>
//               <th className="p-4 text-left font-medium">Post Tasks</th>
//               <th className="p-4 text-left font-medium">Reels Tasks</th>
//               <th className="p-4 text-left font-medium">Mockup Tasks</th>
//               <th className="p-4 text-left font-medium">Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {todayTasks.map((task) => (
//               <tr
//                 key={task.id}
//                 className="hover:bg-gray-100 transition-all duration-300 border-b border-gray-200"
//               >
//                 <td className="p-4 font-medium text-gray-800">{task.client}</td>
//                 <td className="p-4 text-sm text-gray-600">
//                   {task.deadline
//                     ? new Date(task.deadline).toLocaleString()
//                     : "No deadline"}
//                 </td>
//                 <td className="p-4 text-sm text-gray-600">
//                   {task.deadline
//                     ? calculateTimeLeft(task.deadline)
//                     : "No deadline"}
//                 </td>
//                 <td className="p-4 whitespace-nowrap">
//                   {renderTaskColumn(task.postTasks, "post", task.id)}
//                 </td>
//                 <td className="p-4 whitespace-nowrap">
//                   {renderTaskColumn(task.reelsTasks, "reels", task.id)}
//                 </td>
//                 <td className="p-4 whitespace-nowrap">
//                   {renderTaskColumn(task.mockupTasks, "mockup", task.id)}
//                 </td>
//                 <td className="p-4 whitespace-nowrap">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-medium ${
//                       task.dailyStatus === "Completed"
//                         ? "bg-green-200 text-green-800"
//                         : "bg-yellow-200 text-yellow-800"
//                     }`}
//                   >
//                     {task.dailyStatus}
//                   </span>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default TodayTaskEmployeeTable;

import React, { useState, useEffect } from "react";
import { CheckCircle2, Circle, CheckCircle, Clock } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import * as XLSX from "xlsx";

const ConnectedTaskTables = () => {
  // Common data for both tables
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
        "2025-01-22": { posts: false, reels: false, mockups: false },
        "2025-01-23": { posts: false, reels: false, mockups: false },
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
        "2025-01-22": { posts: false, reels: false, mockups: false },
        "2025-01-23": { posts: false, reels: false, mockups: false },
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
        "2025-01-22": { posts: false, reels: false, mockups: false },
        "2025-01-23": { posts: false, reels: false, mockups: false },
      },
    },
  ]);

  const packageRequirements = {
    Starter: {
      duration: 12,
      dailyTasks: { posts: 1, reels: 1, mockups: 1 },
      total: { posts: 12, reels: 5, mockups: 12 },
    },
    Premium: {
      duration: 21,
      dailyTasks: { posts: 1, reels: 1, mockups: 1 },
      total: { posts: 21, reels: 10, mockups: 18 },
    },
    "Super Pro": {
      duration: 30,
      dailyTasks: { posts: 1, reels: 1, mockups: 1 },
      total: { posts: 30, reels: 20, mockups: 30 },
    },
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const now = new Date();
  const endOfDay = new Date();
  endOfDay.setHours(23, 59, 59, 999);

  const [countdown, setCountdown] = useState("");

  function calculateTimeLeft() {
    const timeLeft = endOfDay - new Date();
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // Utility function to handle Excel report generation
  const generateExcelReport = () => {
    const groupedTasks = tasks.reduce((acc, task) => {
      const clientPackageKey = `${task.client} - ${task.package}`;
      if (!acc[clientPackageKey]) {
        acc[clientPackageKey] = [];
      }

      const startDate = new Date(task.startDate);
      const todayDate = new Date(today);
      const dailyCompletionData = [];

      // Loop through the days from start date to today
      for (
        let currentDate = new Date(startDate);
        currentDate <= todayDate;
        currentDate.setDate(currentDate.getDate() + 1)
      ) {
        const formattedDate = format(currentDate, "yyyy-MM-dd");
        const taskCompletion = task.dailyCompletions[formattedDate] || {};

        const isAnyTaskCompleted =
          taskCompletion.posts ||
          taskCompletion.reels ||
          taskCompletion.mockups;

        dailyCompletionData.push({
          Client: task.client,
          Package: task.package,
          Date: formattedDate,
          Posts: taskCompletion.posts ? "Completed" : "Not Completed",
          Reels: taskCompletion.reels ? "Completed" : "Not Completed",
          Mockups: taskCompletion.mockups ? "Completed" : "Not Completed",
          "Completed At": isAnyTaskCompleted
            ? format(new Date(), "HH:mm:ss")
            : "Not Completed",
        });
      }

      acc[clientPackageKey] = acc[clientPackageKey].concat(dailyCompletionData);
      return acc;
    }, {});

    // Create a new workbook
    const wb = XLSX.utils.book_new();

    // Define column widths
    const columnWidths = [
      { wch: 15 }, // Client
      { wch: 12 }, // Package
      { wch: 12 }, // Date
      { wch: 15 }, // Posts
      { wch: 15 }, // Reels
      { wch: 15 }, // Mockups
      { wch: 15 }, // Completed At
    ];

    // For each client-package group, create a sheet
    Object.entries(groupedTasks).forEach(([clientPackage, taskReport]) => {
      const ws = XLSX.utils.json_to_sheet(taskReport, {
        header: [
          "Client",
          "Package",
          "Date",
          "Posts",
          "Reels",
          "Mockups",
          "Completed At",
        ],
      });

      // Apply column widths
      ws["!cols"] = columnWidths;

      // Add this worksheet to the workbook
      XLSX.utils.book_append_sheet(wb, ws, clientPackage);
    });

    // Write the workbook to a file
    XLSX.writeFile(wb, "Daily_Task_Report.xlsx");
  };

  // Calculate total completed subtasks for a task
  const calculateTotalCompletedSubtasks = (task) => {
    let total = 0;
    Object.values(task.dailyCompletions).forEach((day) => {
      if (day.posts) total++;
      if (day.reels) total++;
      if (day.mockups) total++;
    });
    return total;
  };

  // Functions for Today's Task Table
  const handleTaskCompletion = (taskId, taskType) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          const updatedCompletions = {
            ...task.dailyCompletions,
            [today]: {
              ...(task.dailyCompletions[today] || {}),
              [taskType]: !task.dailyCompletions[today]?.[taskType],
            },
          };

          // Calculate new completed subtasks count
          const updatedTask = {
            ...task,
            dailyCompletions: updatedCompletions,
          };

          // Update the completedSubtasks count
          updatedTask.completedSubtasks =
            calculateTotalCompletedSubtasks(updatedTask);

          return updatedTask;
        }
        return task;
      })
    );
  };

  const isTodayCompleted = (task) => {
    const todayCompletions = task.dailyCompletions[today] || {};
    return (
      todayCompletions.posts &&
      todayCompletions.reels &&
      todayCompletions.mockups
    );
  };

  const calculateTotalCompleted = (task, taskType) => {
    return Object.values(task.dailyCompletions).filter((day) => day[taskType])
      .length;
  };

  const isTimeLeftLessThanSixHours = () => {
    const timeLeft = endOfDay - new Date();
    return timeLeft < 6 * 60 * 60 * 1000;
  };

  // Function for Overall Tasks Table
  const handleCompleteTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, status: "Completed" } : task
      )
    );
  };

  // Filter active tasks based on start date
  const getActiveTasks = () => {
    return tasks.filter((task) => {
      const startDate = new Date(task.startDate);
      const daysPassed = differenceInDays(new Date(), startDate);
      const packageDuration = packageRequirements[task.package].duration;
      return daysPassed >= 0 && daysPassed < packageDuration;
    });
  };

  // // Temporary testing: Simulate end of day
  // const getOverdueTasks = () => {
  //   const now = new Date();
  //   now.setHours(23, 59, 59, 999); // Set to end of the day for testing

  //   if (now.getHours() === 23 && now.getMinutes() === 59) {
  //     // Simulate check at the end of the day
  //     return getActiveTasks().filter((task) => {
  //       const todayCompletions = task.dailyCompletions[today] || {};
  //       return (
  //         !todayCompletions.posts ||
  //         !todayCompletions.reels ||
  //         !todayCompletions.mockups
  //       );
  //     });
  //   }
  //   return [];
  // };

  // New function to get overdue tasks
  const getOverdueTasks = () => {
    const now = new Date();
    if (now.getHours() >= 23 && now.getMinutes() >= 59) {
      // End of the day check
      return getActiveTasks().filter((task) => {
        const todayCompletions = task.dailyCompletions[today] || {};
        return (
          !todayCompletions.posts ||
          !todayCompletions.reels ||
          !todayCompletions.mockups
        );
      });
    }
    return []; // Return empty array at the start of the day
  };

  // Get incomplete task types for a task
  const getIncompleteTasks = (task) => {
    const todayCompletions = task.dailyCompletions[today] || {};
    const incomplete = [];
    if (!todayCompletions.posts) incomplete.push("posts");
    if (!todayCompletions.reels) incomplete.push("reels");
    if (!todayCompletions.mockups) incomplete.push("mockups");
    return incomplete;
  };

  return (
    <div className="mb-8">
      {/* Today's Task Table */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 mt-[3rem]">
        Daily Task Completion Record
      </h2>
      <div className="overflow-x-auto rounded-tl-lg rounded-tr-lg mb-4 shadow-md">
        <table className="w-full border-collapse bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-300 text-gray-700 text-sm font-medium">
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Package</th>
              <th className="p-4 text-left">Today's Tasks</th>
              <th className="p-4 text-left">Overall Progress</th>
              <th className="p-4 text-left">Time Left</th>
            </tr>
          </thead>
          <tbody>
            {getActiveTasks().map((task) => {
              const packageInfo = packageRequirements[task.package];
              const todayCompleted = isTodayCompleted(task);
              const countdownText = todayCompleted
                ? "Completed Today's Tasks"
                : countdown;

              return (
                <tr key={task.id} className="border-b border-gray-300 text-sm">
                  <td className="px-4 py-2">{task.client}</td>
                  <td className="px-4 py-2">{task.package}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col space-y-2">
                      {Object.entries(packageInfo.dailyTasks).map(
                        ([type, count]) => (
                          <div
                            key={type}
                            className="flex items-center space-x-4"
                          >
                            <span className="w-20 capitalize">{type}:</span>
                            <button
                              onClick={() =>
                                handleTaskCompletion(task.id, type)
                              }
                              className="flex items-center space-x-2"
                            >
                              {task.dailyCompletions[today]?.[type] ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col space-y-2">
                      {Object.entries(packageInfo.total).map(
                        ([type, total]) => (
                          <div
                            key={type}
                            className="flex items-center space-x-2"
                          >
                            <span className="w-20 capitalize">{type}:</span>
                            <span className="text-sm">
                              {calculateTotalCompleted(task, type)}/{total}
                            </span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 rounded-full h-2"
                                style={{
                                  width: `${
                                    (calculateTotalCompleted(task, type) /
                                      total) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-2 text-sm font-medium ${
                      todayCompleted
                        ? "text-green-500"
                        : isTimeLeftLessThanSixHours()
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {countdownText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="mb-[2rem] flex justify-center sm:justify-end">
        <button
          onClick={generateExcelReport}
          className="bg-blue-500 text-white px-4 py-2 text-sm sm:text-base rounded-md hover:bg-blue-600 cursor-pointer"
        >
          Download Today's Task Report
        </button>
      </div>

      {/* New Overdue Tasks Table */}
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 mt-8">
        Overdue Tasks
      </h2>
      <div
        className={`overflow-x-auto overflow-y-auto rounded-tl-lg rounded-tr-lg shadow-md mb-[2.5rem] ${
          getOverdueTasks().length === 0 ? "h-[6.3rem] overflow-y-hidden" : "h-[20rem]"
        }`}
      >
        <table className="w-full border-collapse bg-white shadow-lg ">
          <thead>
            <tr className="bg-red-100 text-gray-700 text-sm font-medium">
              <th className="p-4 text-left">Client</th>
              <th className="p-4 text-left">Package</th>
              <th className="p-4 text-left">Tasks</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {/* No rows initially, will be populated when the day ends */}
            {getOverdueTasks().length === 0 ? (
              <tr className="text-center">
                <td colSpan="4" className="px-4 py-3 text-gray-500">
                  No overdue tasks for today.
                </td>
              </tr>
            ) : (
              getOverdueTasks().map((task) => {
                const incompleteTasks = getIncompleteTasks(task);
                const isAllCompleted = incompleteTasks.length === 0;

                return (
                  <tr
                    key={`overdue-${task.id}`}
                    className="border-b border-gray-300 text-sm hover:bg-red-50 "
                  >
                    <td className="px-4 py-2">{task.client}</td>
                    <td className="px-4 py-2">{task.package}</td>
                    <td className="px-4 py-2">
                      <div className="flex flex-col space-y-2">
                        {Object.entries(
                          packageRequirements[task.package].dailyTasks
                        ).map(([type, count]) => (
                          <div
                            key={type}
                            className="flex items-center space-x-4"
                          >
                            <span className="w-20 capitalize">{type}:</span>
                            <button
                              onClick={() =>
                                handleTaskCompletion(task.id, type)
                              }
                              className="flex items-center space-x-2"
                            >
                              {task.dailyCompletions[today]?.[type] ? (
                                <CheckCircle2 className="w-5 h-5 text-green-500" />
                              ) : (
                                <Circle className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        isTodayCompleted(task)
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {isTodayCompleted(task) ? "Completed 😊" : "Overdue 😔"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Overall Tasks Table */}
      <h2 className="text-2xl sm:text-3xl font-bold p-2 text-center text-gray-800 mb-3">
        Overall Tasks Record
      </h2>
      <div className="overflow-x-auto rounded-tl-lg rounded-tr-lg shadow-md">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-300  text-gray-800 text-sm">
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Client
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Package
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Start Date
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Time Left
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Progress
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Status
              </th>
              <th className="px-4 py-3 text-left font-medium whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => {
              const packageDuration =
                packageRequirements[task.package].duration;
              const endDate = new Date(task.startDate);
              endDate.setDate(endDate.getDate() + packageDuration);
              const daysLeft = differenceInDays(endDate, new Date());
              const isExpired = daysLeft < 0;
              const progress =
                (task.completedSubtasks / task.totalSubtasks) * 100;

              return (
                <tr
                  key={task.id}
                  style={{
                    backgroundColor:
                      daysLeft < 7 && daysLeft >= 0 ? "#F76A6A" : "",
                    color: daysLeft < 7 && daysLeft >= 0 ? "#ffffff" : "",
                  }}
                  className="hover:bg-blue-100 bg-white  transition-colors duration-200 border-b border-gray-300 text-[14px] shadow-lg"
                >
                  <td className="px-4 py-2 whitespace-nowrap">{task.client}</td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {task.package}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {format(new Date(task.startDate), "MM/dd/yyyy")}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {isExpired ? (
                      <span className="text-red-500">Expired</span>
                    ) : (
                      `${daysLeft} days`
                    )}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <div className="w-full bg-blue-200 rounded-full h-2 ">
                      <div
                        className={`h-2 rounded-full ${
                          progress === 100 ? "bg-green-500" : "bg-blue-500"
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="block text-center text-sm">
                      {task.completedSubtasks}/{task.totalSubtasks}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        task.status === "Pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : "bg-green-200 text-green-800"
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap">
                    {task.status === "Pending" && (
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-4 py-1 rounded-md flex items-center"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCompleteTask(task.id);
                        }}
                      >
                        <CheckCircle className="mr-2 w-4 h-4" />
                        Complete
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConnectedTaskTables;
