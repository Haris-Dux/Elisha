import { createSlice } from "@reduxjs/toolkit";
import womenData from "./WomenImages/WomenData";

const initialState = {
    cart: [],
    item: womenData,
    totalQuantity: 0,
    totalPrice: 0,
    shippingCost: 0,
};

export const WomenSlice = createSlice({
    name: "WomenSlice",
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = [];
            state.totalQuantity = null;
            state.totalPrice = null;
        },

        addToCart: (state, action) => {
            const { productWithSize } = action.payload;

            const existingItemIndex = state.cart.findIndex(
                (item) => item.id === productWithSize.id && item.selectedSize === productWithSize.selectedSize
            );

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex].quantity += 1;
            } else {
                state.cart.push({
                    ...productWithSize,
                    quantity: 1,
                });
            }
        },


        // Update the getCartTotal action
        getCartTotal: (state) => {
            const { totalPrice, totalQuantity } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, quantity } = cartItem;
                    const itemTotal = price * quantity;
                    cartTotal.totalPrice += itemTotal;
                    cartTotal.totalQuantity += quantity;
                    return cartTotal;
                },
                {
                    totalPrice: 0,
                    totalQuantity: 0,
                }
            );

            // Define the shipping cost threshold (e.g., 3000)
            const shippingCostThreshold = 3000;
            const shippingCost = totalPrice < shippingCostThreshold ? 300 : 0;

            // Update the state with the total price and shipping cost
            state.totalPrice = totalPrice;
            state.totalQuantity = totalQuantity;
            state.shippingCost = shippingCost; // Update the shipping cost in the state
        },



        removeItem: (state, action) => {
            const { id, selectedSize } = action.payload;
            state.cart = state.cart.filter(
                (item) => !(item.id === id && item.selectedSize === selectedSize)
            );  
        },

        increaseItemQuantity: (state, action) => {
            const { id, selectedSize } = action.payload;

            // Find the item in the cart
            const itemToUpdate = state.cart.find(
                (item) => item.id === id && item.selectedSize === selectedSize
            );

            if (itemToUpdate) {
                // Increase the quantity of the item
                itemToUpdate.quantity += 1;
            }
        },


        decreaseItemQuantity: (state, action) => {
            const { id, selectedSize } = action.payload;

            // Find the item in the cart that matches the ID and size
            const itemToDecrease = state.cart.find(
                (item) => item.id === id && item.selectedSize === selectedSize
            );

            if (itemToDecrease && itemToDecrease.quantity > 1) {
                itemToDecrease.quantity -= 1;
            } else {
                // If the quantity is 1 or less, remove the item from the cart
                state.cart = state.cart.filter(
                    (item) => !(item.id === id && item.selectedSize === selectedSize)
                );
            }
        },
    },
});


export const {
    addToCart,
    getCartTotal,
    removeItem,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
} = WomenSlice.actions;

export default WomenSlice.reducer;