import React, { useState } from "react";
// Displays individual items with Add button
import Header from "../components/common/Header"; // Header component
import TakePicture from "../components/TakePicture";
import SearchBar from "../components/SearchBar";
import ItemList from "../components/ItemList";


const ScanItem = () => {
  const [cart, setCart] = useState([]); // Stores items in the cart
  const [searchQuery, setSearchQuery] = useState(""); // For filtering items

  const items = [
    {
      id: 1,
      name: "Bendazac Lysine Eye Drops",
      description: "Atropine eye drops is currently the most effective ....",
      image: "https://via.placeholder.com/64", // Replace with actual image
    },
    {
      id: 2,
      name: "Poly Tears Eye Drops",
      description: "Moisturizing eye drops for dry eyes ....",
      image: "https://via.placeholder.com/64", // Replace with actual image
    },
    {
      id: 3,
      name: "Poly Tears Eye Drops",
      description: "Moisturizing eye drops for dry eyes ....",
      image: "https://via.placeholder.com/64", // Replace with actual image
    },
  ];

  // Add item to cart
  const addItemToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const removeItemFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update quantity in the cart
  const updateQuantity = (id, quantity) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  // Filter items based on search query
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {/* left section*/}
      <div className="flex-[2]">
       

          <div className=" overflow-auto relative z-10">
            <TakePicture />
          </div>

          {/* Search Bar */}
          <div className="overflow-auto relative z-10 py-4 px-4 sm:px-6 lg:px-8">
            <SearchBar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
          <div className=" overflow-auto relative z-10">
            {/* Item List */}
            <ItemList items={filteredItems} addItemToCart={addItemToCart} />
          </div>
        </div>
      </div>

     
    
  
  );
};

export default ScanItem;
