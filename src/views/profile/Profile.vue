<template>
  <div class="profile">
    <nav-bar class="nav-bar">
      <div slot="center">个人中心</div>
    </nav-bar> 
    <profile-info/>
    <profile-order/>
    <profile-item/>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar.vue'
import ProfileInfo from './childComps/ProfileInfo.vue'
import ProfileOrder from './childComps/ProfileOrder.vue'
import ProfileItem from './childComps/profileItem.vue'

export default {
  name: "Profile",
  components: {
    NavBar,
    ProfileInfo,
    ProfileOrder,
    ProfileItem
  }
}
</script>

<style scoped>
  .profile {
    height: 100vh;  
  }
  .nav-bar{
    background-color: var(--color-tint);
  }

</style>