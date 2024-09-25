import React, { useState } from 'react';
import list from "./todoList";
import { FaEdit, FaTrash, FaCheck } from 'react-icons/fa';

function Todo() {
  const [tasks, setTask] = useState(list);
  const [isEditing, setIsEditing] = useState(false); // Flag for edit mode
  const [currentTask, setCurrentTask] = useState(null); // Task being edited
  const [formData, setFormData] = useState({
    title: '',
    status: 'pending',
    priority: 'Not Set yet',
  }); // Form data

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value }); 
  };

  // Handle submit for adding or editing tasks
  function todoSubmit(e) {
    e.preventDefault();
    
    let value = formData.title; // Use formData to get input value
    let temp = [...tasks];

    // If editing, update the task
    if (isEditing) {
      const updatedTasks = temp.map(task =>
        task.id === currentTask.id ? { ...task, title: value } : task
      );
      setTask(updatedTasks);
      setIsEditing(false);
      setCurrentTask(null);
      setFormData({ 
        title: '', 
        status: 'pending', 
        priority: 'Not Set yet' 
      });
    } else {
      // Add new task
      let lastEL = tasks[tasks.length - 1];
      if (value !== "") {
        temp.push({
          id: lastEL ? lastEL.id + 1 : 1, // Ensure task has a valid ID
          title: value,
          status: "pending",
          priority: "Not Set yet"
        });
        setTask(temp);
      } else {
        alert("Enter your task name!");
      }
    }
  }

  // Handle the edit button click
  const handleEditClick = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setFormData({
      title: task.title,
      status: task.status,
      priority: task.priority,
    });
  };

  return (
    <>
      <div>
        <div className="columns-1 max-w-2xl">
          <div className="relative overflow-x-auto rounded">
            <h2 className="text-left bg-gray-600 text-2xl text-pink-100 p-4">Todo List</h2>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Task Name</th>
                  <th scope="col" className="px-6 py-3">Status</th>
                  <th scope="col" className="px-6 py-3">Priority</th>
                  <th scope="col" className="px-6 py-3">Options</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => (
                  <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th scope="row" className={`px-6 py-4 font-medium whitespace-nowrap dark:text-white ${task.status === 'Complete' ? 'line-through text-gray-400' : 'text-gray-900'}`}>
                      <input type="checkbox" 
                      className='mr-2' 
                      defaultChecked={task.status === "Complete" ? true : false}
                      value=""/>
                      {task.title}
                    </th>
                    <td className="px-6 py-4">{task.status}</td>
                    <td className="px-6 py-4">{task.priority}</td>
                    <td className="px-6 py-4">
                      <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => handleEditClick(task)}>
                        <FaEdit />
                      </button>
                      <button className="text-green-500 hover:text-green-700 mr-2" onClick={()=>{
                        const completeTask = tasks.map(i=>{
                            if(i.id === task.id){
                                return {...i, status: "Complete"};
                            }
                            
                            return i;
                        });
                        setTask(completeTask)
                        
                      }}>
                        <FaCheck />
                      </button>
                      <button className="text-red-500 hover:text-red-700" 
                      onClick={()=>{
                        const updatedTasks = tasks.filter(t => t.id !== task.id);
                        setTask(updatedTasks);
                      }}>
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Form */}
          <form onSubmit={todoSubmit} className="mb-4 font-mono w-full mt-4 bg-gray-500 rounded flex justify-between">
            <input
              type="text"
              id="todoInput"
              name="title" // The name should match the key in formData
              value={formData.title} // Controlled input
              onChange={handleInputChange} // Update state on change
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter your Task"
            />
            <button
              type="submit"
              className="py-2.5 m-2 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            >
              {isEditing ? "Update" : "Enter"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Todo;
