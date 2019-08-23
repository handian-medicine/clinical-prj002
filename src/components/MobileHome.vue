<template>
  <div>
    <h1>Mobile主页</h1>
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>


export default {
  computed: {

  },
  methods: {

}
}
</script>
