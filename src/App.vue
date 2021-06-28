<template>
  <Header />
  <RouterView />
  <!-- 전역화 되어있는 컴포넌트 -->
  <!-- 홈이랑 어바웃은 여기서 출력 됨 -->
  <Footer />
</template>

<script>
import Header from '~/components/Header'
import Footer from '~/components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>