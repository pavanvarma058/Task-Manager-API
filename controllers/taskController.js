let tasks = [];

export const getTasks = (req, res) => {
  const completed = req.query.completed;
  if (completed === undefined) {
    return res.json(tasks);
  }
  if (completed !== "true" && completed !== "false") {
    return res
      .status(400)
      .json({ message: "Completed query parameter must be true or false" });
  }
  const isCompleted = completed === "true";
  const filteredTasks = tasks.filter((t) => t.completed === isCompleted);
  res.json(filteredTasks);
};

export const getTaskById = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.status(200).json(task);
};

export const createTask = (req, res) => {
  const { title, description } = req.body;
  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }
  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required" });
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
};

export const updateTask = (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, completed } = req.body;
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (!title || title.trim() === "") {
    return res.status(400).json({ message: "Title is required" });
  }

  if (!description || description.trim() === "") {
    return res.status(400).json({ message: "Description is required" });
  }

  if (completed !== undefined && typeof completed !== "boolean") {
    return res.status(400).json({ message: "Completed must be true or false" });
  }

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (completed !== undefined) task.completed = completed;
  res.json(task);
};

export const deleteTask = (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  tasks = tasks.filter((t) => t.id !== id);
  res.json({ message: "Task deleted" });
};
