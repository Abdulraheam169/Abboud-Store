import React, { useContext } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../components/Invoice";
import { useSelector } from "react-redux";

export default function FormPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const [user, setUser] = React.useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [showInvoice, setShowInvoice] = React.useState(false);
  React.useEffect(() => {
    if (showInvoice) {
      setTimeout(() => {
        window.scrollBy({
          top: 400,
          left: 0,
          behavior: "smooth",
        });
      }, 300);
    }
  }, [showInvoice]);
  function getInfo(e) {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setUser({
      name: formdata.get("name") || "",
      phone: formdata.get("phone") || "",
      mail: formdata.get("email") || "",
      address: formdata.get("address") || "",
    });
    setShowInvoice(true);
  }

  function getTotal() {
    return cartItems.reduce((acc, pro) => {
      const price = pro.totalPrice || pro.newPrice;
      return acc + price;
    }, 0);
  }
  return (
    <>
      <h1>Please Write Down Your Information</h1>
      <form onSubmit={getInfo}>
        <label htmlFor="name">Name:</label>
        <input required id="name" name="name" type="text" />

        <label htmlFor="number">Phone:</label>
        <input required id="number" type="number" name="phone" />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" />

        <label htmlFor="address">Address:</label>
        <input required id="address" type="text" name="address" />
        <button type="submit">Send Request</button>
      </form>

      {showInvoice && (
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>Thank You For Using Our Store, Get Back Soon</h2>
          <h2>Click Down To Get Your Invoice</h2>

          <PDFDownloadLink
            document={
              <MyDocument
                userInfo={user}
                items={cartItems}
                total={getTotal()}
              />
            }
            fileName="invoice.pdf"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                <button disabled>File Getting Prepared</button>
              ) : (
                <button
                  style={{
                    width: "fit-content",
                    backgroundColor: "#4CAF50",
                    border: "none",
                    padding: "8px",
                    color: "white",
                    borderRadius: "10px",
                  }}
                >
                  DownLoad as PDF
                </button>
              )
            }
          </PDFDownloadLink>
        </div>
      )}
    </>
  );
}
