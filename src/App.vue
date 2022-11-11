<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'app',
  methods: {
    // open () {
    //   this.$notify({
    //     title: '接口已换为某易云音乐',
    //     type: 'success',
    //     dangerouslyUseHTMLString: true,
    //     message: '<strong>持续更新中哦~</strong>',
    //     offset: 100,
    //     duration: 0
    //   })
    // },
    play () {
      this.$notify({
        title: '单击即可播放音乐',
        type: 'success',
        dangerouslyUseHTMLString: true,
        message: '<strong><i>不需要双击噢~</i></strong>',
        offset: 200
      })
    }
  },
  mounted () {
    // this.open()
    this.play()
  }
}
</script>

<style>
</style>
