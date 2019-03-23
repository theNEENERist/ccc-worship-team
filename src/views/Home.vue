<template>
  <div class="home">
    <img alt="Vue logo" style="width: 300px;" src="../assets/finalLogo.jpg">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->
    <main>
      <v-container fluid fill-height>
        <v-layout>
          <v-card id="weeks-card" class="ma-2 pa-2" height="100%" width="30%">
            <WeekPicker></WeekPicker>
            <!-- <recipes></recipes> -->
          </v-card>
          <v-card id="song-list-card" class="ma-2 pa-2" height="100%">
            <SongList></SongList>
            <!-- <mealplan></mealplan> -->
          </v-card>
        </v-layout>
      </v-container>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import SongList from "@/components/SongList.vue";
import WeekPicker from "@/components/WeekPicker.vue";
import recipes from "@/components/recipes.vue";
import mealplan from "@/components/mealplan.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    SongList,
    WeekPicker,
    recipes,
    mealplan
  }
};
</script>
