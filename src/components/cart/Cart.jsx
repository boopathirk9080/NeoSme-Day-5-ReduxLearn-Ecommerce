import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router'
import { removeCartItem, incrementQuantity, decrementQuantity, removeAll } from '../store/cartSlice'

function Cart() {

    const cartProduct = useSelector((state) => { return state.cart })
    const dispatch = useDispatch((state) => { return state.cart })
    console.log(cartProduct);
    function deleteProduct(id) {
        dispatch(removeCartItem({ id }))
        console.log("Delete product with id:", id);
    }
    //increment
    function incrementQuantityincart(id) {
        dispatch(incrementQuantity({ id }))
    }
    //decrement
    function DecrementQuantityincart(id) {
        dispatch(decrementQuantity({ id }))
    }

    //Total Amount
    const [totalAmount, setTotalAmount] = useState(0)

    useEffect(() => {
        const total = cartProduct.reduce((sum, item) => sum + item.price * item.quantity, 0)
        setTotalAmount(total)
    }, [cartProduct])

    function DeleteAllProducts(cartProduct) {
        dispatch(removeAll({ cartProduct }))
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-8">
            {cartProduct.length > 0 ? (
                <div className="w-full max-w-2xl bg-white shadow rounded-lg p-6">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-xl font-bold text-gray-800">
                            Total: <span className="text-blue-700">${totalAmount.toFixed(2)}</span>
                        </p>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">

                            Proceed to Buy
                        </button>
                    </div>
                    <hr className='mb-2 border-[#24bec938] border-[1.2px] ' />
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-bold mb-4 text-gray-700">Items in Cart</h3>
                        <button onClick={() => DeleteAllProducts(cartProduct)} className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition' >Remove All</button>
                    </div>

                    <ul className="space-y-4">
                        {cartProduct.map((item) => (
                            <li key={item.id} className="flex items-center justify-between bg-gray-100 rounded p-4">
                                <div   className="flex items-center gap-4">
                                  <Link  to={`/details/${encodeURIComponent(item.id)}`} >
                                    <img
                                        className="h-16 w-16 object-contain bg-white rounded"
                                        src={item.image}
                                        alt={item.title}
                                    />
                                  </Link>
                                    <div>
                                        <h4 className="font-medium text-gray-800">{item.title}</h4>
                                        <p className="text-gray-500 text-sm">Price: ${item.price}</p>
                                        <div className="flex items-center mt-2">
                                            <button
                                                onClick={() => DecrementQuantityincart(item.id)}
                                                className="bg-gray-300 text-gray-700 w-7 h-7 rounded hover:bg-gray-400"
                                            >-</button>
                                            <span className="mx-3 text-gray-700">{item.quantity}</span>
                                            <button
                                                onClick={() => incrementQuantityincart(item.id)}
                                                className="bg-gray-300 text-gray-700 w-7 h-7 rounded hover:bg-gray-400"
                                            >+</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="font-bold text-gray-800 mb-2">${(item.price * item.quantity).toFixed(2)}</span>
                                    <button
                                        onClick={() => deleteProduct(item.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                                    >Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="bg-white shadow rounded-lg p-8 w-full max-w-md text-center">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">Cart</h2>
                    <p className="text-gray-600 mb-6">The cart is empty.</p>
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-semibold">
                            Add Products to Cart
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Cart