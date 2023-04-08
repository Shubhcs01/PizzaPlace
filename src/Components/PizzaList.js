import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pizza from "./Pizza";
import Header from "./Header";
import Footer from "./Footer";
import "../Styles/PizzaList.css";

function PizzaList() {
  const [pizzas, setPizzas] = useState([]);

  console.log();

  useEffect(() => {
    axios
      .get("https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68")
      .then((response) => {
        setPizzas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="pizza-list">
      <Header />
      <main>
        <h2>Our Pizzas</h2>
        <Link to="/cart">Go to Cart</Link>
        {/* <Link to={{pathname:"/cart", state:{orders}}} >Go to Cart</Link> */}
        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <Pizza key={pizza.id} pizza={pizza} />
          ))}
        </div>
      </main>
      {/* <button onClick={()=>}>Go to cart</button> */}
      <Footer />
    </div>
  );
}

export default PizzaList;
