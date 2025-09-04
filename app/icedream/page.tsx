"use client";

import React, { useMemo, useState } from "react";

const ACCENT = "#FE69AD";
const BG = "#F1F1F1";

/* ---------- Mock Data ---------- */
const PRODUCTS = [
  {
    id: "acacia-gesha",
    name: "Acacia Hills — Gesha",
    subtitle: "Tanzania • Washed Gesha",
    price: 22.5,
    currency: "£",
    weightOptions: ["250g", "1kg"],
    grindOptions: ["Whole Bean", "Filter", "Espresso"],
    badges: ["Limited", "Single Origin"],
    tasting: ["Jasmine", "Honey", "Bergamot"],
    origin: "Tanzania",
    process: "Washed",
    image:
      "https://images.unsplash.com/photo-1470167290877-7d5d3446de4c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "huila-pink-bourbon",
    name: "Huila Pink Bourbon",
    subtitle: "Colombia • Anaerobic",
    price: 18.0,
    currency: "£",
    weightOptions: ["250g", "500g"],
    grindOptions: ["Whole Bean", "Filter", "Espresso"],
    badges: ["Fruity"],
    tasting: ["Strawberry", "Rosehip", "Cocoa"],
    origin: "Colombia",
    process: "Anaerobic",
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1200&auto=format&fit=crop",
  },
];

/* ---------- Helpers ---------- */
function currency(val: number, curr = "£") {
  return `${curr}${Number(val).toFixed(2)}`;
}

/* ---------- Page ---------- */
export default function IcedreamPage() {
  const [cart, setCart] = useState<any[]>([]);

  function addToCart(product: any) {
    setCart((prev) => [...prev, { ...product, qty: 1 }]);
  }

  return (
    <>
      <style>{styles}</style>
      <div className="page" style={{ background: BG }}>
        <header className="site-header">
          <h1 className="logo">ICEDREAM</h1>
          <span className="cart">Cart ({cart.length})</span>
        </header>

        <section className="grid">
          {PRODUCTS.map((p) => (
            <article key={p.id} className="card">
              <img src={p.image} alt={p.name} />
              <div className="body">
                <h3>{p.name}</h3>
                <p>{p.subtitle}</p>
                <p className="price">{currency(p.price, p.currency)}</p>
                <button onClick={() => addToCart(p)}>Add to cart</button>
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}

/* ---------- Styles ---------- */
const styles = `
:root {
  --accent: ${ACCENT};
  --bg: ${BG};
  --ink: #0e0e0e;
}
body { margin: 0; background: var(--bg); font-family: Inter, sans-serif; }
.page { min-height: 100vh; }
.site-header { display: flex; justify-content: space-between; align-items: center; padding: 16px 24px; border-bottom: 1px solid #ddd; background: white; }
.logo { font-weight: 900; font-size: 20px; }
.cart { font-size: 14px; }
.grid { padding: 20px; display: grid; gap: 20px; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
.card { background: white; border-radius: 16px; overflow: hidden; border: 1px solid #eee; box-shadow: 0 6px 16px rgba(0,0,0,.06); }
.card img { width: 100%; height: 200px; object-fit: cover; }
.card .body { padding: 16px; }
.card h3 { margin: 0 0 4px; font-size: 18px; }
.card p { margin: 0; color: #555; font-size: 14px; }
.card .price { margin: 8px 0; font-weight: bold; }
.card button { background: var(--accent); border: none; color: white; padding: 10px 14px; border-radius: 8px; cursor: pointer; font-weight: 600; }
.card button:hover { filter: brightness(0.95); }
`;
