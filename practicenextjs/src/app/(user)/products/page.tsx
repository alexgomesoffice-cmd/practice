"use client";

import { products } from "@/data/products";

export default function ProductsPage() {
  async function handleBuy(product: any) {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("Please login first");
    return;
  }

  const parsedUser = JSON.parse(user);

  const res = await fetch("/api/pay", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      amount: product.price,
      productName: product.name,
      user: parsedUser,
    }),
  });

  const data = await res.json();

  if (data.url) {
    window.location.href = data.url;
  } else {
    alert("Payment failed to initialize");
  }
}

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      {products.map((product) => (
        <div
          key={product.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >
          <h2>{product.name}</h2>

          <p>{product.price} BDT</p>

          <button
            onClick={() => handleBuy(product)}
          >
            Buy Now
          </button>
        </div>
      ))}
    </div>
  );
}