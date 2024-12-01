import React from "react";

const CartList = ({ cartItems, updateQuantity, removeItem, updateUnit }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">In Cart List</h2>
      {cartItems.length === 0 ? (
        <p className="text-gray-600">No items in the cart.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border border-gray-300 p-4 rounded-lg"
            >
              {/* Image and Info */}
              <div className="flex items-center">
                <div className="w-16 h-16 mr-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain rounded-lg"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Quantity, Units, and Remove Button */}
              <div className="flex items-center space-x-4">
                {/* Quantity Controls */}
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-l-lg hover:bg-gray-300 focus:outline-none"
                  >
                    −
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value) || 1)
                    }
                    min="1"
                    className="w-12 border-t border-b border-gray-300 text-center text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-r-lg hover:bg-gray-300 focus:outline-none"
                  >
                    +
                  </button>
                </div>

                {/* Unit Selector */}
                <select
                  value={item.unit}
                  onChange={(e) => updateUnit(item.id, e.target.value)}
                  className="border border-gray-300 text-black rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="Box">Box</option>
                  <option value="Bottle">Bottle</option>
                  <option value="Pack">Pack</option>
                  <option value="Piece">Piece</option>
                </select>

                {/* Remove Button */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartList;
