<template>
  <div class="footer">
    <h3>{{`这是底部${lodashValue}`}}</h3>
  </div>
</template>

<script>
import { logFun } from '@/js/log'
const _ = require('lodash')
export default {
  data () {
    return {
      lodashValue: ''
    }
  },
  mounted () {
    logFun('footer')
    this.lodashValue = _.add(6, 4)
  }
}
</script>

<style lang="less" scoped>
  .footer {
    height: 200px;
    width: 100%;
    color: red;
    background-color: #666666;
    margin-top: 100px;
  }
</style>
