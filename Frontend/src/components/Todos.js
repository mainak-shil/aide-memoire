import React, { useState } from "react";
import { connect } from "react-redux";
import { addTodos, saveAllTodos } from "../redux/reducer";
import { GoPlus } from "react-icons/go";
import { motion } from "framer-motion";
import { useHttpClient } from "../shared/hooks/http-hook";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj)),
  };
};

const Todos = (props) => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [todo, setTodo] = useState("");
  console.log(props);

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const add = async () => {
    if (todo === "") {
      alert("Input is Empty");
    } else {
      try {
        const createdNote = await sendRequest(
          `http://localhost:5001/api/notes`,
          "POST",
          JSON.stringify({
            text: todo,
            user: "UI",
            title: "UI",
          }),
          {
            "Content-Type": "application/json",
          }
        );
        console.log("createdNote", createdNote);
        props.addTodo({
          id: createdNote?.note?.id,
          text: createdNote?.note?.text,
          completed: false,
        });
        setTodo("");
      } catch (err) {}
    }
  };

  return (
    <div className='addTodos'>
      <input
        type='text'
        onChange={(e) => handleChange(e)}
        className='todo-input'
        value={todo}
      />

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className='add-btn'
        onClick={() => add()}
      >
        <GoPlus />
      </motion.button>
      <br />
    </div>
  );
};
//we can use connect method to connect this component with redux store
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
