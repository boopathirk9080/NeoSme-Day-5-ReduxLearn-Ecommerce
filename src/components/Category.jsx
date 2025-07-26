import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router'
import { addItem } from './store/cartSlice'


function Category() {
    const [data, setData] = useState([])
    const [allData, setAllData] = useState([])
    const [filiteredCatagoryHeading, setFiliteredCatagoryHeading] = useState([])
    const [activeCategory, setActiveCategory] = useState("All")
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function fetchCategories() {
            const url = "https://fakestoreapi.com/products"
            try {
                const data = await axios.get(url)
                console.log(data.data)
                setData(data.data)
                setAllData(data.data)
                setFiliteredCatagoryHeading([...new Set(data.data.map((item) => item.category))])
                setLoading(true);
            } catch (error) {
                console.error('Error fetching categories:', error)
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])

    function filterASpecificCatagory(category) {
        if (category === "All") {
            setData(allData)
        } else {
            const filteredData = allData.filter((item) => item.category === category)
            setData(filteredData)
        }
        setActiveCategory(category)

    }

    // Redux
    const dispatch = useDispatch((state => { return state.cart }))

    // Add item to cart
    const addItemToCart = (item) => {

        console.log("Item added to cart:", item)
        dispatch(addItem(item))
    }
    //fetch data
    if (loading === false) {
        return (
            <Container sx={{ textAlign: "center", mt: 5 }}>
                <CircularProgress />
            </Container>
        );
    }
    else
        return (
            <div className='bg-[#f5f5f5]'>
                <div className='p-5 bg-[#fff]'>
                    <div className='text-center mb-5'>
                        <h1 className='text-2xl font-medium'>Filter Option with Category Wise</h1>
                    </div>


                    <ul className='mb-4 flex flex-wrap items-center font-semibold text-[#0c1e1d] justify-center'>
                        <button
                            onClick={() => filterASpecificCatagory("All")}
                            className={`px-2 py-1 mr-2 rounded border-none m-2 ${activeCategory === "All" ? "bg-blue-900 text-white" : "bg-gray-300"}`}>
                            All
                        </button>
                        {filiteredCatagoryHeading.map((category) => (
                            <button
                                onClick={() => filterASpecificCatagory(category)}
                                className={`px-2 py-1 mr-2 rounded cursor-pointer m-2 border-none ${activeCategory === category ? "bg-blue-900 text-white" : "bg-gray-300"}`}
                                key={category}>
                                {category}
                            </button>
                        ))}
                    </ul>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 p-5">
                        {data.map((products) => (
                            <div key={products.id} className="group relative z-0 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                                <Link
                                    to={`/details/${encodeURIComponent(products.id)}`}
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
                                </Link>
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
            </div>
        )
}

export default Category