import React, { useEffect, useRef, useState } from 'react'
import TodoItems from './TodoItems'

const Todo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos")?
    JSON.parse(localStorage.getItem("todos")): []);

    const inputRef = useRef();

    const add = () => {
        const inputText = inputRef.current.value.trim();
        
        if (inputText === "") {
            return null;
        }

        const newTodo = {
            id: Date.now(),
            text: inputText,
            price: "",
            quantity: 1,
            isCompleted: false,
        }
        setTodoList((prev) => [...prev, newTodo]);
        inputRef.current.value = "";
    }

    const updateQuantity = (id, newQuantity) => {
    setTodoList((prevTodos) => {
        return prevTodos.map((todo) => {
        if (todo.id === id) {
            return { ...todo, quantity: newQuantity };
        }
        return todo;
        });
    });
    };

    const updatePrice = (id, newPrice) => {
    setTodoList((prevTodos) => {
        return prevTodos.map((todo) => {
        if (todo.id === id) {
            return {
            ...todo,
            price: newPrice === "" ? "" : Number(newPrice), // keep empty string if cleared
            };
        }
        return todo;
        });
    });
    };



    const deleteTodo =(id) =>{
        setTodoList((prvTodos) => {
           return prvTodos.filter((todo) => todo.id !== id)
        }) 
    }

    const toggle = (id) => {
        setTodoList((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {...todo, isCompleted: !todo.isCompleted}
                }
                return todo;
            })
        })
    }

    const grandTotal = todoList.reduce((sum, item) => {
    // If price is empty string, treat it as 0
    const itemPrice = item.price === "" ? 0 : Number(item.price);
    return sum + itemPrice * item.quantity;
    }, 0);

    useEffect(()=>{
        localStorage.setItem("todos", JSON.stringify(todoList))
    },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl'>

     {/* title */}

     <div className='flex items-center mt-2 gap-2'>
        <i className='fa-solid fa-shop mt-1'></i>
        <h1 className='text-3xl font-semibold'> Grocery List</h1>
     </div>

    {/* Input Fields */}

    <div className='flex items-center my-7 bg-gray-200 rounded-full'>
        <input 
            ref={inputRef} 
            className='bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600' 
            type="text" 
            placeholder='Add your task' onKeyDown={(e) => {
            if (e.key === "Enter") {
            add();
            }
        }}/>
        <button onClick={add}  className='border-none rounded-full bg-orange-600 w-32 h-14 text-white text-lg font-medium cursor-pointer'> Add +</button>
    </div>

    {/* To do Lists */}

    <div>
        {todoList.map((item) => (
            <TodoItems 
            key={item.id} 
            text={item.text} 
            price={item.price} 
            quantity={item.quantity} 
            id={item.id} 
            isCompleted={item.isCompleted} 
            deleteTodo={deleteTodo} 
            toggle={toggle} 
            updateQuantity={updateQuantity} 
            updatePrice={updatePrice}  />
        ))}
    </div>

        
        {/* Total of the Lists */}
    <div className="mt-auto pt-4 border-t flex justify-between items-center text-sm text-slate-600">
    <h2 className="text-base font-medium">Total:</h2>
    <p className="font-bold text-sm text-slate-800">
        ${grandTotal.toFixed(2)}
    </p>
    </div>


    </div>
  )
}

export default Todo