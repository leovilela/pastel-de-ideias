<template>
    <div class="container--listItens">        
        <ul>
            <li v-for="(value, name, index) in listagem"  v-bind:key="index">
                <template v-if="value.title">                
                <div class="itemImage">
                    <img :src="imageUrlSaved(value.files)" />
                    
                    </div>
                <div class="container--form block-item">                    
                    <div class="d-fluid row headRed paddingMargin justify-content-between">
                        <span class="headRed--span">{{value.title}}</span>
                        <span class="headRed--span-price">{{ value.price | currency }}</span>
                    </div>

                    <div class="row paddingMargin padding bgWhite">            
                        <div class="col-xl-12 descriptionItem">
                            <span class="descriptionItem--span"><b>Sabor:</b> {{value.flavor}}</span><br>
                            <span class="descriptionItem--span"><b>Descrição:</b> {{value.description}}</span><br> 
                        </div>            
                    </div>
                    
                    
                </div>
               </template>
            </li>
        </ul>
    </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { moneyFormatter } from "~/utils/currency.utils";

export default {
    name: 'listagemItens',
    data() {
        return {
        };
    },
    
    filters: {
        currency(value) {
        if (!value) {
            return
        }
        return moneyFormatter(value)
        }
    },
    methods: {
        imageUrlSaved(el){            
            if(!el || (typeof el) === "undefined") {
                return require('~/assets/images/images@2x.png')
            }
            if(typeof el[0] === "undefined" ){
                return require('~/assets/images/images@2x.png')
            }
             
             return el[0].url
             
        }
    },
    computed: {        
        ...mapState({
            listagem: state => state.listagem
        })
    },

};
</script>

<style lang='scss'>
    @import './style.scss';
</style>
