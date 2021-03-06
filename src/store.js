import { createStore } from 'vuex';

const productModule = {
  state() {
    return {
      products: [
        {
          id: 'p1',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/Books_HD_%288314929977%29.jpg/640px-Books_HD_%288314929977%29.jpg',
          title: 'Book Collection',
          description:
            'A collection of must-read books. All-time classics included!',
          price: 99.99
        },
        {
          id: 'p2',
          image:
            'https://upload.wikimedia.org/wikipedia/en/thumb/c/c9/Tent_at_High_Shelf_Camp_cropped.jpg/640px-Tent_at_High_Shelf_Camp_cropped.jpg',
          title: 'Mountain Tent',
          description: 'A tent for the ambitious outdoor tourist.',
          price: 129.99
        },
        {
          id: 'p3',
          image:
            'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/640px-Good_Food_Display_-_NCI_Visuals_Online.jpg',
          title: 'Food Box',
          description:
            'May be partially expired when it arrives but at least it is cheap!',
          price: 6.99
        }
      ]
    };
  },
  namespaced: true
};

const cartModule = {
  state() {
    return {
      cart: { items: [], total: 0, qty: 0 }
    };
  },
  namespaced: true,
  mutations: {
    addProductToCart(state, payload) {
      const productInCartIndex = state.cart.items.findIndex(
        ci => ci.productId === payload.id
      );

      if (productInCartIndex >= 0) {
        state.cart.items[productInCartIndex].qty++;
      } else {
        const newItem = {
          productId: payload.id,
          title: payload.title,
          image: payload.image,
          price: payload.price,
          qty: 1
        };
        state.cart.items.push(newItem);
      }
      state.cart.qty++;
      state.cart.total += payload.price;
    },
    removeProductFromCart(state, payload) {
      const productInCartIndex = state.cart.items.findIndex(
        cartItem => cartItem.productId === payload
      );
      const prodData = state.cart.items[productInCartIndex];
      state.cart.items.splice(productInCartIndex, 1);
      state.cart.qty -= prodData.qty;
      state.cart.total -= prodData.price * prodData.qty;
    }
  },
  actions: {
    addToCart(context, payload) {
      const prodId = payload.id;
      const products = context.rootState.product.products;
      const product = products.find(product => product.id === prodId)
      context.commit('addProductToCart', product)
    }
  },
  getters: {
    cartTotal(state) {
      return state.cart.total.toFixed(2)
    },
    quantity(state) {
      return state.cart.qty;
    }
  }
};

const authModule = {
  state() {
    return { isLoggedIn: false };
  },
  namespaced: true,
  mutations: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    }
  }
};
export default createStore({
  modules: { product: productModule, cart: cartModule, auth: authModule },
  state() {
    return {};
  }
});
