import React from "react";
import { BrowserRouter , Routes , Route  } from "react-router";
import PageLayout from "./PageLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import MyCard from "./pages/MyCard";
// import ProductsLayout from "./components/ProductsLayout";
import Products from "./pages/Products";
import Product from "./pages/Product";


export default function Market(){

    const [categories] = React.useState([
      { "id": 1, "name": "Tech", "description": "Gadgets, gear, and electronics to power your digital life.", "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E💻%3C/text%3E%3C/svg%3E" },
      { "id": 2, "name": "Workspace", "description": "Workspace essentials for productivity and organization.", "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E🗄️%3C/text%3E%3C/svg%3E" },
      { "id": 3, "name": "Home Decor", "description": "Decor and essentials to elevate your living space.", "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E🪴%3C/text%3E%3C/svg%3E" },
      { "id": 4, "name": "Library", "description": "Books and learning materials for your daily routine.", "image": "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='800'%3E%3Crect width='100%25' height='100%25' fill='%2366cdaa'/%3E%3Ctext x='50%25' y='50%25' font-size='350' text-anchor='middle' dominant-baseline='middle'%3E📚%3C/text%3E%3C/svg%3E" }
    ])
    
  const [products, setProducts] = React.useState([])  
      React.useEffect(()=>{
    fetch('https://69fd2d9630ad0a6fd1c0867d.mockapi.io/products/products')
  .then(response => response.json())
  .then(data => setProducts(data));

},[])

function handleQuantity(e){
  const base = (e.currentTarget.parentNode.children[1].id);
  const id = e.currentTarget.parentNode.id;
  const val = parseInt(e.currentTarget.value)
  setProducts(prev => prev.map(item => item.id == id ? {...item, totalPrice : base * val } : {...item}))
}
function addToCard(e){
    let productId = e.currentTarget.id;
    setProducts((prev) => prev.map(pro => pro.id == productId ? {...pro, "isAdded": true} : pro))
}
function removeItem(e){
    let productId = e.currentTarget.id;
    setProducts((prev) => prev.map(pro => pro.id == productId ? {...pro, "isAdded": false} : pro))
}

  return <>
  <BrowserRouter basename="/Abboud-Store">
    <Routes>
      <Route  path='/' element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="aboutUs" element={<About />} /> 
        <Route path="myCard" element={<MyCard items={products.filter(item => item.isAdded)} onChange={handleQuantity} remove={removeItem}  />} /> 
        <Route path="products" element={<Products products={products} categories={categories} add={addToCard} remove={removeItem} />} />
        <Route path='products/:id' element={<Product products={products} add={addToCard} remove={removeItem} onChange={handleQuantity}  />} />
      </Route>
    </Routes>
  </BrowserRouter>

  </>


}
