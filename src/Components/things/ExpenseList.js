import React from "react";
import { ExpenseItem } from "./ExpenseItem";
import { FcDeleteDatabase } from "react-icons/fc";
export const ExpenseList = ({
  expenses,
  handleDelete,
  handleEdit,
  clearItems,
}) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <ExpenseItem
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          clear
          <FcDeleteDatabase className="btn-icon" onClick={clearItems} />
        </button>
      )}
    </>
  );
};
