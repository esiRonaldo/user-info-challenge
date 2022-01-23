<template>
  <v-card
    class="mb-3"
    elevation="3"
    @click="displayProfile(user)"
  >
    <v-container>
      <v-layout tow wrap>
        <v-flex>
          <v-avatar>
            <v-img :src=displayUsers.image alt="No pic" class="fill-height"></v-img>
          </v-avatar>
        </v-flex>
        <v-flex>
          <v-card-text>
            {{ displayUsers.fullName }}
          </v-card-text>
        </v-flex>
        <v-flex>
          <v-card-text>
            {{ displayUsers.email }}
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'UserInfoCard',
  props: {
    user: {}
  },
  computed: {
    displayUsers () {
      // let gender=this.user.gender
      const image = this.user.picture.thumbnail
      const email = this.user.email
      const fullName = this.user.name.last + ' ' + this.user.name.first
      return { fullName: fullName, email: email, image: image }
    }
  },
  methods: {
    displayProfile (user) {
      const userID = user.id
      const userLocation = user.location
      const userPicture = user.picture.medium
      const userCell = user.cell
      const userEmail = user.email
      const userPhone = user.phone
      this.$emit('displayProfile', userID, userLocation, userCell, userPhone, userPicture, userEmail)
    },
    moreResults () {
      console.log('More results')
    }
  }

}
</script>

<style scoped>

</style>
