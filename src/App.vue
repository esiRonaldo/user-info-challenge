<template>
  <v-app>
    <v-main class="c">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App'
})
</script>
<style>
#app {
  font-family:'Ubuntu',sans-serif;
  background-color: #E8EAF6;
}
.btn-white {
  padding: 8px 22px !important;
  color: #78909C !important;
  background-color: #fff !important;
  border: 1px solid #78909C !important;
  border-radius: 5px;
}

.btn-blue {
  padding: 8px 22px !important;
  color: #fff !important;
  background-color: #78909C !important;
  border: 1px solid #78909C !important;
  border-radius: 5px;
}
</style>
