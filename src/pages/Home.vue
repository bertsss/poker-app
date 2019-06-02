<template>
    <div>
        <p>Hi {{ name || 'stranger' }} welcome to Poker App!</p>
        <span>Please enter your name</span>
        <form @submit.prevent="enterRoom()">
            <input type="text" v-model="name">
        </form>
    </div>
</template>

<script>
export default {
	data () {
		return {
			name: ''
		}
	},

	methods: {
		async enterRoom () {
			await this.$store.commit('setName', this.name)
			// this.addUser()
			this.$router.push('/rooms')
		}
	}
}
</script>
