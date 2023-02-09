import React from "react";
import { MdAddTask } from "react-icons/md";

export const ExpenseForm = ({
  charge,
  amount,
  handleCharge,
  handleAmount,
  handleSubmit,
  edit,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-center">
        <div className="form-group">
          <label className="charge">charge</label>
          <input
            type="text"
            className="form-control"
            id="charge"
            name="charge"
            placeholder="e.g : bills"
            value={charge}
            onChange={handleCharge}
          />
        </div>
        <div className="form-group">
          <label className="amount">amount</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            placeholder="e.g : price"
            value={amount}
            onChange={handleAmount}
          />
        </div>
      </div>
      <button type="submit" className="btn">
        {edit ? "edit Expense" : "Add to Expenses"}
        <MdAddTask />
      </button>
    </form>
  );
};
