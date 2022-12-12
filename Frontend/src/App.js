import React from "react";
import "./css/main.css";
import DisplayTodos from "./components/DisplayTodos";
import Todos from "./components/Todos";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addTodos, saveAllTodos } from "./redux/reducer";
import { useHttpClient } from "./shared/hooks/http-hook";
import { APP_NAME } from "./shared/util/constants";

function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchAllNotes = async () => {
    try {
      const notes = await sendRequest(
        `http://localhost:5001/api/notes`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      dispatch(saveAllTodos(notes.notes));
    } catch (err) {}
  };

  React.useEffect(() => {
    fetchAllNotes();
    console.log("eee");
  }, []);

  return (
    <div className='App'>
      <motion.h1
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        {APP_NAME}
      </motion.h1>
      <motion.div
        initial={{ y: 1000 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", duration: 1 }}
      >
        <Todos />
        <DisplayTodos />
      </motion.div>
    </div>
  );
}

export default App;
