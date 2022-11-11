<template>
  <div class='HomeHeader'>
    <!-- 导航 -->

    <ul>
      <li @click="$router.push('/home')">
        <i class="iconfont icon-wangyiyunyinle"></i>
      </li>
      <li>
        <el-button type="info" size="small" class="clear-icon el-icon-arrow-left" @click="go(-1)" circle></el-button>
        <el-button type="info" size="small" class="clear-icon el-icon-arrow-right" @click="go(1)" circle></el-button>
      </li>
      <li>
        <input
          v-model="inputVal"
          type="text"
          @keyup.enter="searchMusic"
          placeholder="输入搜索的音乐"/>
        <i class="iconfont icon-search" @click="searchMusic"></i>
      </li>
    </ul>

    <!--  登录  -->
    <ol>
      <li>
        <el-switch
          v-model="asidevalue"
          @change="asideChange(asidevalue)"
          active-color="#13ce66"
          inactive-text="侧边栏"
          inactive-color="#DCDFE6">
        </el-switch>
        <el-switch
          v-model="musicvalue"
          @change="musicChange(musicvalue)"
          active-color="#13ce66"
          inactive-text="音乐栏"
          inactive-color="#DCDFE6">
        </el-switch>
        <el-switch
          v-model="miniValue"
          @change="miniChange(miniValue)"
          active-color="#13ce66"
          inactive-text="mini音乐栏"
          inactive-color="#DCDFE6">
        </el-switch>
      </li>
      <li  @click='loginClick'>
        <span>
          <i v-show="!userInfo.profile.avatarUrl" class="icon-denglu iconfont"></i>
        <img  v-show="userInfo.profile.avatarUrl" v-lazy="userInfo.profile.avatarUrl" alt="">
        {{ userInfo.profile.nickname ? userInfo.profile.nickname : '登录 / 注册' }}
        </span>
      </li>
      <!--      icon跳转  -->
      <li>
        <a href="https://gitee.com/maoyelin" target="_blank">
          <i class="iconfont icon-mayun"></i>
        </a>
        <a href="https://github.com/itmaoyelin" target="_blank">
          <i class="iconfont icon-huaban88"></i>
        </a>
      </li>
    </ol>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeHeader',
  props: {},
  components: {},
  data () {
    return {
      inputVal: '', // 输入的内容
      asidevalue: true,
      musicvalue: true,
      miniValue: false
    }
  },
  methods: {
    go (index) {
      window.history.go(index)
    },
    searchMusic () {
      if (this.inputVal.trim() === '') {
        return this.$message.warning('请输入内容!')
      }
      if (this.$route.name !== 'search') {
        this.$router.push('/home/search/' + this.inputVal)
      }
      this.$bus.$emit('searchClick', this.inputVal)
      console.log(this.$root)
    },
    loginClick () {
      if (!this.userInfo.profile.nickname) {
        this.$router.push('/login')
      }
    },
    asideChange (val) {
      val ? this.$bus.$emit('asideChange', true) : this.$bus.$emit('asideChange', false)
    },
    musicChange (val) {
      this.$bus.$emit('musicChange', val)
    },
    miniChange (val) {
      this.$bus.$emit('miniChange', val)
    },
    Detect () {
      if (window.sessionStorage.getItem('token')) {
        if (!this.userInfo.avatarUrl || !this.userInfo.profile.avatarUrl) {
          this.$store.dispatch('getUserData')
          this.$store.dispatch('getUserInfo')
        }
      }
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  mounted () {
    this.Detect()
  }
//   watch: {
//     'userInfo.avatarUrl': {
//       handler (newValue, oldValue) {
//         this.$store.dispatch('getUserData')
//       }
// }
//   }
}
</script>

<style scoped lang="stylus">
.HomeHeader
  box-sizing border-box
  overflow hidden
  /* left 新的样式*/
  ul
    display inline-block
    max-height 50px!important
    max-width  750px!important
    li
      float left
      max-height 50px!important
      &:first-child
        line-height 50px
        i
          color #FF0000
          font-size 35px
          margin 0 10px
      &:nth-child(2)
        margin 10px 5px
        .el-button
          margin auto 10px
      &:last-child
        margin 0 10px 10px
        input
          border 1px solid #cccccc
          margin 10px
          border-radius 20px
          padding-left 30px
          width 250px
          height 28px
        i
          margin-left -90%

  /*right 新样式*/
  ol
    float right
    box-sizing border-box
    margin-right 50px
    //max-height 50px!important
    //max-width  800px!important
    li
      float left
      display inline-block
      max-height 50px!important
      font-size 20px
      line-height 50px;
      margin 0 10px
      &:first-child
        .el-switch
          margin 0 5px
      &:nth-child(2)
        font-size 20px
        img
          width 50px
          border-radius 50%
          vertical-align middle
          padding-bottom 8px
      &:nth-child(3)
        i
          margin 5px
          font-size 35px
          &:hover
            color #FF0000
      &:last-child
        span
          font-size 16px
          font-weight 600

</style>
