import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router'

function NavBar() {

    const cartProduct = useSelector((state) => { return state.cart })
    const [totalQuantity, setTotalQuantity] = useState(0)
    useEffect(() => {
        const totalQ = cartProduct.reduce((sum, item) => sum + item.quantity, 0);
        setTotalQuantity(totalQ);
        console.log(totalQ)
    }, [cartProduct]);
    return (
        <>
            <nav className="bg-gray-800 p-4 sticky top-0 z-50  ">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-white text-lg font-bold">
                        <b>E-commerce</b>
                    </div>
                    <div className=" text-[18px] font-semibold space-x-4">
                        <Link to="/" className="text-white hover:text-gray-300">Home</Link>
                        <Link to="/cart" className="text-white hover:text-gray-300 ">Cart <span className='bg-blue-900 px-5 py-1 rounded-full ' >{totalQuantity}</span> </Link>
                    </div>
                </div>


            </nav>
        </>
    )
}

export default NavBar