import React from "react";

export default function MyCard(props){
    const [items, setItems] = React.useState([])
    React.useEffect(()=> {
            setItems(props.items)
    },[props.items])
        function CreateItems(){
        return items.map((product)=>{
            return (<div className="product-card c-card" key={product.id} id={product.id}>
                    <img src={product.image} alt="" className="c-img"/>
                            <div className="tot" id={product.newPrice}></div>
                            <div className="c-title">Title: {product.title}</div>
                            <div className="c-price" id={product.newPrice}>Price: {product.newPrice}</div>
                            <input 
                            onChange={props.onChange} 
                            defaultValue={product.totalPrice ?  product.totalPrice / product.newPrice : 1}  min={1} type="number" name="count" id="count" />
                            {product.totalPrice ? <div>{product.totalPrice}</div> : undefined }
                            <button id={product.id} onClick={props.remove}>"Remove From The Card"</button>
                
                        </div>)
                        })
    }
   return <> 
        { items.length !== 0 ? <div className="c-container">{CreateItems()}</div>: <div>Please add some Items</div> }
        
    </>
}