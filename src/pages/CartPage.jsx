import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { authHeader, makeRequest } from "../utils/makeRequest";

export default function CartPage() {
  const authToken = authHeader();
  const [products, setProducts] = useState([]);

  const removeProduct = async(id) => {
    await makeRequest({
        url: `/users/cart/${id}`, method: 'delete'
    }, {}, authToken.Authorization)
  }

  useEffect(() => {
    makeRequest(
      { url: "users/cart", method: "get" },
      {},
      authToken.Authorization
    ).then((data) => setProducts(data.products));
  }, []);

  return (
    <div>
      <Link to="/">Go back</Link>
      <h1>My Cart</h1>
      <ul className="list-container">
        {products.map((product) => (
          <div className="productList">
            <li>{product.name}</li>
            <button onClick={()=>removeProduct(product.id)}>-</button>
          </div>
        ))}
      </ul>
    </div>
  );
}
