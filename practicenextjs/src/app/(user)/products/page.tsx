"use client";

import { products } from "@/data/products";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  name: string;
  price: number;
  image?: string;
};

type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
};

export default function ProductsPage() {
  const router = useRouter();

  async function handleBuy(product: Product) {
  const user = localStorage.getItem("user");

  if (!user) {
    alert("Please login first");
    return;
  }

  const parsedUser = JSON.parse(user) as User;

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
    router.push(data.url);
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