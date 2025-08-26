import React from 'react'

const TodoItems = ({
  text,
  id,
  isCompleted,
  deleteTodo,
  toggle,
  price,
  quantity,
  updateQuantity,
  updatePrice
}) => {
  return (
    <div className="flex items-center my-3 gap-2 w-full">
      
      {/* Toggle complete */}
      <div
        onClick={() => toggle(id)}
        className="flex items-center cursor-pointer"
      >
        <i
          className={
            isCompleted ? "fa-solid fa-check" : "fa-regular fa-circle"
          }
        ></i>
      </div>

      {/* Editable price + item text */}
      <div className="flex flex-1 items-center gap-2">
        <p
          className={`text-slate-700 text-xs ${
            isCompleted ? "line-through" : ""
          }`}
        >
          {text}
        </p>

        <input
        type="number"
        placeholder='0'
        value={price === "" ? "" : price}
        min="0"
        onChange={(e) => updatePrice(id, e.target.value)}
        className="w-20 px-2 py-0 border rounded  text-center text-xs outline-none"
        />

        <span className='text-xs'>× {quantity} =</span>
        <span className="font-bold text-xs">
  ${price && quantity ? (Number(price) * quantity).toFixed(2) : "0.00"}
</span>
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          className="px-2 bg-gray-200 rounded cursor-pointer"
          onClick={() => updateQuantity(id, quantity - 1)}
          disabled={quantity <= 1}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="px-2 bg-gray-200 rounded cursor-pointer"
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          +
        </button>
      </div>

      {/* Delete */}
      <div className="ml-2 text-red-600">
        <i
          onClick={() => deleteTodo(id)}
          className="fa-solid fa-trash cursor-pointer"
        ></i>
      </div>
    </div>
  );
};

export default TodoItems;
