import React, { useState } from "react";
import { PlusCircle, Trash2, X, Edit2 } from "lucide-react";
import { format, differenceInDays } from "date-fns";

const Card = ({ children }) => (
  <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
    {children}
  </div>
);

const CardHeader = ({ children }) => (
  <div className="flex items-center justify-between mb-4">{children}</div>
);

const CardTitle = ({ children }) => (
  <h2 className="text-2xl font-bold">{children}</h2>
);

const CardContent = ({ children }) => <div>{children}</div>;

const Button = ({ variant, children, ...props }) => (
  <button
    className={`px-2 sm:px-6 py-2 rounded-md text-xs font-medium flex items-center cursor-pointer ${
      variant === "danger"
        ? "bg-red-500 hover:bg-red-600 text-white"
        : "bg-blue-500 hover:bg-blue-600 text-white"
    }`}
    {...props}
  >
    {children}
  </button>
);

const Input = (props) => (
  <input
    className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full"
    {...props}
  />
);

const Label = ({ htmlFor, children }) => (
  <label htmlFor={htmlFor} className="block mb-1">
    {children}
  </label>
);

const Select = ({ children, ...props }) => (
  <div className="relative">
    <select
      className="bg-white border border-gray-300 rounded-md px-4 py-2 w-full appearance-none"
      {...props}
    >
      {children}
    </select>
  </div>
);

const DashboardTable = () => {
  const packageDetails = {
    Starter: { days: 12, posts: 12, reels: 5, mockups: 12 },
    Premium: { days: 21, posts: 21, reels: 10, mockups: 18 },
    "Super Pro": { days: 30, posts: 30, reels: 20, mockups: 30 },
  };

  const calculateTotalSubtasks = (packageType) => {
    const details = packageDetails[packageType];
    return details.posts + details.reels + details.mockups;
  };

  const [tasks, setTasks] = useState([
    {
      assignee: "prem",
      client: "Goldmines",
      package: "Starter",
      startDate: "22-01-2025",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: calculateTotalSubtasks("Starter")
    },
    {
      assignee: "prem",
      client: "Money Mining",
      package: "Premium",
      startDate: "22-01-2025",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: calculateTotalSubtasks("Premium")
    },
    {
      assignee: "prem",
      client: "Billion Bucks",
      package: "Super Pro",
      startDate: "22-01-2025",
      status: "Pending",
      completedSubtasks: 0,
      totalSubtasks: calculateTotalSubtasks("Super Pro")
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    assignee: "",
    client: "",
    package: "",
    startDate: "",
    status: "Pending",
    completedSubtasks: 0
  });

  const [editingIndex, setEditingIndex] = useState(null);

  const handleAddTask = () => {
    const totalSubtasks = calculateTotalSubtasks(newTask.package);
    const taskWithTotals = {
      ...newTask,
      totalSubtasks,
      completedSubtasks: 0,
      status: "Pending"
    };
    setTasks([...tasks, taskWithTotals]);
    setNewTask({
      assignee: "",
      client: "",
      package: "",
      startDate: "",
      status: "Pending",
      completedSubtasks: 0
    });
    setShowModal(false);
  };

  const handleEditTask = () => {
    const totalSubtasks = calculateTotalSubtasks(newTask.package);
    const taskWithTotals = {
      ...newTask,
      totalSubtasks
    };
    const updatedTasks = [...tasks];
    updatedTasks[editingIndex] = taskWithTotals;
    setTasks(updatedTasks);
    setNewTask({
      assignee: "",
      client: "",
      package: "",
      startDate: "",
      status: "Pending",
      completedSubtasks: 0
    });
    setShowModal(false);
    setEditingIndex(null);
  };

  const handleRemoveTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditButton = (index) => {
    setEditingIndex(index);
    setNewTask(tasks[index]);
    setShowModal(true);
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const formatToDateInput = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const formatFromDateInput = (dateString) => {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
  };

  const calculateDaysLeft = (startDate, packageType) => {
    const [day, month, year] = startDate.split("-").map(num => parseInt(num, 10));
    const start = new Date(year, month - 1, day);
    const duration = packageDetails[packageType]?.days || 0;
    const end = new Date(start);
    end.setDate(start.getDate() + duration);
    return differenceInDays(end, new Date());
  };

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Tasks</CardTitle>
        <Button onClick={() => setShowModal(true)}>
          <PlusCircle className="mr-1 w-4 sm:w-5 h-4 sm:h-5" />
          Add Client
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto rounded-tl-lg rounded-tr-lg">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-gray-700">
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Assignee
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Client
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Package
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Start Date
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Time Left
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Progress
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Status
                </th>
                <th className="px-4 py-3 text-left bg-gray-100 border-b-2 border-gray-300 font-medium whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {tasks.map((task, index) => {
                const daysLeft = calculateDaysLeft(task.startDate, task.package);
                const isExpired = daysLeft < 0;
                const progress = (task.completedSubtasks / task.totalSubtasks) * 100;
                const rowClass = daysLeft <= 7 && daysLeft >= 0 ? "bg-red-100" : "";

                return (
                  <tr
                    key={index}
                    className={`hover:bg-blue-100 transition-colors duration-200 text-sm text-gray-700 ${rowClass}`}
                  >
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {task.assignee}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {task.client}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {task.package}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {formatDate(task.startDate)}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      {isExpired ? (
                        <span className="text-red-500">Expired</span>
                      ) : (
                        `${daysLeft} days`
                      )}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      <div className="w-full bg-blue-200 rounded-full h-2">
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
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
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
                    <td className="px-4 py-2 border-b border-gray-300 whitespace-nowrap">
                      <button
                        onClick={() => handleEditButton(index)}
                        className="text-blue-500 hover:text-blue-600 cursor-pointer"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => handleRemoveTask(index)}
                        className="text-red-500 hover:text-red-600 cursor-pointer ml-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] transition-all duration-300"
            onClick={() => setShowModal(false)}
          />
          <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-8 m-[1.5rem] sm:m-0 w-full max-w-md shadow-2xl transform transition-all animate-in fade-in-0 zoom-in-95 duration-200 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                {editingIndex !== null ? "Edit Task" : "Add New Client"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-full p-1 hover:bg-gray-100 transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (editingIndex !== null) {
                  handleEditTask();
                } else {
                  handleAddTask();
                }
              }}
              className="space-y-2"
            >
              <div className="space-y-2">
                <Label htmlFor="assignee" className="text-sm font-semibold text-gray-700">
                  Assignee
                </Label>
                <Input
                  id="assignee"
                  value={newTask.assignee}
                  onChange={(e) =>
                    setNewTask({ ...newTask, assignee: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter assignee name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client" className="text-sm font-semibold text-gray-700">
                  Client
                </Label>
                <Input
                  id="client"
                  value={newTask.client}
                  onChange={(e) =>
                    setNewTask({ ...newTask, client: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter client name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="package"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Package
                </Label>
                <Select
                  id="package"
                  value={newTask.package}
                  onChange={(e) =>
                    setNewTask({ ...newTask, package: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  required
                >
                  <option value="">Select a package</option>
                  <option value="Starter">Starter</option>
                  <option value="Premium">Premium</option>
                  <option value="Super Pro">Super Pro</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="startDate"
                  className="text-sm font-semibold text-gray-700 "
                >
                  Start Date
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formatToDateInput(newTask.startDate)} // Format to YYYY-MM-DD for the input
                  onChange={(e) =>
                    setNewTask({
                      ...newTask,
                      startDate: formatFromDateInput(e.target.value),
                    })
                  } // Convert back to DD-MM-YYYY when changing
                  className="w-full px-4 py-2 border border-gray-200  rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent  transition-all duration-200"
                  required
                />
              </div>
              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700  bg-gray-100  hover:bg-gray-200  rounded-lg transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 cursor-pointer"
                >
                  {editingIndex !== null ? "Save Changes" : "Save Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DashboardTable;
