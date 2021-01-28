<template>
	<view class="navbar">
		<view class="navbar-fixed">
			<!-- 状态栏， 小程序会有，要考虑高度 -->
			<view :style="{height: statusBarHeight + 'px'}">
			</view>
			<!-- 内容 -->
			<view class="navbar-content" :class="{search:isSearch}":style="{height:navBarHeight+'px',width:windowWidth+'px'}">
				<view class="navbar-content__search-icons">
					<uni-icons v-if="isSearch" type="back" size="22" color="#fff" @click="back"></uni-icons>
				</view>
				<view v-if="!isSearch" class="navbar-search">
					 <view class="navbar-search_icon"> 	
					 <uni-icons type="search" size="22"></uni-icons>
					 </view>
							 <view class="navbar-search_text"  @click.stop="open">
							 	uni-app、vue
							 </view>
				</view>
			  <view v-if="isSearch" class="navbar-search">
			  	<input class="navbar-search_text" type="text" v-model="val" placeholder="请输入搜索内容" @input="inputChange"/>
			  </view>
			</view>
		</view>
		<view :style="{height: statusBarHeight+navBarHeight+'px'}"></view>
	</view>
</template>

<script>
	export default {
		name:'navbar',
		props:{
			isSearch:{
				type: Boolean,
				default: false
			},
			value:{
				type: [String,Number],
				default: ''
			}
		},
		data() {
			return {
				statusBarHeight: 20,
				navBarHeight: 45,
				windowWidth: 375,
				val:''
			};
		},
		watch:{
			value(newVal) {
				this.val = newVal
			}
		},
		
		methods:{
			back() {
				uni.switchTab({
					url:'/pages/tabbar/index/index'
				})
			},
			open() {
				if(this.isSearch) return
				uni.navigateTo({
					url:"/pages/home-search/home-search"
				})
			},
			inputChange(e){
				const {value} = e.detail
				this.$emit('input',value)
			}
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.statusBarHeight = info.statusBarHeight
			this.windowWidth = info.windowWidth
			// 获取胶囊的位置  .小程序
			// #ifndef H5 || APP-PLUS || MP-ALIPAY
			const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
			this.navBarHeight = (menuButtonInfo.bottom - info.statusBarHeight) + (menuButtonInfo.top - info.statusBarHeight)
			this.windowWidth = menuButtonInfo.left
			// #endif
		}
	}
</script>

<style lang="scss">
	@import '../../common/css/icon.css';
 	.navbar {
 		.navbar-fixed {
 			position: fixed;
 			top: 0;
 			left: 0;
 			z-index: 99;
 			width: 100%;
 			background-color: $mk-base-color;
 
 			.navbar-content {
 				display: flex;
 				justify-content: center;
 				align-items: center;
 				padding: 0 15px;
 				height: 45px;
 				box-sizing: border-box;
 
 				.navbar-search {
 					display: flex;
 					align-items: center;
 					padding: 0 10px;
 					width: 100%;
 					height: 30px;
 					border-radius: 30px;
 					background-color: #fff;
 
 					.navbar-search_icon {
 						// width: 10px;
 						// height: 10px;
 						margin-right: 10px;
 					}
 
 					.navbar-search_text {
 						width: 100%;
 						font-size: 14px;
 						color: #999;
 					}
 				}
 
 				&.search {
 					padding-left: 0;
 
 					.navbar-content__search-icons {
 						margin-left: 10px;
 						margin-right: 10px;
 					}
 
 					.navbar-search {
 						border-radius: 5px;
 					}
 				}
 			}
 
 		}
 
 	}
</style>
