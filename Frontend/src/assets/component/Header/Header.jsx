import React from "react";
import { Link } from "react-router-dom";





function  Header(){
    return(
        <header>

            <ul>
                <li><Link>Home </Link></li>
                <li><Link>customer list </Link></li>
                <li><Link> item list </Link></li>
                <li><Link> sales</Link></li>
                
            </ul>

        </header>
    )
}

export default Header;