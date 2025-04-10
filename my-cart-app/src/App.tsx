import React from "react";
import { useCart } from "./useCart";

function App() {
  const { addProduct, getTotal, getProductCount } = useCart();

  const handleAdd = () => {
    addProduct({ id: "p1", name: "T-shirt", price: 20, quantity: 1 });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Mon Panier</h1>
      <button style={styles.button} onClick={handleAdd}>
        Ajouter un produit
      </button>
      <div style={styles.summary}>
        <p style={styles.text}>Nombre d'articles : <strong>{getProductCount()}</strong></p>
        <p style={styles.text}>Total : <strong>{getTotal()} €</strong></p>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: 400,
    margin: "auto",
    marginTop: "10vh",
    padding: 24,
    borderRadius: 12,
    boxShadow: "0 0 20px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    textAlign: "center",
    color: "#333",
  },
  title: {
    fontSize: "1.8rem",
    marginBottom: 20,
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#4caf50",
    color: "#fff",
    cursor: "pointer",
    marginBottom: 20,
  },
  summary: {
    marginTop: 20,
  },
  text: {
    fontSize: "1.1rem",
    margin: "8px 0",
  },
};

export default App;
