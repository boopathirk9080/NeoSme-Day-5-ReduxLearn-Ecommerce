import { createSlice } from "@reduxjs/toolkit";

const dateFromWeb = JSON.parse(localStorage.getItem('cart'))
const cartSlice = createSlice({
    name: 'cart',
    initialState: dateFromWeb || [],
    reducers: {
        addItem(state, action) {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
                console.log(existingItem.quantity)
            } else
                state.push({ ...action.payload, quantity: 1 })
            localStorage.setItem("cart", JSON.stringify([...state]))
        },
        removeCartItem(state, action) {

            const newProducts = state.filter(item => item.id !== action.payload.id)
            localStorage.setItem("cart", JSON.stringify([...newProducts]))
            return newProducts
        },
        incrementQuantity(state, action) {
            const item = state.find(item => item.id === action.payload.id)
            if (item) {
                item.quantity += 1
                localStorage.setItem("cart", JSON.stringify(...[state]))
            }
        },
        decrementQuantity: (state, action) => {
            const item = state.find(i => i.id === action.payload.id);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
                localStorage.setItem("cart", JSON.stringify(...[state]))
            }

        },
        removeAll() {
            localStorage.setItem("cart", JSON.stringify([]));
            return []
        }

    }
})
export default cartSlice.reducer
export const { addItem, removeCartItem, incrementQuantity, decrementQuantity, removeAll } = cartSlice.actions