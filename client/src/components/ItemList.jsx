import CartItem from "./CartItem";

const ItemList = ({ items, addItemToCart }) => {
  return (
    <div className="flex flex-col gap-4 bg-white">
      {items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          description={item.description}
          image={item.image}
          onAdd={() => addItemToCart(item)}
        />
      ))}
    </div>
  );
};

export default ItemList;
