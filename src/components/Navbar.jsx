import React from "react";
import { useGlobalContext } from "../context/context";
import { HiShoppingCart } from "react-icons/hi";

const Navbar = () => {
   const { itemCounter } = useGlobalContext();
   return (
      <nav className="nav">
         <header className="nav-header">
            <div className="nav-brand">
               <h4>Carrello</h4>
            </div>
            <div className="nav-cart">
               <HiShoppingCart className="icon nav-icon" />
               {itemCounter > 0 && (
                  <div className="cart-counter"> {itemCounter}</div>
               )}
            </div>
         </header>
      </nav>
   );
};

export default Navbar;
