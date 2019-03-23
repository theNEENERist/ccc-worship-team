<template>
  <!-- <v-container grid-list-md text-xs-center>
    <v-layout>
      <v-flex align-self-center xs1>Search:</v-flex>
      <v-flex>
        <v-text-field clear-icon class="search-field"></v-text-field>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <v-flex xs4 v-for="song in songs" :key="song.id">
        <draggable
          :id="song.id"
          :group="{ name:'week', pull:'clone', put:'false' }"
          @start="drag=true"
          @end="drag=false"
          :move="chooseSong"
        >
          <v-card dark>
            <v-card-title primary-title>
              <p class="headline">{{ song.title }}</p>
            </v-card-title>
            <v-card-text>
              <strong>Last used:</strong> 1/15/2019
            </v-card-text>
          </v-card>
        </draggable>
      </v-flex>
    </v-layout>
  </v-container>-->
  <v-container>
    <h4>Song List</h4>
    <!-- <v-container grid-list-md text-xs-center> -->
    <v-layout>
      <v-flex align-self-center xs1>Search:</v-flex>
      <v-flex>
        <v-text-field clear-icon class="search-field" v-model="searchTerm"></v-text-field>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-layout row wrap>
      <!-- <v-list class="pa-3"> -->
      <v-flex fill-height xs4 v-for="song in filteredSongs" :key="song.id">
        <draggable
          :id="song.id"
          v-model="songs"
          :options="{group: { name:'songs', pull:'clone', put:'false'}}"
          @start="drag=true"
          @end="drag=false"
          :move="chooseSong"
        >
          <v-card class="ma-2 pa-2" dark>
            <v-card-title>
              <div class="headline">{{ song.title }}</div>
            </v-card-title>
          </v-card>
        </draggable>
      </v-flex>
      <!-- </v-list> -->
    </v-layout>
    <!-- </v-container> -->
  </v-container>
</template>

<script>
import draggable from "vuedraggable";
import EventBus from "../utils/event-bus";
import { log } from "util";

export default {
  name: "song-list",
  data: () => {
    return {
      searchTerm: "",
      songs: [
        { id: 0, title: "Oh Praise Him" },
        { id: 1, title: "God of Wonders" },
        { id: 2, title: "Lay Me Down" },
        { id: 3, title: "I'll Fly Away" },
        { id: 4, title: "This is Amazing Grace" },
        { id: 5, title: "Amazing Grace" },
        { id: 6, title: "Will the Circle be Unbroken" },
        { id: 7, title: "I Love You Lord" }
      ],
      targetSong: "",
      targetWeek: ""
    };
  },
  components: {
    draggable
  },
  computed: {
    filteredSongs() {
      if (this.searchTerm !== "") {
        return this.songs.filter(s =>
          s.title.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        return this.songs;
      }
    }
  },
  created() {
    EventBus.$on("weekSelected", week => {
      this.targetWeek = week;
      console.log("weekSelected " + this.targetSong);
      this.sendSongData(this.targetSong);
    });
  },
  methods: {
    // this starts the song drag and drop process
    chooseSong: function(event) {
      console.log("7");
      this.targetSong = event.from.id;
      return event.from.id;
    },
    sendSongData: function(id) {
      console.log("id " + id);
      var mySong = this.songs.filter(function(song) {
        return song.id == id;
      });
      var songData = {
        week: this.targetWeek,
        song: mySong
      };
      EventBus.$emit("sendingSong", songData);
    }
  }
};
</script>

<style scoped lang="scss">
.search-field {
  width: 300px;
}
</style>
