import React, { useState } from 'react';
import Header from "../components/common/Header";

import CartList from "../components/CartList";
const EventsPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Bendazac Lysine Eye Drops",
      description: "Atropine eye drops is currently the most effective ....",
      image: "https://via.placeholder.com/64",
      quantity: 2,
    },
    {
      id: 2,
      name: "Poly Tears Eye Drops",
      description: "Moisturizing eye drops for dry eyes ....",
      image: "https://via.placeholder.com/64",
      quantity: 1,
    },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  return (
    <div>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Events" />
      </div>
      <div className="min-h-screen bg-gray-100 p-6 flex-1 overflow-auto relative z-10">
        <CartList
          cartItems={cartItems}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>
    </div>
  );
}

export default EventsPage