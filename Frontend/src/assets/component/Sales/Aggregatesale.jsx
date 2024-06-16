import React,{useState,useEffect} from "react";
import axios from "axios";


function Aggregatesale(){

    const [total, setAggregate] = useState({});

    useEffect(() => {
        axios.get("http://localhost:3000/aggregateSale")
            .then(response => setAggregate(response.data))
            .catch(error =>
                console.log("Error fetching  final ", error)
            );
    }, []);
    return(
        <aggregatesale>
             <div>
     <h4>Customer Name: { total.customerName}</h4>
     <ul>
                {total.items && total.items.map((item, index) => (
                    <li key={index}>
                        <p>{item.itemName} ----- {item.quantity} * {item.itemPrice}</p>
                    </li>
                ))}
            </ul>

     <h3>Total Price: {total.Price }</h3>
     <h3>Tax Rate: { total.taxRate  }</h3>
     <h3>Paid: ${ total.totalPrice}</h3>
   </div>



        </aggregatesale>
    )
}
  export default Aggregatesale;