<template>
  <div class="home">
    <nav class="navbar navbar-dark bg-dark">
      <div class="container-fluid d-flex space-between align-items-center">
        <img class="mb-0" src="https://ikcount.com/static/images/aforo/logo_IKCount_blanco_aborde_ORIG.svg" style="width:8rem;">
        <div class="navbar-brand d-flex align-items-center mb-0 me-3 ms-auto" >
          <h6 class="align-self-center my-auto"><font-awesome-icon :icon="['fas','user']" class="me-2"/>{{privileges.clients_info[0].email}}</h6>
          <button type="button" class="btn btn-danger ms-3" @click="logOut" v-if="authState==true"><font-awesome-icon :icon="['fas','times']" /></button>
        </div>
      </div>
    </nav>
    <div class="container-fluid">
      <div class="card-header my-2">
        <h1>{{privileges.locations[0].location_name}}</h1>
      </div>
      <div class="container">
        <div class="row">
          <div class="card col-12 col-md-5 mx-3 my-3">
              <pie-chart :donut="true"  suffix="%" :colors="[color]" :data="{ocupado, libre}" legend="bottom"></pie-chart>
              <h3>{{ocupado}}% Ocupado</h3>
          </div>
          <div class="card d-flex justify-content-center col-12 col-md-5 mx-3 my-3">
            <div class="row my-auto col-12 d-flex justify-content-around">
              <button type="button" class="btn btn-success ms-3 py-4 col-4" @click="entrada()"><font-awesome-icon :icon="['fas','plus']" /></button>
              <button type="button" class="btn btn-danger ms-3 col-4" @click="salida()"><font-awesome-icon :icon="['fas','minus']" /></button>
            </div>
            <div class="row mb-3 mt-auto d-flex justify-content-around">
              <h6 class="col-6">Aforo actual: {{current_aforo}}</h6>
              <h6 class="col-6">Capacidad máxima: {{max_capacity}}</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  name: 'Home',
  computed:{
    ...mapState(["accessData",'authState','current_aforo', 'max_capacity']),
    privileges(){
      return this.accessData.privileges
    },
    ocupado(){
      let ocupado= (this.current_aforo * 100)/ this.max_capacity
      return ocupado
    },
    libre(){
      let libre = 100 - this.ocupado
      return libre
    },
    color(){
      let ocupado = this.ocupado
      let color
      if(ocupado<=75){
        color = "#32916D"
      }
      else{
        if(ocupado<=95){
          color = "#F4A100"
        }
        else{
          color = "#E81500"
        }
      }
      return color
    }
  },
  data(){
    return{

    }
  },
  methods:{
    ...mapActions(['regMov','logout',]),
    entrada(){
      let token= this.accessData.accessToken
      let privi= this.privileges
      let params={
        type: "manual-add",
        quantity: 1,
        client: privi.clients_info[0].client_id,
        location: privi.locations[0].location_id,
        macaddress: privi.devices[0].mac_address,
        username: privi.clients_info[0].email,
        email: privi.clients_info[0].email
        }
      this.regMov({token, params})
    },
    salida(){
      let token= this.accessData.accessToken
      let privi= this.privileges
      let params={
        type: "manual-sub",
        quantity: 1,
        client: privi.clients_info[0].client_id,
        location: privi.locations[0].location_id,
        macaddress: privi.devices[0].mac_address,
        username: privi.clients_info[0].email,
        email: privi.clients_info[0].email
        }
      this.regMov({token, params})
    },
    logOut(){
      this.logout()
      this.$router.push({name:'Login'}).privileges
    },
  },
}
</script>
