import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, Links, Navigate, useNavigate, useParams } from 'react-router'
import { addItem } from './store/cartSlice'
import styled from '@emotion/styled'

function ProductDetails() {

    const [data, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [filterdDataa, setFilteredDataa] = useState([])
    const { id } = useParams()
    useEffect(() => {
        async function fetchCategories() {
            const url = `https://fakestoreapi.com/products/${id}`
            const urlForAllData = `https://fakestoreapi.com/products/`
            try {
                const data = await axios.get(url)
                const Datas = await axios.get(urlForAllData)
                setData(data.data)
                setAllData(Datas.data)
                console.log(data)
            } catch (error) {
                console.error('Error fetching categories:', error)
            }
        }
        fetchCategories()
    }, [id])

    // Filter products by the category of the current product
    useEffect(() => {
        if (data.category && Array.isArray(allData)) {
            const filteredData = allData.filter((item) => item.category === data.category)
            // setFilteredDataa((prevData) => ({ ...prevData, categoryProducts: filteredData }))
            setFilteredDataa(filteredData)
        }
    }, [data, allData])




    // changeaTopProduct
    const navigate = useNavigate()
    function changeaTopProduct(Product) {
        setData(Product)
        navigate(`/details/${encodeURIComponent(Product.id)}`)
        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })
        }, 150);
    }

    //add to cart
    const dispatch = useDispatch((state => { return state.cart }))
    // function addItemToCart(data) {
    //     dispatch(addItem({ data }))
    // }

    const addItemToCart = (item) => {

        console.log("Item added to cart:", item)
        dispatch(addItem(item))
    }
    return (
        <div>
            <section className="py-8 bg-white md:py-16 dark:bg-gray-900 antialiased top-0 ">
                <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
                    <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
                        <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">

                            <img className="w-75 dark:hidden" src={data.image} alt="" />



                            <img className="w-full hidden dark:block" src={data.image} alt="" />

                        </div>

                        <div className="mt-6 sm:mt-8 lg:mt-0">
                            <h1
                                className="text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white"
                            >
                                {data.title}
                            </h1>
                            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">

                                <p
                                    className="text-2xl font-extrabold text-blue-600 sm:text-3xl dark:text-white"
                                >
                                    ${data.price}
                                </p>

                                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                                    <div className="flex items-center gap-1">
                                        {/* Dynamic rating stars */}
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-4 h-4 ${data.rating?.rate >= i ? 'text-yellow-300' : 'text-gray-300 dark:text-gray-600'}`}
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <p
                                        className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400"
                                    >
                                        ({data.rating?.rate || 0} rating)
                                    </p>
                                    <p
                                        className="text-sm font-medium leading-none text-gray-900   dark:text-white"
                                    >
                                        Quantity {data.rating?.count || 0}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                                <Link
                                    to='/cart'
                                    title=""
                                    className="cursor-pointer m-2 flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    role="button"
                                >
                                    <svg
                                        className="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24" >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                                        />
                                    </svg>
                                    Buy
                                </Link>

                                <div
                                    title=""
                                    className='cursor-pointer m-2 flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
                                    role="button"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        addItemToCart(data);
                                    }}
                                >
                                    <svg
                                        className="w-5 h-5 -ms-2 me-2"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >

                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                        />
                                    </svg>
                                    Add to cart
                                </div>
                            </div>


                            <hr className="my-6 md:my-8 border-gray-200 dark:border-gray-800" />

                            <p className="mb-6 text-gray-500 dark:text-gray-400">
                                {data.description}
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2  lg:grid-cols-4 xl:gap-x-8 p-5  ">
                {filterdDataa.map((products) => (
                    <div key={products.id} className="group relative z-0 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                        <div
                            onClick={() => changeaTopProduct(products)}

                            className="block"
                            style={{ textDecoration: 'none', color: 'inherit' }}
                        >
                            <div className="aspect-square w-full overflow-hidden bg-white p-4">
                                <img
                                    src={products.image}
                                    alt={products.title}
                                    className="h-full w-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="p-4">
                                <div className="mb-3">
                                    <h3 className="text-sm h-[20px] font-semibold text-gray-900 line-clamp-2 leading-tight">
                                        {products.title}
                                    </h3>
                                    <p className="text-lg font-bold text-blue-600 mt-2">${products.price}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4 px-4 pb-4">
                            <button
                                className="group z-50 flex-1 flex items-center justify-center bottom-0 py-2 px-3 text-xs font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    addItemToCart(products);
                                }}
                            >
                                <svg
                                    className="w-4 h-4 mr-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6"
                                    />
                                </svg>
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductDetails