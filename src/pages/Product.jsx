import { useParams , NavLink } from "react-router";

export default function ProductPage(props){
    const s = useParams();
    function show(){
        
       return props.products.map(pro =>{
        if(pro.id == s.id){
            return  <div className="d-card" key={pro.id} id={pro.id}>
                <div className="d-title">{pro.title}</div>
                <div className="tot" id={pro.newPrice}></div>

                <img src={pro.image} alt="" className="d-img"/>
                <div className="pricing">
                    <div className="d-old-price">Old Price: <span>{pro.oldPrice}</span></div>
                    <div className="d-price">Price: {pro.newPrice}</div>
                </div>
                <div className="d-descrition">Description: {pro.description}</div>
                <div className="d-category">Category: {pro.category}</div>
               { pro.isAdded ? <>
                <button id={pro.id} onClick={props.remove}>"Remove From The Card"</button>
                <input 
               onChange={props.onChange} 
               defaultValue={pro.totalPrice ?  pro.totalPrice / pro.newPrice : 1}  min={1} type="number" name="count" id="count" />
               </>
                :
                <button id={pro.id} onClick={props.add}>"Add To The Card"</button> }
            
            </div>
        }
       })

    }
   return <>
   <NavLink to='..' relative="path" className='back'>Back To Products</NavLink>
   <div className="p-card">{show()}</div>
   </>

}