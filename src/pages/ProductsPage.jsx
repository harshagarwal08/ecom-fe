import React, { useState, useEffect } from "react";
import { authHeader, makeRequest } from "../utils/makeRequest";
import { useNavigate } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('')
  const [productName, setProductName] = useState("");
  const navigate = useNavigate();
  const authToken = authHeader();

  useEffect(() => {
    makeRequest(
      { url: "/products", method: "get" },
      {},
      authToken.Authorization
    ).then((data) => {
      if (!data.products) navigate("/login");
      setProducts(data.products);
    });
  }, []);

  const addProduct = async () => {
    const data = await makeRequest(
      { url: "/products", method: "post" },
      {
        data: {
          name: productName,
        },
      },
      authToken.Authorization
    );
    if(data.message==='unauthorized'){
        setError('you cannot add products');
        return;
    }
    const newProducts = [...products, data.product];
    setProducts(newProducts);
    setProductName("");
  };

  const handleProductName = (e) => {
    setProductName(e.target.value);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addToCart = (id) => {
    makeRequest(
      {
        url: "/users/cart",
        method: "post",
      },
      {
        data: {
          product: id,
        },
      },
      authToken.Authorization
    );
  };

  return (
    <div>
      <button onClick={() => navigate("/cart")}>My Cart</button>
      <button onClick={handleLogout}>Logout</button>
      <h1>Products</h1>
      <ul className="list-container">
        {products.map((product) => (
          <div className="productList">
            <li>{product.name}</li>
            <button onClick={() => addToCart(product.id)}>+</button>
          </div>
        ))}
      </ul>
      <input
        type="text"
        placeholder="enter product"
        value={productName}
        onChange={handleProductName}
      />
      <button onClick={addProduct}>Add Product</button>
      <div style={{color: 'red', marginTop: '10px'}}>{error}</div>
    </div>
  );
}
