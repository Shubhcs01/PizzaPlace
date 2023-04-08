import React, { useState } from "react";
import "../Styles/Pizza.css";

function Pizza(props) {
  // console.log(props);

  const {
    id,
    img_url,
    name,
    description,
    rating,
    price,
    isVeg,
    size,
    toppings
  } = props.pizza;

  const [showCustomizePopup, setShowCustomizePopup] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);

  function handleCustomizeClick() {
    setShowCustomizePopup(true);
  }

  function handleSizeChange(event) {
    setSelectedSize(event.target.value);
  }

  function handleToppingChange(event) {
    const toppingId = event.target.value;
    const isSelected = event.target.checked;

    if (isSelected) {
      setSelectedToppings([...selectedToppings, toppingId]);
    } else {
      setSelectedToppings(selectedToppings.filter((id) => id !== toppingId));
    }
  }

  function handleAddToCart() {
    const obj = {
      pizzaId: id,
      size: selectedSize,
      toppings: selectedToppings,
      quantity: quantity,
      price: price
    };

    console.log(obj);

    setShowCustomizePopup(false);
  }

  return (
    <div className="pizza-container">
      <img className="pizza-img" src={img_url} alt={name} width="50%" />
      <div className="pizza-details">
        <h2 className="pizza-name">{name}</h2>
        <p className="pizza-desc">{description}</p>
        <div className="rating">
          {Array.from({ length: rating }, (_, index) => (
            <span key={index}>&#9733;</span>
          ))}
        </div>
        <p>Price: $ {price}</p>
        <p>Type: {isVeg ? "Vegetarian" : "Non-Vegetarian"}</p>
        <button className="add-button" onClick={handleCustomizeClick}>
          Add
        </button>
      </div>
      {showCustomizePopup && (
        <div className="customize-popup">
          <div className="customize-section">
            <label htmlFor="size">Choose size:</label>
            <div className="toppings">
              {size[0].items.map((item) => (
                <label key={item.size}>
                  <input
                    type={size[0].isRadio ? "radio" : "checkbox"}
                    name="sizes"
                    value={item.size}
                    // checked={selectedToppings.includes(item)}
                    onChange={handleSizeChange}
                  />
                  {item.size}
                </label>
              ))}
            </div>
          </div>
          <div className="customize-section">
            <label htmlFor="toppings">Toppings:</label>
            <div className="toppings">
              {toppings[0].items.map((item) => (
                <label key={item}>
                  <input
                    type={toppings.isRadio ? "radio" : "checkbox"}
                    name="toppings"
                    value={item.name}
                    checked={selectedToppings.includes(item.name)}
                    onChange={handleToppingChange}
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>
          <div className="customize-section">
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </div>
          <div className="customize-buttons">
            <button onClick={handleAddToCart}>Add to Cart</button>
            <button onClick={() => setShowCustomizePopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Pizza;
