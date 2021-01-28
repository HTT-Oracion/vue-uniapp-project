<template>
	<view class="home">
		<navbar :isSearch="true" v-model="value" @input="inputChange"></navbar>
		<view class="home-list">
			<view v-if="is_history" class="label-box">
				<view class="label-header">
					<text class="label-title">搜索历史</text>
					<text class="label-clear" @click.stop="clearHistory">清空</text>
				</view>
				<!-- 搜索历史列表 -->
				<view v-if="historyLists.length > 0 " class="label-content">
					<view class="label-content__item" v-for="(item,index) in historyLists" :key="index" @click="openHistory(item.name)">
						{{item.name}}
					</view>
				</view>
				<view v-else class="no-data">
					没有搜索历史
				</view>
			</view>
			<!-- 搜索结果列表-->
			<list-scroll v-else class="list-scroll">
				<uni-load-more v-if="loading" status="loading" iconType="snow"></uni-load-more>
				<view v-if="searchList.length > 0">
					<list-card @cardClick="setHistory" :item="item" v-for="item in searchList" :key="item._id"></list-card>
				</view>
				<view v-if="searchList.length === 0 && !loading" class="no-data">
					没有搜索到相关数据
				</view>
			</list-scroll>
		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				value: '',
				is_history: true,
				searchList: [],
				loading: false
			}
		},
		computed: {
			...mapState(['historyLists'])
		},
		created() {
		  console.log(this.historyLists)
		},
		methods: {
			// 清空历史记录
			clearHistory(){
				this.$store.dispatch('clear_history')
				setTimeout(()=>{
					uni.showToast({
						title:"清除成功!"
					})
				},200)
			},
			// 添加历史记录
			setHistory(item) {
				this.$store.dispatch('set_history', {
					name: this.value
				})
			},
			openHistory(val) {
				this.value = val
				this.getSearch(this.value)
			},
			// 监听搜索框的变化
			inputChange(value) {
				if (!value) {
					clearTimeout(this.timer)
					this.mark = false
					this.getSearch(value)
					return
				}
				if (!this.mark) {
					this.mark = true
					this.timer = setTimeout(() => {
						this.mark = false
						this.getSearch(value)
					}, 1000)
				}
			},
			// 搜索结果
			getSearch(value) {
				if (!value) {
					this.searchList = []
					this.is_history = true
					return
				}
				this.is_history = false
				this.loading = true
				this.$api.get_search({
					value
				}).then(res => {
					const {
						data
					} = res
					this.loading = false
					this.searchList = data
					console.log(res)
				}).catch(() => {
					this.loading = false
				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		display: flex;
		height: 100%;
		background-color: #f5f5f5;
	}

	.home {
		display: flex;
		flex: 1;
		flex-direction: column;

		.label-box {
			background-color: #fff;
			margin-bottom: 10px;

			.label-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				padding: 10px 15px;
				border-bottom: 1px #f5f5f5 solid;

				.label-title {
					color: $mk-base-color;
				}

				.label-clear {
					color: #30b33a;
					font-weight: 700;
				}
			}

			.label-content {
				display: flex;
				flex-wrap: wrap;
				padding: 15px;
				padding-top: 0;

				.label-content__item {
					padding: 2px 10px;
					margin-top: 12px;
					margin-right: 10px;
					border-radius: 5px;
					border: 1px #666 solid;
					font-size: 14px;
					color: #666;
				}
			}
		}

		.no-data {
			height: 200px;
			line-height: 200px;
			width: 100%;
			text-align: center;
			font-size: 12px;
			color: #666;
		}
	}
</style>
