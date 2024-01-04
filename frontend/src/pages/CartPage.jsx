import React, { useMemo, useState } from "react";
import Ticket from "../components/Ticket";
import TButton from "../components/TButton";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "../store/slices/cartSlice";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const onTicketRemove = (seatNr, showTimeId) => {
    dispatch(removeItem({ seatNr, showTimeId }));
  };

  const totalPrice = useMemo(() => {
    const total = cartItems
      .map((item) => item.showTime.price)
      .reduce((prevValue, currValue) => prevValue + currValue, 0);
    return total;
  }, [cartItems]);

  return (
    <div className="p-8">
      <div>Your shopping cart:</div>
      <div className="m-4"> Total price: {totalPrice}</div>

      <div className="m-3">
        <TButton label="Confirm order" color="primary" />
      </div>
      <div>
        {cartItems.map((item, idx) => {
          return (
            <Ticket
              key={idx}
              seatNr={item.seatNr}
              showTime={item.showTime}
              movieTitle={item.movieTitle}
              onRemove={() => onTicketRemove(item.seatNr, item.showTime.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CartPage;
