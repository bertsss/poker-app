<template>
    <div class="room">
        <button @click="shuffle()">Shuffle!</button>
        <button @click="drawOnPlayer()">Draw Your Cards!</button>
        <button @click="drawOnTable(room.tableCards.length > 0 ? 1 : 3)" v-if="room.tableCards && room.tableCards.length < 5">Draw {{ drawTitle }}</button>
        
        <p>Remaining cards: {{ room.remainingCards }}</p>
        
        <div class="player" v-for="(player, index) in players" :key="index">
            <p>{{ player.name }}</p>
            <button @click="leaveRoom(player.id)">Leave Room</button>
            <div class="my-card" v-if="player.cards">
                <img :src="item.image" v-for="(item, index) in player.cards" :key="index">
            </div>
        </div>

        <div class="table-cards" v-if="room.tableCards">
            <p>Table Cards:</p>
            <img :src="item.image" v-for="(item, index) in room.tableCards" :key="index">
        </div>
    </div>
</template>

<script>
import firebase from 'firebase/app'
import { db } from '@/main'

export default {
    props: ['id'],

    data () {
        return {
            players: [],
            room: {}
        }
    },

    computed: {
        drawTitle () {
            if (this.room.tableCards) {
                if (this.room.tableCards.length < 3) return 'Flop'
                if (this.room.tableCards.length === 3) return 'Turn'
                if (this.room.tableCards.length === 4) return 'River'
            } else {
                return ''
            }
       }
    },

    firestore () {
        return {
            players: db.collection('rooms').doc(this.id).collection('players'),
            room: db.collection('rooms').doc(this.id)
        }
    },

    async mounted () {
        // await this.shuffle()
        // this.draw()
    },

    methods: {
        async shuffle () {
            this.clearHand()
            let { data, status } = await this.axios.get(`https://deckofcardsapi.com/api/deck/${this.id}/shuffle/`)
			if (status === 200 && data.success) {
                db.collection('rooms').doc(this.id).update({
                    tableCards: [],
                    remainingCards: data.remaining
                })
            }
        },

        drawOnPlayer () {
            this.players.forEach(async(player) => {
                let { data, status } = await this.axios.get(`https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=2`)
                if (status === 200 && data.success) {
                    db.collection('rooms').doc(this.id).collection('players').doc(player.id).update({
                        cards: data.cards
                    })

                    db.collection('rooms').doc(this.id).update({
                        remainingCards: data.remaining
                    })
                }   
            })
        },

        async drawOnTable (count = 1) {
            let { data, status } = await this.axios.get(`https://deckofcardsapi.com/api/deck/${this.id}/draw/?count=${count}`)
            if (status === 200 && data.success) {
                data.cards.forEach(card => {
                    db.collection('rooms').doc(this.id).update({
                        tableCards: firebase.firestore.FieldValue.arrayUnion(card)
                    })
                })

                db.collection('rooms').doc(this.id).update({
                    remainingCards: data.remaining
                })
            }
        },

        leaveRoom (id) {
            db.collection('rooms').doc(this.id).collection('players').doc(id).delete()
        },

        clearHand () {
            this.players.forEach(player => {
                db.collection('rooms').doc(this.id).collection('players').doc(player.id).update({
                    cards: []
                })
            })
        }
    }
}
</script>


<style lang="scss" scoped>
img {
    width: 70px;
    height: 90px;
    margin-right: 5px;
}
</style>
