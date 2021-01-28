<template>
	<swiper class="home-swiper" @change="change" :current="activeIndex">
		<swiper-item class="swiper-item" v-for="(item,index) in tab" :key="index">
			<list-item :list="listCatchData[index]" :load="load[index]"@loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>
</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
				listCatchData: {},
				load: {},
				pageSize: 5
			};
		},
		methods: {
			// 上拉加载更多
			loadmore() {
				if(this.load[this.activeIndex].loading === 'noMore') {
					return
				}
				this.load[this.activeIndex].page ++
				// console.log('触发上拉')
				this.getList(this.activeIndex)
			},	
			// 获取数据列表
			getList(current) {
				if(!this.load[current]) {
					this.load[current] = {
						page:1,
						loading: 'loading'
					}
				}
				this.$api.get_list({
					name: this.tab[current].name,
					page: this.load[current].page,
					pageSize: this.pageSize
				}).then(res => {
					const {
						data
					} = res
					if( data.length === 0 ) {
						let oldLoad = {}
						oldLoad.loading = 'noMore'
						oldLoad.page = this.load[current].page
						this.$set(this.load,current,oldLoad)
						this.$forceUpdate()
					} 
					let oldList = this.listCatchData[current] || []
					oldList.push(...data)
					this.$set(this.listCatchData,current,oldList)
					// this.listCatchData[current] = data
					// 数据的懒加载
					// this.$set(this.listCatchData, current, data)
				})
			},
			// swiper 切换item 时触发的函数
			change(e) {
				const {
					current
				} = e.detail
				// console.log(e)
				this.$emit('change', current)
				if(!this.listCatchData[current] || this.listCatchData[current].length === 0 ) {
					this.getList(current)	
				}
			}
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				this.getList(this.activeIndex)
			}
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
