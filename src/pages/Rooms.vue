<template>
    <div class="rooms-container">
        <div class="room" v-for="(room, index) in rooms" :key="index" @click="enterRoom(room.id)">
            <p>Room 00{{ index+1 }}</p>
        </div>
    </div>
</template>

<script>
import { db } from '@/main'

export default {
    data () {
        return {
            rooms: []
        }
    },

    firestore () {
        return {
            rooms: db.collection('rooms')
        }
    },

    methods: {
        enterRoom (id) {
            this.addPlayer(id)
            this.$router.push(`/room/${id}`)    
        },

        addPlayer (id) {
            db.collection('rooms').doc(id).collection('players').add({
                name: this.$store.getters.name,
                cards: []
            })
        }
    }
}
</script>


<style lang="scss" scoped>
.rooms-container {
    .room {
        cursor: pointer;
        width: 150px;
        height: 150px;
        border-radius: 5%;
        border: 1px black solid;
    }
}
</style>
