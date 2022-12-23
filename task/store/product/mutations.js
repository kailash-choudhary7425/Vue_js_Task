export const productSync = (state, payload) => {
    state.products = payload
}
export const cartSync = (state, payload) => {
    state.cartProducts = payload
}