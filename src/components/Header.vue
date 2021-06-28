<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations" 
        :key="nav.name"
        class="nav-item">
        <!-- A태그 대신 쓰는 컴포넌트 효율적인 페이지 관리 -->
        <!-- to 로 어느 페이지로 이동할 것인지 관리 -->
        <!-- active-class 로 active 됐을 때 이름 변경 -->
        <RouterLink
          :to="nav.href"
          active-class="active"
          :class="{ active: isMatch(nav.path) }"
          class="nav-link">
          {{ nav.name }}
        </RouterLink>
      </div>
    </div>
    <div
      @click="toAbout"
      class="user">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import {mapState} from 'vuex'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'Search',
          href: '/'
        },
        {
          name: 'Movie',
          href: '/movie/tt4520988',
          path: /^\/movie/
        },
        {
          name: 'About',
          href: '/about'
        }
      ]
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ])
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath) 
      // .test 는 정규표현식을 만족했는지 확인하는 메소드
    },
    toAbout() {
      this.$router.push('/about') 
      //$router.push 를 이용해서 페이지 이동
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  position: relative;
  .logo{
    margin-right: 40px;
  }
  .user{
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover{
      background-color: darken($gray-200, 10%);
    }
    img{
      width: 100%;
      border-radius: 50%;
    }
  }
  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>