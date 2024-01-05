import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Ticket from "../components/Ticket";
import TButton from "../components/TButton";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, removeAll } from "../store/slices/cartSlice";
import { buyTickets } from "../services/tickets.service";

const CartPage = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onTicketRemove = (seatNr, showTimeId) => {
    dispatch(removeItem({ seatNr, showTimeId }));
  };

  const [message, setMessage] = useState("");
  const onOrderConfirm = async () => {
    const ticketsDto = cartItems.map((c) => {
      return {
        price: c.showTime.price,
        showtimeId: c.showTime.id,
        seatNr: c.seatNr,
      };
    });
    await buyTickets(ticketsDto)
      .then((r) => {
        dispatch(removeAll());
        navigate('/tickets');
      })
      .catch((err) => {
        setMessage(" " + err.message + " : Cannot buy tickets / tickets unavailable");
      });
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
        <TButton
          label="Confirm order"
          color="primary"
          clickAction={onOrderConfirm}
        />
        <p className="m-3 text-red-600">{message}</p>
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
