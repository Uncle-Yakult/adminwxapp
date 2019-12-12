<template>
	<div class="bindPlace">
		<div class="message">
			<h2>设备信息</h2>
			<ul>
				<li>设备序列号：{{DryerInfo.device_id}}</li>
				<li>设备类型：{{DryerInfo.type_name}}</li>
			</ul>
		</div>
		<div class="buttons">
			<button @click="cancel">取消部署</button>
			<button @click="confirm">确定部署</button>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				DryerInfo: ""
			}
		},
		methods: {
			confirm() {
				let $app = this.$app;
				let code = this.$route.query.code;
				let hotel_id = this.$route.query.hotel_id;
				$app.ajax('device/dryer/bindDryer', {
					admin_id: $app.getCookie('admin_id'),
					dryer_sn: code,
					hotel_id
				}, (res) => {
					if (res.errorCode == 1) { //出现错误
						this.$vux.toast.text(res.msg, 'middle');
					} else { //设备正常 逻辑继续
						this.$vux.toast.text(res.msg, 'middle');
						this.$router.push({
							path: '/place/list'
						});
					}
				});
			},
			cancel() {
				this.$router.push("/place/list")
			}
		},
		mounted() {
			this.DryerInfo = this.$route.query.DryerInfo
		}
	}
</script>

<style scoped>
	.bindPlace {
		height: 100%;
		padding: 15px;
	}

	.bindPlace .message {
		border: 1px solid #ccc;
		padding: 10px;
		border-radius: 3px;
	}

	.bindPlace .message h2 {
		padding: 10px;
		border-bottom: 1px solid #ccc;
	}

	.bindPlace .message ul {
		margin: 4px;
		color: #cccccc;
	}

	.bindPlace .message ul li {
		padding: 10px;
	}

	.bindPlace .buttons {
		margin-top: 20px;
		height: 35px;
		display: flex;
	}

	.bindPlace button {
		margin: 0 20px;
		flex: 1;
		background: #0078FF;
		color: white;
		border-radius: 3px;
	}
</style>
