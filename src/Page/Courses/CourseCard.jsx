import PropTypes from "prop-types"; // Import PropTypes
import useCartStore from "../../Hooks/useCartStore";
import { useTransition } from "react";
const CourseCard = ({
  id,
  course_name = "Unnamed Course", // Default value if course_name is missing
  course_qty = 0,
  trainer = "Unknown Trainer", // Default value for trainer
  regular_price = 0,
  discount_price = 0,
  photo = "https://via.placeholder.com/300", // Fallback image URL
}) => {
  const { addItem, removeItem, cart, getTotalItems } = useCartStore();
  const [isAdding, startTransition] = useTransition();

  // Safely convert prices to numbers and calculate the discount percentage
  const regular = Number(regular_price);
  const discount = Number(discount_price);
  const discountPercentage =
    regular > 0 ? Math.round(((regular - discount) / regular) * 100) : 0;

  const handleAddToCart = () => {
    startTransition(() => {
      addItem({
        id,
        course_name,
        course_qty,
        trainer,
        regular_price,
        discount_price,
        photo,
      });
    });
  };

  const itemInCart = cart.find((item) => item.id === id);
  const finalPrice = itemInCart
    ? itemInCart.discount_price * itemInCart.course_qty
    : discount_price;
  return (
    <div className="bg-white shadow-xl rounded-b-lg rounded-t-xl overflow-hidden">
      <div className="relative ">
        <img
          src={photo}
          alt={course_name}
          className="h-[18rem] sm:h-[22rem] w-full object-center"
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
            <span className="text-black text-lg font-bold ml-2">Tk {finalPrice}</span>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          {itemInCart ? (
            <button onClick={() => removeItem(id)} className="btn btn-warning w-full">
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="btn btn-primary w-full disabled:cursor-not- disabled:bg-blue-400 disabled:text-white"
              disabled={isAdding || getTotalItems() > 0}
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
