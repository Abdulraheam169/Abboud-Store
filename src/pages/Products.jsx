import React from "react";
import { NavLink, useSearchParams } from "react-router";

export default function Products(prop){
    
    const [searchParams, setSearchParams] = useSearchParams()
    function handleSearchParams(val){
        const s = new URLSearchParams(searchParams)
        if(val === null){
            s.delete("category")
        }else{
            s.set("category" , val)
        }
        setSearchParams(s);
    }
    function createCategories(){
        return prop.categories.map((category) =>  {
                return <button key={category.id} className="cat" onClick={() => {handleSearchParams(category.name)}}>{category.name}</button>
            })
    }
    function filterProducts(){
        if(searchParams.get("category") === null){
            return (prop.products)
        }else{
        return prop.products.filter(pro =>(pro.category === searchParams.get("category")))
        }
    }
     const displayedProducts = filterProducts()
    function CreateProducts(){
        return displayedProducts.map((product) =>  {
            return (
            <div className={product.isAvailable ? " product-card available" : " product-card not-available"} key={product.id}>
                <div className="img">
                    <img src={product.image} alt="" className="p-img"/>
                </div>
                <div className="p-title">{product.title}</div>
                <div className="price">
                    <span className="p-old-price">{product.oldPrice}</span>
                    <span className="p-price">{product.newPrice}</span>
                </div>
                <div className="p-category">{product.category}</div>
               {product.isAvailable ? <button id={product.id} onClick={product.isAdded ? prop.remove : prop.add} className={product.isAdded ? "remove" : "add"}></button> : undefined}
                <NavLink id={product.id} to={`${product.id}`} className='det'>go to details</NavLink>
            </div>
            )
        })
    }





    return prop.products.length > 0 ? 
        <>
       <div className="cat">{createCategories()}
            {searchParams.get("category") !== null ? <button onClick={()=> setSearchParams({})}>back to all products</button> : null}
        </div>
        <div className="p-cont">{CreateProducts()}</div> 
    </>
    : <div className="loading"></div> 
     


}







