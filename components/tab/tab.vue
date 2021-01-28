<template>
	<view class="tab">
		<scroll-view scroll-x class="tab-scroll">
			<view class="tab-scroll__box">
				<view 
				class="tab-scroll__item" 
				v-for="(item,index) in list" 
				:key="item.id" 
				@click="tabClick(item,index)"
				:class="{active: acitveIndex === index}"
				>
					 {{item.name}}
				</view>
			</view>
		</scroll-view>
		<view class="tab-icons">
			<uni-icons type="gear" size="22" @click="openSetting"></uni-icons>
		</view>
	</view>
</template>

<script>
	export default {
		name:'tab',
		props:{
			list:{
				type:Array,
				default: []
			},
			tabIndex: {
				type: Number,
				default: 0
			}
		},
		watch:{
			tabIndex(newVal,oldVal) {
				this.acitveIndex = newVal
			}
		},
		data() {
			return {
				acitveIndex: 0
			};
		},
		methods:{
			openSetting(){
				uni.navigateTo({
					url:'/pages/home-label/home-label'
				})
			},
			tabClick(item,index) {
				this.acitveIndex = index
				this.$emit('tab',{
					data: item,
					index: index
				})
			}
		}
	}
</script>

<style lang="scss">
 .tab {
	 display: flex;
	 width: 100%;
	 background-color: #fff;
	 border-bottom: 1px solid #f5f5f5;
	 box-sizing: border-box;
	 .tab-scroll {
		 flex: 1;
		 overflow: hidden;
		 box-sizing: border-box;
		 .tab-scroll__box{
		 		 display: flex;
		 		 align-items: center;
		 		 flex-wrap: nowrap;
		 		 height: 45px;
		 		 .tab-scroll__item{
		 			 flex-shrink: 0;
		 			 padding: 0 10px;
		 			 font-size: 14px;
		 			 color: #333;
					 &.active {
						 color: $mk-base-color;
					 }
		 		 }
		 }
	 }
		.tab-icons {
			position: relative;
			display: flex;
			justify-content: center;
			align-items: center;
			width: 45px;
			&::after {
				content: '';
				position: absolute;
				top: 12px;
				bottom: 12px;
				left: 0;
				width: 1px;
				background-color: #ddd;
			}
		}
 }
</style>
