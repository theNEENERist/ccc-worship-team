<template>
  <div>
    <h4>Weeks</h4>
    <v-flex v-for="(value, key) in weeks">
      <v-card class="ma-2 pa-2">
        <draggable
          :id="key"
          v-model="songs"
          :options="{group:'songs'}"
          @start="drag=true"
          @end="drag=false"
          @add="newSong"
        >
          <v-card-title class="headline">{{ capLetter(value.title) }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="value.show = !value.show">
              <v-icon>{{ value.show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
            </v-btn>
          </v-card-actions>
        </draggable>

        <draggable
          :id="value.id"
          v-model="value.songs"
          :group="{ name:'week', pull:'false', put:'clone' }"
          @start="drag=true"
          @end="drag=false"
        >
          <v-slide-y-transition group>
            <v-card :key="song[0].id" v-for="song in value.songs" v-if="value.show">
              <v-flex>
                <v-card-title class="headline">{{ song[0].title }}</v-card-title>
              </v-flex>
            </v-card>
          </v-slide-y-transition>
        </draggable>
      </v-card>
    </v-flex>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import EventBus from "../utils/event-bus";
import { log } from "util";

export default {
  data: () => {
    return {
      songs: [],
      weeks: [
        {
          id: 0,
          title: "1/1/2019",
          songs: [
            // { id: 0, title: "God of Wonders" },
            // { id: 1, title: "This is Amazing Grace" }
          ],
          show: false
        },
        {
          id: 1,
          title: "5/5/2019",
          songs: [
            // { id: 0, title: "God of Wonders" },
            // { id: 1, title: "This is Amazing Grace" }
          ],
          show: false
        },
        {
          id: 2,
          title: "12/3/2019",
          songs: [
            // { id: 0, title: "God of Wonders" },
            // { id: 1, title: "This is Amazing Grace" }
          ],
          show: false
        }
      ]
    };
  },
  components: {
    draggable
  },
  created() {
    EventBus.$on("sendingSong", songData => {
      // Ex: {"day":"thursday","recipe":{"id":4,"title":"Sesame Pork Noodle"}}
      console.log("song", songData.song[0]);
      this.weeks[songData.week].songs.push(songData.song);
      this.weeks[songData.week].show = true;
    });
  },
  methods: {
    removeSong: function(id) {
      this.songs = this.songs.filter(function(song) {
        return song.id != id;
      });
    },
    capLetter: function(input) {
      return input.charAt(0).toUpperCase() + input.slice(1);
    },
    // this is called when a new recipe is dropped into a day
    newSong: function(event) {
      console.log("newRecipe " + event.to.id);
      EventBus.$emit("weekSelected", event.to.id);
    }
  },
  computed: {
    weeksList: {
      get() {
        return this.weeks;
      },
      set() {
        this.weeks = list;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.options {
  justify-content: flex-end;
  flex-direction: row;
  align-items: center;
  .icon {
    margin-right: 5px;
  }
}
</style>
