export default {  
  insertItem(state, payload) {    
    state.listagem.unshift(payload);    
  },  
  clearListagem(state){
    state.listagem = [];
  }
};
