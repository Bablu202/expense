import React, { useEffect, useState } from "react";
import "./App.css";
import { Alert } from "./Components/Alert";
import { ExpenseForm } from "./Components/ExpenseForm";
import { ExpenseList } from "./Components/ExpenseList";
import { v4 } from "uuid";
/*const initialExpenses = [
  { id: v4(), charge: "rent", amount: 450 },
  { id: v4(), charge: "transport", amount: 90 },
  { id: v4(), charge: "grocery", amount: 300 },
];*/

//getting items from local storage
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];

function App() {
  // --------------------add expenses and details here------------------
  const [expenses, setExpenses] = useState(initialExpenses);
  // --------------------useState for Charge input------------------
  const [charge, setCharge] = useState("");
  //--------------------useState for amounr input------------------
  const [amount, setAmount] = useState("");
  //------------------------Alert useState--------------
  const [alert, setAlert] = useState({ show: false });
  //--------------------edit
  const [edit, setEdit] = useState(false);
  //--------------------edit item id
  const [id, setId] = useState(0);
  //--------------------functions ------------------

  //-------------------------useState-------------
  useEffect(() => {
    console.log("we call here useEffect");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  // name of the expense that you spent on
  const handleCharge = (e) => {
    setCharge(e.target.value);
  };
  // value of the amount
  const handleAmount = (e) => {
    setAmount(e.target.value);
  };
  //Alert function when it goes correct or any error
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 2000);
  };
  //when we press Submit Button
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(charge + " " + amount);
    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
      } else {
        const singleExpense = { id: v4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "expense added to the list" });
      }
      setCharge("");
      setAmount("");
    } else {
      handleAlert({ type: "danger", text: "please check the input Field" });
    }
  };
  //clear button to clear all expenses
  const clearItems = () => {
    //console.log("clear button");
    setExpenses([]);
    handleAlert({ type: "danger", text: "you have deleted all the items" });
  };
  //handle delete  a expense item (delete button)
  const handleDelete = (id) => {
    console.log(`delete - ${id}`);
    let tempExpenses = expenses.filter((item) => item.id !== id);
    let removedItem = expenses.find((item) => item.id === id);
    handleAlert({
      type: "danger",
      text: `you have removed ${removedItem.charge}`,
    });
    setExpenses(tempExpenses);
  };
  //handle edit  a expense item (edit button)
  const handleEdit = (id) => {
    let expense = expenses.find((item) => item.id === id);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
    console.log(expense);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>Calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          clearItems={clearItems}
        />
      </main>
      <h1>
        total spending :{" "}
        <span className="total">
          $
          {expenses.reduce((curr, acc) => {
            return (curr += parseInt(acc.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
