import PropTypes from "prop-types"; // Import PropTypes
import useCartStore from "../../Hooks/useCartStore";
import { useTransition } from "react";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  course_name = "Unnamed Course", // Default value if course_name is missing
  course_qty=0,
  trainer = "Unknown Trainer", // Default value for trainer
  regular_price = 0,
  discount_price = 0,
  photo = "https://via.placeholder.com/300", // Fallback image URL
}) => {
  const { addItem, isItemExists,removeItem, increaseItemQuantity, decreaseItemQuantity, cart } =
    useCartStore();
  const [isAdding, startTransition] = useTransition();

  // Safely convert prices to numbers and calculate the discount percentage
  const regular = Number(regular_price);
  const discount = Number(discount_price);
  const discountPercentage =
    regular > 0 ? Math.round(((regular - discount) / regular) * 100) : 0;

  const handleAddToCart = () => {
    startTransition(() => {
      addItem({ id, course_name,course_qty, trainer, regular_price, discount_price, photo });
    });
  };

  const itemInCart = cart.find((item) => item.id === id);
  const quantity = itemInCart ? itemInCart.course_qty : 0; // Get quantity from cart
  const finalPrice = itemInCart
    ? itemInCart.discount_price * itemInCart.course_qty
    : discount_price;
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="relative">
        <img
          src={photo}
          alt={course_name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/300"; // Fallback on error
            e.currentTarget.alt = "Image not found";
          }}
        />

        <div className="absolute top-0 left-0 p-2">
          <h3 className="text-white text-xl font-bold">{course_name}</h3>
        </div>
      </div>

      <div className="p-4">
        <h2 className="text-gray-800 text-lg font-semibold mb-2">{course_name}</h2>

        <div className="flex items-center justify-between mb-4">
          <span className="flex text-blue-500 text-md">★★★★★</span>
          <span className="ml-2 text-gray-600 text-md font-bold">{trainer}</span>
        </div>

        <p className="text-gray-600 text-md mb-4">
          Course Details <span className="text-blue-500">Show Details</span>
        </p>

        <hr />

        <div className="mt-4 flex justify-between items-center">
          <div>
            <span className="line-through text-gray-400 text-sm">Tk {regular_price}</span>
            <span className="text-green-600 text-md font-bold ml-2">
              -{discountPercentage}%
            </span>
            <span className="text-black text-lg font-bold ml-2">
              Tk {finalPrice}
            </span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {isItemExists(id) ? (
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseItemQuantity(id)}
                  className="bg-gray-200 p-1 rounded-l"
                  // disabled={quantity <= 1} // Disable if quantity is 1
                >
                  -
                </button>
                <span className="px-4 text-lg font-bold">{quantity}</span>
                <button
                  onClick={() => increaseItemQuantity(id)}
                  className="bg-gray-200 p-1 rounded-r"
                  // disabled={quantity >= maxQuantity} // Disable if quantity reaches max
                >
                  +
                </button>
                <button onClick={() => removeItem(id)} className="text-rose-400">
                  Remove
                </button>
              </div>
              <Link className="underline text-blue-500" to="/cart">
                View
              </Link>
            </div>
          ) : (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full"
              disabled={isAdding}
            >
              {isAdding ? "Adding to Cart..." : "Add To Cart"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Add PropTypes validation
CourseCard.propTypes = {
  id: PropTypes.number.isRequired,
  course_name: PropTypes.string.isRequired,
  course_qty: PropTypes.string.isRequired,
  trainer: PropTypes.string.isRequired,
  regular_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  discount_price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  photo: PropTypes.string,
};

export default CourseCard;
