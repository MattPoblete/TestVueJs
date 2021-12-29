<template>
  <div class="container-fluid d-flex flex-column justify-content-center align-items-center bg-dark">
    <div class="container">
     <img class="col-5 mb-5" src="https://ikcount.com/static/images/aforo/logo_IKCount_blanco_aborde_ORIG.svg">
    </div>
    <div class="container d-flex justify-content-center">
      <div class="card col-12 col-md-8 col-lg-6">
        <div class="card-header">
          Log-In
        </div>
        <div class="card-body">
          <form>
            <div class="d-flex align-items-center mb-3">
              <label for="user" class="form-label text-start col-3">Email o usuario:</label>
              <input v-model="usr" type="text" class="form-control" id="user" aria-describedby="emailHelp">            </div>
            <div class=" d-flex align-items-centermb-3">
              <label for="password" class="form-label col-3 text-start">Contraseña:</label>
              <input v-model="pass" type="password" class="form-control ms-0" id="password">
            </div>
            <button  class="btn btn-primary mt-3" @click.prevent="autentificar()">Iniciar Sesion</button>
          </form>
          
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import {mapActions} from 'vuex'


export default {
  name: 'Login',
  computed:{
    credenciales(){
      let creds = btoa(`${this.usr}:${this.pass}:IKLAB005`)
      return creds
    }
  },
  data(){
    return{
      usr:"clicker1.demo",
      pass:"admin123",
    }
  },
  methods:{
    ...mapActions(['getAuth']),
    autentificar(){
        this.getAuth({auth:this.credenciales, privilegesDetail:true})
        .then(() => setTimeout(()=>{
                this.$router.push({name:'Home'})
                },1500)
        )
        .catch((err)=>alert(err))
    }
  }
}
</script>
<style scoped>
.container-fluid{
  height: 100vh;
}
</style>