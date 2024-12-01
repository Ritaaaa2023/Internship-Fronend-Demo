const CartItem = ({ name, description, image, onAdd }) => {
  return (
    <div className="border border-gray-300 rounded-lg shadow p-4 flex items-center gap-4">
      <img
        src={image}
        alt={name}
        className="w-16 h-16 object-contain rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-800">{name}</h4>
        <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
      </div>
      <button
        onClick={onAdd}
        className="py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        Add Item
      </button>
    </div>
  );
};

export default CartItem;
