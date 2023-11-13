"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import PlusIcon from "@/public/icons/PlusIcon";
import ListIcon from "@/public/icons/ListIcon";
import ChevronIcon from "@/public/icons/ChevronIcon";
import DotIcon from "@/public/icons/DotIcon";
import CheckCircleIcon from "@/public/icons/CheckCircleIcon";
import styles from "./styles.module.css";
import { getAllTodos, setTodo, deleteTodo, updateTodo } from "../APIs/todo";
import Loading from "../components/Loading/Loading";
import WithAuth from "../hocs/withAuth";

const Todo = () => {
  const [task, setTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [showTask, setShowTask] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await getAllTodos();
        const newArray = res?.data.map(
          ({ _id, text, createdAt, completed }) => ({
            _id,
            text,
            createdAt,
            completed,
          })
        );
        setTasks(newArray);
        setIsLoading(false);
      } catch (e) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!task) {
      toast.error("please add your task");
      return;
    }
    const sendObj = {
      text: task,
      completed: false,
    };
    try {
      const res = await setTodo(sendObj);
      const { _id, text, createdAt, completed } = res?.data;
      setTasks((prevState) => [
        ...prevState,
        {
          _id,
          text,
          createdAt,
          completed,
        },
      ]);
    } catch (err) {}

    setTask("");
  };

  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id);
      if (res?.data) {
        setTasks((prevState) => prevState.filter((task) => task._id !== id));
      }
    } catch (err) {}
  };

  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  const updateTodoList = async (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const foundTask = tasks.find((task) => task._id === id);
    const status = !foundTask?.completed;

    const updatedData = {
      completed: status,
    };
    try {
      const res = await updateTodo(id, updatedData);
    } catch (err) {}
  };

  return (
    <>
      <div className="home">
        <div className="home_container">
          <img
            className={styles.image}
            src="/profile.jpg"
            alt="Person"
            loading="lazy"
          />
          <form className={styles.form} onSubmit={handleSubmit}>
            <input
              className={styles.input}
              type="text"
              value={task}
              placeholder="Add new Task"
              onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" className={styles.plusBtn}>
              <PlusIcon />
            </button>
          </form>
          <div className={styles.todo}>
            <div className={styles.heading}>
              <div>
                <ListIcon height="2rem" width="1.5rem" />
                <h3>Your todos</h3>
              </div>
              <ChevronIcon height="1rem" width="1rem" />
            </div>
            {!tasks.length && !isLoading ? (
              <div className={styles.noTask}>No task today</div>
            ) : (
              <div className={styles.tasks}>
                {isLoading ? (
                  <Loading />
                ) : (
                  tasks.map((t, i) => {
                    return (
                      <div key={i}>
                        <div className={styles.task}>
                          <div>
                            <div
                              className="tick"
                              onClick={() => updateTodoList(t?._id)}
                            >
                              <CheckCircleIcon
                                height="2rem"
                                width="2rem"
                                fill={t?.completed ? "#a49377" : "none"}
                                stroke={t?.completed ? "" : "#A49377"}
                                strokeWidth={t?.completed ? "" : "1.4"}
                              />
                            </div>
                            <h4>{t?.text}</h4>
                          </div>
                          <div
                            onClick={() =>
                              setShowTask((prevState) => ({
                                ...prevState,
                                id: t?._id,
                                open: !prevState?.open,
                              }))
                            }
                          >
                            <DotIcon height="2rem" width="1.5rem" />
                          </div>
                        </div>
                        {showTask?.id === t?._id && showTask?.open && (
                          <div className={styles.taskDetail}>
                            <div>
                              <strong>Completed: {"   "}</strong>
                              {t?.completed ? "Completed" : "Not completed"}
                            </div>
                            <div>
                              <strong>Created At: {"    "}</strong>
                              {new Date(t?.createdAt).toLocaleString(
                                "en-US",
                                options
                              )}
                            </div>
                            <button
                              className={styles.deleteBtn}
                              onClick={() => handleDelete(t?._id)}
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default WithAuth(Todo);
