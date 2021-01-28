<template>
	<view class="icons" @click.stop="likeTab">
		<uni-icons :type="like?'heart-filled':'heart'" size="20" color="#f07373"></uni-icons>
	</view>
</template>

<script>
	export default {
		props:{
			item:{
				type:Object,
				default() {
					return {}
				}
			}
		},
		created() {
			this.like = this.item.is_like
		},
		watch:{
			item(newVal) {
				this.like = this.item.is_like
			}
		},
		data() {
			return {
				like: false
			};
		},
		methods:{
			likeTab(){
				this.like = !this.like
				this.setUpdateLike()
				// console.log('收藏成功!')
			},
			setUpdateLike() {
				uni.showLoading()
				this.$api.update_like({
					 user_id: '600fdf58157a0c00015d7bce',
					 article_id: this.item._id
				}).then(res=> {
					uni.hideLoading()
					uni.showToast({
						title: this.like?'收藏成功':'取消收藏',
						icon: 'none'
					})
					console.log(res)
				}).catch(()=>{
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style>
 .icons {
	 position: absolute;
	 top: 0;
	 right: 0;
	 display: flex;
	 justify-content: center;
	 align-items: center;
	 width: 20px;
	 height: 20px;
 }
</style>
