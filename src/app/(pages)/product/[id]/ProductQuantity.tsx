"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { CgMathMinus } from "react-icons/cg";

export default function ProductQuantity({
  price,
  available,
}: {
  price: number;
  available: number;
}) {
  const [quantity, setQuantity] = useState(available > 0 ? 1 : 0);
  const maxQuantity = Math.max(0, available);

  function updateQuantity(value: number) {
    if (maxQuantity === 0) {
      setQuantity(0);
      return;
    }

    setQuantity(Math.min(maxQuantity, Math.max(1, value)));
  }

  return (
    <>
      <div className="mb-6">
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
          Quantity:
        </label>
        <div className="flex items-center">
          <div className="flex items-center overflow-hidden rounded-lg border-2 border-gray-200">
            <button
              type="button"
              aria-label="Decrease quantity"
              disabled={quantity <= 1}
              onClick={() => updateQuantity(quantity - 1)}
              className="px-6 py-4 text-gray-600 duration-150 hover:bg-gray-200 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <CgMathMinus />
            </button>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min={maxQuantity > 0 ? 1 : 0}
              max={maxQuantity}
              value={quantity}
              disabled={maxQuantity === 0}
              onChange={(event) => updateQuantity(Number(event.target.value))}
              className="w-12 text-center focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              aria-label="Increase quantity"
              disabled={quantity >= maxQuantity}
              onClick={() => updateQuantity(quantity + 1)}
              className="px-6 py-4 text-gray-600 duration-150 hover:bg-gray-200 hover:text-green-500 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <FaPlus />
            </button>
          </div>
          <span className="text-gray-500 ml-4 text-sm">{available} available</span>
        </div>
      </div>
      <div className="p-4 bg-gray-50 mb-6 flex justify-between items-center">
        <p className="text-gray-600 font-medium">Total price:</p>
        <span className="font-bold text-2xl text-green-600">
          {price * quantity} EGP
        </span>
      </div>
    </>
  );
}
