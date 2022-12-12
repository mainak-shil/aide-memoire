import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";
import { useHttpClient } from "../shared/hooks/http-hook";

const TodoItem = (props) => {
  const { item, updateTodo, removeTodo, completeTodo } = props;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [isEditMode, setEditMode] = useState(false);

  const inputRef = useRef(true);

  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
    setEditMode(true);
  };

  const _saveEdit = async (id) => {
    try {
      const updatedNote = await sendRequest(
        `http://localhost:5001/api/notes/${id}`,
        "PATCH",
        JSON.stringify({
          text: inputRef.current?.value,
          user: "UI",
          title: "UI",
        }),
        {
          "Content-Type": "application/json",
        }
      );
      updateTodo({ id, text: inputRef.current?.value });
      inputRef.current.disabled = true;
      setEditMode(false);
    } catch (err) {
      console.log(err);
    }
  };

  const _removeNoteInDB = async (id) => {
    try {
      await sendRequest(
        `http://localhost:5001/api/notes/${id}`,
        "DELETE",
        null,
        {
          "Content-Type": "application/json",
        }
      );
      removeTodo(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <motion.li
      initial={{ x: "150vw", transition: { type: "spring", duration: 2 } }}
      animate={{ x: 0, transition: { type: "spring", duration: 2 } }}
      whileHover={{
        scale: 0.9,
        transition: { type: "spring", duration: 0.1 },
      }}
      exit={{
        x: "-60vw",
        scale: [1, 0],
        transition: { duration: 0.5 },
        backgroundColor: "rgba(255,0,0,1)",
      }}
      key={item?.id}
      className='card'
    >
      <textarea ref={inputRef} disabled={inputRef} defaultValue={item?.text} />
      <div className='btns'>
        {isEditMode ? (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => _saveEdit(item?.id)}
          >
            {" "}
            <AiOutlineCheck />{" "}
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: 1.4 }}
            whileTap={{ scale: 0.9 }}
            onClick={changeFocus}
          >
            {" "}
            <AiFillEdit />{" "}
          </motion.button>
        )}
        <motion.button
          whileHover={{ scale: 1.4 }}
          whileTap={{ scale: 0.9 }}
          style={{ color: "red" }}
          onClick={() => _removeNoteInDB(item?.id)}
        >
          {" "}
          <IoClose />
        </motion.button>{" "}
      </div>
      {/* {item.completed && <span className='completed'>done</span>} */}
    </motion.li>
  );
};

export default TodoItem;
