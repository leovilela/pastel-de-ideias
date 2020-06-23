<template>
    <div>
    <form class="container--form" >
        <div class="d-fluid row head paddingMargin justify-content-between">
            <div class="col-xs-9">
                <span class="head--span">Monte aqui o seu cardápio. O que você está esperando?</span>
            </div>
            <div class="checkbox col-xs-3  typePadding justify-content-end" > 
                <div class="container--type">
                    <span class="head--type">Comida</span>
                        <div class="switch__container">
                        <input id="switch-shadow" class="switch switch--shadow" v-model="type" type="checkbox" />
                        <label for="switch-shadow"></label>
                        </div>            
                    <span class="head--type">Bebida</span>
                </div>                
            </div>            
        </div>
        <div class="row paddingMargin bgTwoColors">
                <div class="col-xl-5">
                    <input type="text" name="titulo" v-model.trim="$v.title.$model" placeholder="Título do pedido"  class="inputText upLevel"  :class="{ 'form-group--error': $v.title.$error }" />
                </div>
                <div class="col-xl-5">
                    <input type="text" name="sabor" v-model.trim="$v.flavor.$model" placeholder="Sabor"  class="inputText upLevel"  :class="{ 'form-group--error': $v.flavor.$error }" />
                </div>
                <div class="col-xl-2">  
                    <money v-model.trim="$v.price.$model" name="valor" class="inputText upLevel" v-bind="money" :class="{ 'form-group--error': enableCpPrice }"></money>
                </div>                   
        </div>

        <div class="row paddingMargin padding bgWhite">            
            <div class="col-xl-12">                
                <textarea placeholder="Descricao" v-model.trim="description"  class="textArea upLevel" />
            </div>            
        </div>
        
         <div class="row paddingMargin padding bgWhite">
            <div class="col-xl-12">
                    

                    <file-upload
                    extensions="gif,jpg,jpeg,png,webp"
                    accept="image/png,image/gif,image/jpeg,image/webp" 
                    class="col-xl-12 container--upload"                 
                    post-action="/upload/post"                    
                    :drop="true"
                    :drop-directory="true"
                    v-model="files"
                    @input-filter="inputFilter"
                    @input-file="inputFile"
                    ref="upload">     
                    
                    <div class="drop" >
                        <div v-if="!files.length">
                        <div v-if="$refs.upload && $refs.upload.dropActive" class="drop-active">
                           <h3> Arraste e solte o arquivo de imagem desejado </h3>
                        </div>
                        <div class="col-xl-12" ><img src="~/assets/images/upload-image.png" width="43" height="39"></div>
                        <div class="col-xl-12" ><span>Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar a pasta</span></div>
                        </div>
                        <img :src="files.length ? files[0].url : ''" style="width: 150px; height: auto" />
                    </div>
                    </file-upload>
                </div>
        </div>

        

    </form>
    <div class="row paddingMargin padding panel--buttons">
            <div  class="d-flex col-xl-12 justify-content-center panel--btn">
                <div class="d-flex col-xl-6 justify-content-between">
                    <button class="panel--btn-cancel btn btn-danger rounded-pill" @click="clearForm()">LIMPAR</Button>
                    <button class="panel--btn-submit btn btn-warning rounded-pill" @click="newItem()" :disabled="$v.$invalid">CADASTRAR</Button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {Money} from 'v-money';
import VueUploadComponent from 'vue-upload-component'
import {
  required, minLength, minValue, maxLength
} from "vuelidate/lib/validators";

import { mapState, mapActions, mapMutations } from "vuex";
export default {
    name: "formPedido",
    data () {
      return {
        price: 0,
        files: [],
        title: null,
        flavor:  null,
        type: false,
        description:  null,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: '',
          precision: 2,
          masked: false
        },
      }
    },
    components: {
      Money,
      FileUpload: VueUploadComponent
    },
    computed: {        
        ...mapState({
            listagem: state => state.listagem
        }),
        enableCpPrice(){
            if(this.$v.price.$model != 0) {
                this.$v.price.$touch();
            }
        },
    },
    methods:{
        ...mapActions({
            insertItem: "insertItem"
        }),
        newItem(){
            if(this.$v.$invalid) { return }
            let objc = {
                price: this.price,
                files: this.files,
                title: this.title,
                flavor:  this.flavor,
                type: this.type,
                description:  this.description
            }
            this.insertItem(objc);  
            this.clearForm();          
        },
        clearForm(){            
            this.price = 0;
            this.files = [];
            this.title = null;
            this.flavor =  null;
            this.type = false;
            this.description =  null;
            this.$v.$reset();
        },
        onFileSelected(event){
            console.log(event)
        },
        createBase64Image(fileObject) {
            console.log({fileObject});
            const reader = new FileReader();
            reader.onload = (e) => {
                this.image = e.target.result;
                reader.readAsBinaryString(fileObject);
            };
        },
        inputFilter(newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                if (!/\.(jpg|jpeg|png)$/i.test(newFile.name)) {
                this.alert('Your choice is not a picture')
                return prevent()
                }
            }
            /*const blb = new Blob([response.data], { type: "text/plain" });
                 const reader = new FileReader(); */
            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                newFile.url = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                newFile.url = URL.createObjectURL(newFile.file);
                newFile.blob = this.createBase64Image(newFile);
                }
            }
            },
        inputFile: function (newFile, oldFile) {
            if (newFile && oldFile && !newFile.active && oldFile.active) {
                // Get response data
                console.log('response', newFile.response)
                if (newFile.xhr) {
                //  Get the response status code
                console.log('status', newFile.xhr.status)
                }
            }
        },
    },
    validations: {
        title: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(60)
        },
        flavor: {
            required,
            minLength: minLength(3),
            maxLength: maxLength(60)
        },
        price: {
            required,
            minValue: minValue(0.01)
        }
    }
    
};
</script>

<style lang='scss'>
    @import './style.scss';
</style>
