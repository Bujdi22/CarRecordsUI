<template>
<div>
  <header-toolbar>
    <template #start>
      <img src="../assets/logo.webp"
           class="small-logo"
           alt="logo"/>
    </template>
  </header-toolbar>
  <div class="landing">
    <div class="text">
      <h1>Welcome.</h1>
      <p>AutoJournal is the place for your vehicles.</p>
    </div>
    <div class="page-2">
      slsa
    </div>
  </div>
</div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import HeaderToolbar from "@/components/HeaderToolbar.vue";

export default defineComponent({
  components: {HeaderToolbar},
})
</script>

<style scoped lang="scss">
.small-logo{
  height: 2em;
  margin-left: 1em;
}
.landing {
  background-image: url('../assets/landing.jpg');
  height: calc(100vh - 4em);
  overflow-y: auto;
  background-size: cover;
  background-attachment: fixed;
  position: relative;

  .text {
    width: fit-content;
    position: absolute;
    bottom: 10%;
    right: 0;
    text-align: right;
    padding: 20px 50px;
    background: rgb(0,0,0, 0.5);
    h1 {
      font-size: 100px;
      background: #FCB53A;
      background: linear-gradient(to right, #a66400 -20%, #ffff00 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 20px;
      color: white;
    }
  }
  .page-2 {
   padding-top: 120vh;
    
  }
}
</style>