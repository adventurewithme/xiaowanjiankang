<template>
	<view class="container">

	</view>
</template>
<script>
	import listCell from '@/components/mix-list-cell';

	import {
		mapState,
		mapMutations

	} from 'vuex';
	let startY = 0,
		moveY = 0,
		pageAtTop = true;
	export default {
		components: {
			listCell
		},
		data() {
			return {
				coverTransform: 'translateY(0px)',
				coverTransition: '0s',
				moving: false,
				footprintList: [],
			}
		},
		async onLoad(rurl) {
			
		},
		onLoad(option) {
			let rurl = option.rurl;
			console.log("tologin1:"+rurl);
			var that = this;
			var url = encodeURIComponent(rurl);
			console.log("tologin2:"+url);
			that.$http({ //调用接口
				method: 'POST',
				params:{
					rurl:url
				},
				url: that.global.target + "/wx/auth/loginInit" //this指data
			}).then(function(response) { //接口返回数据

				window.location.href = response.data;
				
			}, function(error) {
			
			})
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			...mapMutations(['login']),

			
		}
	}
</script>

