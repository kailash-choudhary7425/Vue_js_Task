export const setProducts = ({ commit }, payload) => {
    commit('productSync', payload)
}
export const setCart = ({ commit }, payload) => {
    commit('cartSync', payload)
}