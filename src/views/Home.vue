<template>
  <div>
    <v-container>
      <v-layout row wrap>
        <v-flex md6 xs12>
          <v-text-field
            :v-model="searchQuery"
            dense
            label="Search User"
            outlined
          ></v-text-field>

          <v-layout class="mb-3" row>
            <v-btn color="grey" small>
              <span class="caption text-uppercase" @click="filterBy('allgenders')">all genders</span>
            </v-btn>

            <v-btn color="grey" small>
              <span class="caption text-uppercase" @click="filterBy('female')">female</span>
            </v-btn>
            <v-btn color="grey" small>
              <span class="caption text-uppercase" @click="filterBy('male')">male</span>
            </v-btn>
          </v-layout>
          <div
            v-for="(user,index) in userInfosComputed"
            :key="index"
          >
            <UserInfoCard
              :user="user"
              @displayProfile="showFullsize"

            />
          </div>
          <v-btn>More results</v-btn>
        </v-flex>
        <v-col v-if="isProfileClicked">
          <v-card
            class="mb-3"
            elevation="3"
            max-height="50"
          >
            <v-container>
              <v-layout row wrap>
                <v-flex>
                  <v-card>
                    <v-col>

                      <v-responsive class="pt-4">
                        <v-img :src="userPicture"></v-img>
                      </v-responsive>
                      <v-card-text>
                        <div class="caption black--text">ID</div>
                        <div class="grey--text">{{ userID }}</div>
                      </v-card-text>
                    </v-col>
                    <v-card-text>
                      <div class="caption black--text">Phone</div>
                      <div class="grey--text">{{ userPhone }}</div>
                    </v-card-text>
                    <v-card-text>
                      <div class="caption black--text">Email</div>
                      <div class="grey--text">{{ userEmail }}</div>
                    </v-card-text>
                    <v-card-text>
                      <div class="caption black--text">Cellphone</div>
                      <div class="grey--text">{{ userCell }}</div>
                    </v-card-text>
                    <div class="caption black--text">Location</div>
                    <div class="grey--text">Street:{{ userLocation['number'] }}{{ userLocation.name }}</div>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-col>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import UserInfoCard from '../components/UserInfoCard.vue'

export default Vue.extend({
  name: 'Home',
  components: { UserInfoCard },
  data: () => ({
    currentUserInfos: [],
    originalUserInfos: [],
    searchQuery: '',
    isProfileClicked: false,
    userID: 0,
    userLocation: '',
    userCell: 0,
    userPhone: 0,
    userPicture: '',
    userEmail: ''
  }),

  computed: {
    ...mapGetters({
      userInfos: 'GET_USER_INFO',
      originalUserInfo: 'GET_ORIGINAL_USER_INFO'
    }),
    userInfosComputed () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.currentUserInfos = this.userInfos
      return this.userInfos
    },
    showUsers () {
      if (this.searchQuery) {
        return this.userInfos.filter((item: { title: string }) => {
          return this.userInfos === this.searchQuery
            .toLowerCase()
            .split(' ')
            .every((v: string) => item.title.toLowerCase().includes(v))
        })
      } else {
        return this.userInfos
      }
    }
  },
  methods: {
    ...mapActions({
      getUserInfos: 'GET_USER_INFO',
      getOriginalUserInfos: 'GET_USER_INFO',
      setUserInfo: 'SET_USER_INFO'
    }),

    filterBy (gender: string) {
      this.currentUserInfos = this.originalUserInfo
      if (gender === 'male') {
        const men = (this.currentUserInfos.filter((prop: { gender: string }) => {
          return prop.gender === 'male'
        }))
        console.log(this.currentUserInfos)
        this.setUserInfo(men)
        this.currentUserInfos = this.originalUserInfo
      } else if (gender === 'female') {
        const female = (this.currentUserInfos.filter((prop: { gender: string }) => {
          return prop.gender === 'female'
        }))
        console.log(this.currentUserInfos)
        this.setUserInfo(female)
      } else {
        this.setUserInfo(this.originalUserInfo)
        return this.userInfos
      }
    },
    showFullsize (userID: number, userLocation: string, userCell: number, userPhone: number, userPicture: string, userEmail: string) {
      this.isProfileClicked = true
      this.userID = userID
      this.userLocation = userLocation
      this.userCell = userCell
      this.userPhone = userPhone
      this.userPicture = userPicture
      this.userEmail = userEmail
    }
  },
  created () {
    this.getUserInfos()
  }
})
</script>1
