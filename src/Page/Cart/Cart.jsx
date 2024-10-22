/* eslint-disable react/react-in-jsx-scope */
import { Link } from "react-router-dom";
import useCartStore from "../../Hooks/useCartStore";
import CartCard from "./CartCard"; // Import the CartCard component

const Cart = () => {
  const { cart, getTotalPrice } = useCartStore();

  // Calculate total price
  const totalPrice = getTotalPrice();

    if(!cart.length){
      return (
        <div className="flex flex-col items-center justify-center gap-2 min-h-screen">
              <h1 className="text-2xl md:text-4xl font-bold">Cart is Empty</h1>
              <Link to="/course" className="text-base  text-blue-500 underline">Go to Courses</Link>
        </div>
      )
    }

  return (
    <div className="m-mt_16px">
      <h1 className="text-sm text-start md:text-text_xl lg:py-0 font-bold">Cart</h1>
      <div className="pt-p_16px">
        <div className="lg:flex items-start gap-3">
          <div className="w-full lg:w-[58%] bg-white border-2">
            <table className="overflow-x-auto w-full">
              <thead>
                <tr className="border-b-4 border-gray-300">
                  <th className="text-[14.4px] w-6/12 font-bold p-[7px] text-black">
                    Course
                  </th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">Price</th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">Quantity</th>
                  <th className="text-[14.4px] font-bold p-[7px] text-black">
                    Sub Total
                  </th>
                </tr>
              </thead>
              <tbody className="overflow-x-auto">
                {cart.map((item) => (
                  <CartCard key={item.id} item={item} /> // Render CartCard for each item
                ))}
              </tbody>
            </table>
          </div>
          <div className="lg:w-[41%] bg-white border-2">
            <div className="px-[30px]">
              <h2 className="font-bold text-start text-text_medium pt-2 pb-1 border-b-2 border-black">
                Cart Summary
              </h2>
              <div className="py-3 flex justify-between border-b border-gray-300">
                <p className="text-black font-bold">Total Price</p>
                <p className="text-black font-bold">{totalPrice}</p>{" "}
                {/* Display total price */}
              </div>
              <Link
                to={`/cart/checkout`}
                state={{ total: totalPrice }} // Pass total price to checkout
                className="font-medium text-black mb-2 border-2 hover:bg-[#D2C5A2] duration-300 py-2 px-4 block text-center mx-auto w-full"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
