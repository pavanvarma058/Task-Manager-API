import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const { completed } = req.query;
    if (completed === undefined) {
      const tasks = await Task.find();
      return res.status(200).json(tasks);
    }
    if (completed !== "true" && completed !== "false") {
      return res
        .status(400)
        .json({ message: "Completed query parameter must be true or false" });
    }
    const isCompleted = completed === "true";
    const tasks = await Task.find({ completed: isCompleted });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching tasks" });
  }
};

export const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: "Error fetching task" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = await Task.create({
      title,
      description,
    });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: "Error creating task" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const task = await Task.findById(req.params.id);

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
      return res
        .status(400)
        .json({ message: "Completed must be true or false" });
    }

    if (title !== undefined) task.title = title;
    if (description !== undefined) task.description = description;
    if (completed !== undefined) task.completed = completed;

    const updatedTask = await task.save();
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Error updating task" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleteing task" });
  }
};
