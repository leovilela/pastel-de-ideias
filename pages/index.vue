<template>
  <kinesis-container>
  <div  class="container-fluid">
    <div>      
      <div class="row justify-content-center camada_1">
        <kinesis-element :strength="10" type="depth">
          <LogoPrincipal class="logoPrincipal"></LogoPrincipal>
        </kinesis-element> 
      </div>      
      <div class="row justify-content-center camada_2 container--pasteis">
        <div class="d-flex formPedido justify-content-between container--panel-pasteis">
        
          <div class="pastel1"><kinesis-element :strength="15" type="depth">
               <img src="~/assets/images/pastel-paralax.png" class="paralax-responsive">
              </kinesis-element></div>
        
        </div>
      </div>
      <div class="row justify-content-center camada_3 container--pasteis">
        <div class="d-flex formPedido justify-content-between container--panel-pasteis">
          
          <div class="pastel2">
            <kinesis-element :strength="5" type="depth">
              <img src="~/assets/images/pasteis-img.png" class="img-fluid">
            </kinesis-element> 
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <FormPedido class="formPedido"></FormPedido>
      </div>      
      <div  class="row justify-content-center camada_4 divItens" v-if="listagem.length > 1">Veja como será apresentado ao cliente</div>
      <div class="row justify-content-center camada_4">
        <ListagemItens></ListagemItens>
      </div>

    </div>
    
  </div>
  </kinesis-container>
</template>

<script>
import { mapState } from "vuex";
import { KinesisContainer, KinesisElement} from "vue-kinesis";
import LogoPrincipal from "~/components/logoPrincipal";
import FormPedido from "~/components/formPedido";
import ListagemItens from "~/components/listagemItens";

export default {
  
  components: {            
    LogoPrincipal,
    KinesisContainer,
    KinesisElement
  },
  
  computed: {        
        ...mapState({
            listagem: state => state.listagem
        }),
    },

  methods: {
    testeModal(){
      this.$swal({
          title: "Desculpe",
          text: "Tivemos um problema\n Por favor, tente novamente, se o problema persistir entre em contato com a Listo.",
          icon: "error",
          confirmButtonText: "OK",
          showCloseButton: true,
        });
    }
  },

  data () {
      return {        
      }
    }

  
}
</script>


<style lang='scss'>
  @import './style.scss';
</style>
