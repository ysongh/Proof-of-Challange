<template>
  <div class="home">
    <HelloWorld msg="Proof Of Challange"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { getAuthInstance } from '@/lib/auth'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  async mounted () {
    // eslint-disable-next-line no-unused-vars
    const a = await getAuthInstance()
    // Provider available at a.provider
  }
}
</script>
