/* eslint-disable react/react-in-jsx-scope */
import { RiDeleteBin5Line } from "react-icons/ri";
import useCartStore from "../../Hooks/useCartStore";
import PropTypes from "prop-types";
const CartCard = ({ item }) => {
  const { removeItem,
    increaseItemQuantity,
    decreaseItemQuantity
  } = useCartStore();

  const handleIncrease = () => {
    increaseItemQuantity(item.id);
  };

  const handleDecrease = () => {
    decreaseItemQuantity(item.id);
  };

  const handleRemove = () => {
    removeItem(item.id);
  };


  return (
    <tr className="border-b border-gray-300 overflow-x-auto">
      <td>
        <div className="flex items-center justify-center">
          <div className="w-[10%] text-rose-500 text-center flex items-center justify-center">
            <RiDeleteBin5Line
              className="text-xl hover:text-footer_color cursor-pointer"
              onClick={handleRemove}
            />
          </div>
          <div className="flex flex-col text-center justify-center items-center py-2 w-[80%]">
            <div className="mask bg-gray-100 h-[50px] rounded-full p-2">
              <img
                className="h-full w-full  object-cover"
                src={item.photo} // Assuming item has an image property
                alt="Course"
              />
            </div>
            <p className="text-[14.4px] px-[7px] text-center flex">
              {item.course_name}{" "}
              <span className="hidden lg:flex">- {item.unit_name}</span>
            </p>
          </div>
        </div>
      </td>
      <td>
        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
          {item.discount_price} {/* Assuming item has a discount_price property */}
        </p>
      </td>
      <td>
        <div className="flex justify-center">
          <div className="border">
            <button
              className="px-4 w-[30px] font-bold font_standard my-1.5"
              onClick={handleDecrease}
            >
              -
            </button>
          </div>
          <div className="border-y">
            <input
              type="number"
              value={item.course_qty}
              className="font-bold w-[30px] lg:w-[60px] font_standard px-2 text-center mx-auto h-full"
              readOnly
            />
          </div>
          <div className="border">
            <button
              className="px-4 w-[30px] font-bold font_standard my-1.5"
              onClick={handleIncrease}
            >
              +
            </button>
          </div>
        </div> 
      </td>
      <td>
        <p className="text-[14.4px] font-bold p-[7px] text-black text-center">
          {item.discount_price * item.course_qty} {/* Calculate subtotal */}
        </p>
      </td>
    </tr>
  );
};

CartCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default CartCard;
