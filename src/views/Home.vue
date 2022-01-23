<template>
  <div class="mx-8 mt-8">
    <v-layout row wrap>
      <v-flex lg6 md6 sm6 xs12>
        <v-text-field
          v-model="searchQuery"
          dense
          label="Search User"
          outlined
        ></v-text-field>
        <v-layout class="mb-3" row>
          <v-btn
            class="btn-white ml-3"
            depressed @click="filterBy('allgenders')">all genders
          </v-btn>
          <v-btn
            class="btn-blue ml-3"
            depressed @click="filterBy('female')">female
          </v-btn>
          <v-btn
            class="btn-blue ml-3"
            depressed @click="filterBy('male')">male
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
        <v-btn class="btn-white mb-3" depressed @click="addMoreResult">More results</v-btn>
      </v-flex>
      <v-flex v-if="isProfileClicked" class="mt-12">
        <v-card
          flat
          class="justify-center mb-3 mt-16 ml-3">
          <v-row wrap>
            <v-col class="d-flex" cols="7">
              <v-img :src="userPicture" class="mx-5 ml-10" contain max-height="150"></v-img>
              <v-card-text class="ml-5 mt-5">
                <div class="caption black--text">ID</div>
                <div class="grey--text">{{ userID }}</div>
                <div class="caption black--text">Phone</div>
                <div class="grey--text">{{ userPhone }}</div>
                <div class="caption black--text">Email</div>
                <div class="grey--text">{{ userEmail }}</div>
                <div class="caption black--text">Cellphone</div>
                <div class="grey--text">{{ userCell }}</div>
              </v-card-text>
            </v-col>
            <v-col class="mt-5" cols="5">
              <v-card-text>
                <div class="caption black--text">Location</div>
                <div class="grey--text">{{ userStreetName }} - {{ userStreetNumber }}</div>
                <div class="grey--text">{{ userPostcode }} - {{ userPhone }}</div>
                <div class="caption black--text">Tel</div>
                <div class="grey--text">{{ userPostcode }} - {{ userPhone }}</div>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-flex>
    </v-layout>
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
    searchQuery: '',
    isProfileClicked: false,
    userID: 0,
    userCity: '',
    userCountry: '',
    userPostcode: 0,
    userState: '',
    userStreetName: '',
    userStreetNumber: 0,
    userCell: 0,
    userPhone: 0,
    userPicture: '',
    userEmail: ''
  }),
  created () {
    this.getUserInfos()
    this.getMoreUserInfo()
  },
  computed: {
    ...mapGetters({
      userInfos: 'GET_USER_INFO',
      moreUserInfos: 'GET_MORE_USER_INFO',
      originalUserInfo: 'GET_ORIGINAL_USER_INFO'
    }),
    userInfosComputed () :any {
      if (this.searchQuery) {
        return this.userInfos.filter((item: any) => {
          return this.searchQuery.toLowerCase().split('').every(v => item.name.first.toLowerCase().includes(v) || item.name.last.toLowerCase().includes(v))
        })
      } else {
        return this.userInfos
      }
    }
  },
  methods: {
    ...mapActions({
      getUserInfos: 'GET_USER_INFO',
      setUserInfo: 'SET_USER_INFO',
      setOriginalUserInfo: 'SET_ORIGINAL_USER_INFO',
      getMoreUserInfo: 'GET_MORE_USER_INFO'
    }),
    addMoreResult ():void {
      this.getMoreUserInfo()
      this.setOriginalUserInfo(this.userInfos.concat(this.moreUserInfos))
      this.setUserInfo(this.userInfos.concat(this.moreUserInfos))
    },
    filterBy (gender: string):any {
      this.currentUserInfos = this.originalUserInfo
      if (gender === 'male') {
        const men = (this.currentUserInfos.filter((prop: { gender: string }) => {
          return prop.gender === 'male'
        }))
        this.setUserInfo(men)
        this.currentUserInfos = this.originalUserInfo
      } else if (gender === 'female') {
        const female = (this.currentUserInfos.filter((prop: { gender: string }) => {
          return prop.gender === 'female'
        }))
        this.setUserInfo(female)
      } else {
        this.setUserInfo(this.originalUserInfo)
        return this.userInfos
      }
    },
    showFullsize (userID: any, userLocation: any, userCell: number, userPhone: number, userPicture: string, userEmail: string):void {
      this.isProfileClicked = true
      this.userID = userID.value
      this.userCell = userCell
      this.userPhone = userPhone
      this.userPicture = userPicture
      this.userEmail = userEmail
      this.userCity = userLocation.city
      this.userCountry = userLocation.country
      this.userPostcode = userLocation.postcode
      this.userState = userLocation.state
      this.userStreetName = userLocation.street.name
      this.userStreetNumber = userLocation.street.number
    }
  }
})
</script>
