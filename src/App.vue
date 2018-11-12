<template>
  <div>
    <h3 class="title">{{title}}</h3>
    <p class="content">{{content}}</p>
    <div>
      <h3>{{`lodash结果--hot：${lodashValue}`}}</h3>
    </div>
    <div class="goddess">
      <div class="right">
        <h4 class="right__h4">background引入图片</h4>
        <div class="right__img"></div>
      </div>
      <div class="left">
        <h4 class="left__h4">img标签直接引入图片</h4>
        <img class="left__img" src="./timg.jfif" />
      </div>
    </div>
    <foot />
  </div>
</template>

<script>
import Footer from '@/footer';
import { logFun } from '@/js/log';
const _ = require('lodash');
export default {
	components: {
		Foot: Footer,
	},
	data() {
		return {
			title: 'hello word',
			content: 'webpack4 搭建vue环境',
			lodashValue: '',
		};
	},
	mounted() {
		logFun('App');
		this.lodashValue = _.camelCase('Hello Word');
	},
};
</script>

<style lang="less" scoped>
.title {
	font-size: 20px;
	text-align: center;
	color: #f0632c;
}
.content {
	font-size: 14px;
	color: #333333;
}
.goddess {
	transition: 1s;
	.left {
		margin-left: 50%;
		&__h4 {
			font-size: 14px;
		}
		&__img {
			width: 308px;
			height: 433px;
		}
	}
	.right {
		float: left;
		&__h4 {
			font-size: 14px;
		}
		&__img {
			width: 300px;
			height: 150px;
			background: url('./timg.gif') no-repeat;
		}
	}
}
</style>
