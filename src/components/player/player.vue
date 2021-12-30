<template>
	<div class="player">
		<div class="normal-player"
				 v-show="fullScreen">
			<template v-if="currentSong">
				<div class="background">
					<img :src="currentSong.pic" />
				</div>
				<div class="top">
					<div class="back">
						<div @click="goBack"
								 class="icon-back"></div>
					</div>
					<h1 class="title">{{currentSong.name}}</h1>
					<h2 class="subtitle">{{currentSong.singer}}</h2>
				</div>
				<div class="bottom">
					<div class="operators">
						<div class="icon i-left"
								 :class="disableCls">
							<i @click="prev"
								 class="icon-prev"></i>
						</div>
						<div class="icon i-center"
								 :class="disableCls">
							<i @click="togglePlay"
								 :class="playIcon"></i>
						</div>
						<div class="icon i-right"
								 :class="disableCls">
							<i @click="next"
								 class="icon-next"></i>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
	<audio ref="audioRef"
				 @pause="pause"
				 @canplay="ready"
				 @error="error"></audio>
</template>

<script>
	import { computed, ref, watch } from 'vue'
	import { useStore } from 'vuex'
	export default {
		name: 'player',
		setup() {
			const store = useStore()

			const songReady = ref(false)
			const audioRef = ref(null)
			const fullScreen = computed(() => store.state.fullScreen)
			const currentSong = computed(() => store.getters.currentSong)
			const playing = computed(() => store.state.playing)
			const playIcon = computed(() => {
				return playing.value ? 'icon-pause' : 'icon-play'
			})
			const currentIndex = computed(() => store.state.currentIndex)
			const playList = computed(() => store.state.playList)
			const disableCls = computed(() => (songReady.value ? '' : 'disable'))

			watch(currentSong, (newSong) => {
				if (!newSong.id || !newSong.url) {
					return
				}
				songReady.value = false
				const audioEl = audioRef.value
				audioEl.src = newSong.url
				audioEl.play()
			})
			watch(playing, (newState) => {
				if (!songReady.value) {
					return
				}
				const audioEl = audioRef.value
				newState ? audioEl.play() : audioEl.pause()
			})

			const ready = () => {
				if (songReady.value) {
					return
				}
				songReady.value = true
			}
			const goBack = () => {
				store.commit('setFullScreen', false)
			}
			const togglePlay = () => {
				if (!songReady.value) {
					return
				}
				store.commit('setPlayingState', !playing.value)
			}
			const pause = () => {
				store.commit('setPlayingState', false)
			}
			const loop = () => {
				const audioEl = audioRef.value
				audioEl.currentTime = 0
				audioEl.play()
			}
			const error = () => {
				songReady.value = true
			}

			const prev = () => {
				const list = playList.value
				if (!songReady.value || !list.length) {
					return
				}
				if (list.length === 1) {
					loop()
				} else {
					let index = currentIndex.value - 1
					if (index === -1) {
						index = list.length - 1
					}
					store.commit('setCurrentIndex', index)
					if (!playing.value) {
						// if now is paused
						store.commit('setPlayingState', true)
					}
				}
			}

			const next = () => {
				const list = playList.value
				if (!songReady.value || !list.length) {
					return
				}
				if (list.length === 1) {
					loop()
				} else {
					let index = currentIndex.value + 1
					if (index === list.length) {
						index = 0
					}
					store.commit('setCurrentIndex', index)
					if (!playing.value) {
						// if now is paused
						store.commit('setPlayingState', true)
					}
				}
			}

			return {
				fullScreen,
				currentSong,
				audioRef,
				goBack,
				playIcon,
				togglePlay,
				pause,
				prev,
				next,
				ready,
				disableCls,
				error
			}
		}
	}
</script>

<style lang='scss' scoped>
	.player {
		.normal-player {
			position: fixed;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 150;
			background: $color-background;
			.background {
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				opacity: 0.6;
				filter: blur(20px);

				img {
					width: 100%;
					height: 100%;
				}
			}
			.top {
				position: relative;
				margin-bottom: 25px;
				.back {
					position: absolute;
					top: 0;
					left: 6px;
					z-index: 20;
					display: flex;
					flex: 0 0 20px;
					align-items: center;
					transform: translateZ(2px);
					padding: 10px;
					.icon-back {
						@include bg-image('back');
						width: 20px;
						height: 20px;
						background-size: cover;
					}
				}
				.title {
					width: 70%;
					margin: 0 auto;
					line-height: 40px;
					text-align: center;
					@include no-wrap();
					font-size: $font-size-large;
					color: $color-text;
				}
				.subtitle {
					line-height: 20px;
					text-align: center;
					font-size: $font-size-medium;
					color: $color-text;
				}
			}
			.bottom {
				position: absolute;
				bottom: 50px;
				width: 100%;
				.operators {
					display: flex;
					align-items: center;
					.icon {
						flex: 1;
						color: $color-theme;
						&.disable {
							color: $color-theme-d;
						}
						i {
							font-size: 30px;
						}
					}
					.i-left {
						text-align: right;
					}
					.i-center {
						padding: 0 20px;
						text-align: center;
						i {
							font-size: 40px;
						}
					}
					.i-right {
						text-align: left;
					}
				}
			}
		}
	}
</style>
