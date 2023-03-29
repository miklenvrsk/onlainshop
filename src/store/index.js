/* eslint-disable */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import { API_BASE_URL } from '@/config';

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    cardProducts: [],
    userAccessKey: null,
    cardProductsData: [],
    orderInfo: null,

  },
  mutations: {
    updateOrderInfo(state,orderInfo) {
      state.orderInfo = orderInfo;
    },
    resetCart(state) {
      state.cardProducts = [];
      state.cardProductsData = [];
    },
    updateCardProductAmount(state, { productId, amount }){
      const item = state.cardProducts.find( item => item.productId === productId );
      if(item){
        item.amount = amount;
      }

    },
    deleteCardProduct(state, productId) {
      state.cardProducts=state.cardProducts.filter(item => item.productId !== productId);

    },
    updateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;

    },
    updateCardProductsData(state, items) {
      state.cardProductsData = items;
    },
    syncCartProducts(state) {
      state.cardProducts = state.cardProductsData.map(item => {
        return {
          productId: item.product.id,
          amount: item.quantity,
        }
      })
    }
  },
  getters: {
    cartDetailProducts(state) {
        return state.cardProducts.map( item => {
          const product = state.cardProductsData.find(p => p.product.id === item.productId).product;
          return {
            ...item,
            product:{
              ...product,
              img: product.image.file.url,

            },


          };
        });
    },
    cartTotalPrice( state, getters ) {
      return getters.cartDetailProducts.reduce(( acc, item ) => ( item.product.price * item.amount ) + acc, 0 );

    },
  },
  actions: {
    loadOrderInfo(context, orderId) {
        return axios.get(API_BASE_URL +'/api/orders'+orderId, {
          params: {
            userAccessKey: context.state.userAccessKey,
          },
        })
          .then(response => {
            context.commit('updateOrderInfo', response.data)
          });
    },
    loadCard(context) {
     return  axios.get(API_BASE_URL +'/api/baskets', {
        params:{
          userAccessKey: context.state.userAccessKey,
        },


      })
        .then(responce => {
          if( !context.state.userAccessKey ) {
            localStorage.setItem('userAccessKey', responce.data.user.accessKey);
            context.commit('updateUserAccessKey', responce.data.user.accessKey);
            console.log("получили ключ");
          }
          context.commit('updateCardProductsData', responce.data.items);
          context.commit('syncCartProducts');
        })


    },
    addProductToCart(context, {productId, amount}) {
       return  (new Promise(resolve => setTimeout(resolve,2000)))
         .then(()=>{
         return axios.post(API_BASE_URL + '/api/baskets/products', {
             productId: productId,
             quantity: amount,
           },{
             params: {
               userAccessKey: context.state.userAccessKey,
             }
           })
             .then(responce => {
               context.commit('updateCardProductsData', responce.data.items);
               context.commit('syncCartProducts');
             })
         })

    },
    updateCartProductAmount(context, {productId, amount}) {
      context.commit('updateCardProductAmount', {productId, amount})
        if(amount<1){
          return ;
        }
      return axios.put(API_BASE_URL + '/api/baskets/products', {
        productId: productId,
        quantity: amount,
      },{
        params: {
          userAccessKey: context.state.userAccessKey,
        }
      })
        .then(responce => {
          context.commit('updateCardProductsData', responce.data.items);
        })
        .catch(()=>context.commit('syncCartProducts'))
    },
    deleteCardProduct(context, productId) {
      context.commit('deleteCardProduct', productId);
      return axios.delete(API_BASE_URL + '/api/baskets/products',{
        params: {
          userAccessKey: context.state.userAccessKey,
        },
        data: {
          productId: productId,
        }
      })
        .then(responce => {
          context.commit('updateCardProductsData', responce.data.items);
        })
    }


  }
});
