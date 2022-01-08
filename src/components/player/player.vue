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
				<div class="middle"
						 @touchstart.prevent="onMiddleTouchStart"
						 @touchmove.prevent="onMiddleTouchMove"
						 @touchend.prevent="onMiddleTouchEnd">
					<div class="middle-l"
							 :style="middleLStyle">
						<div class="cd-wrapper">
							<div ref="cdRef"
									 class="cd">
								<img :src="currentSong.pic"
										 :class="imgCls"
										 ref="cdImageRef"
										 class="image" />
							</div>
						</div>
						<div class="playing-lyric-wrapper">
							<div class="playing-lyric">{{playingLyric}}</div>
						</div>
					</div>
					<scroll class="middle-r"
									ref="lyricScrollRef"
									:style="middleRStyle">
						<div class="lyric-wrapper">
							<div v-if="currentLyric"
									 ref="lyricListRef">
								<p class="text"
									 :class="{'current': currentLineNum ===index}"
									 v-for="(line,index) in currentLyric.lines"
									 :key="line.num">
									{{line.txt}}
								</p>
							</div>
							<div class="pure-music"
									 v-show="pureMusicLyric">
								<p>{{pureMusicLyric}}</p>
							</div>
						</div>
					</scroll>
				</div>
				<div class="bottom">
					<div class="dot-wrapper">
						<span class="dot"
									:class="{'active': currentShow === 'cd'}"></span>
						<span class="dot"
									:class="{'active': currentShow === 'lyric'}"></span>
					</div>
					<div class="progress-wrapper">
						<span class="time time-l">{{formatTime(currentTime)}}</span>
						<div class="progress-bar-wrapper">
							<progress-bar ref="barRef"
														:progress="progress"
														@progress-changing="onProgressChanging"
														@progress-changed="onProgressChanged"></progress-bar>
						</div>
						<span class="time time-r">{{formatTime(currentSong.duration)}}</span>
					</div>
					<div class="operators">
						<div class="icon i-left">
							<i @click="changeMode"
								 :class="modeIcon"></i>
						</div>
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
						<div class="icon i-right">
							<i @click="toggleFavorite(currentSong)"
								 :class="getFavoriteIcon(currentSong)"></i>
						</div>
					</div>
				</div>
			</template>
		</div>
	</div>
	<audio ref="audioRef"
				 @pause="pause"
				 @canplay="ready"
				 @error="error"
				 @timeupdate="updateTime"
				 @ended="end"></audio>
</template>

<script>
	import { computed, ref, watch } from 'vue'
	import { useStore } from 'vuex'
	import useMode from './use-mode'
	import useFavorite from './use-favorite'
	import useCd from './use-cd'
	import useLyric from './use-lyric'
	import useMiddleInteractive from './use-middle-interactive'
	import { formatTime } from '@/assets/js/utils'
	import ProgressBar from './progress-bar.vue'
	import { PLAY_MODE } from '@/assets/js/constant'
	import Scroll from '@/components/scroll/scroll.vue'

	export default {
		name: 'player',
		components: {
			ProgressBar,
			Scroll
		},
		setup() {
			// data
			const songReady = ref(false)
			const audioRef = ref(null)
			const currentTime = ref(0)
			let progressChanging = false

			const store = useStore()
			const fullScreen = computed(() => store.state.fullScreen)
			const currentSong = computed(() => store.getters.currentSong)
			const playing = computed(() => store.state.playing)
			const playIcon = computed(() => {
				return playing.value ? 'icon-pause' : 'icon-play'
			})
			const currentIndex = computed(() => store.state.currentIndex)
			const playList = computed(() => store.state.playList)
			const disableCls = computed(() => (songReady.value ? '' : 'disable'))
			const progress = computed(
				() => currentTime.value / currentSong.value.duration
			)
			const playMode = computed(() => {
				return store.state.playMode
			})

			watch(currentSong, (newSong) => {
				if (!newSong.id || !newSong.url) {
					return
				}
				currentTime.value = 0
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
				if (newState) {
					audioEl.play()
				} else {
					audioEl.pause()
					stopLyric()
				}
			})

			const { modeIcon, changeMode } = useMode()
			const { toggleFavorite, getFavoriteIcon } = useFavorite()
			const { cdRef, cdImageRef, imgCls } = useCd()
			const {
				currentLyric,
				currentLineNum,
				playLyric,
				lyricListRef,
				lyricScrollRef,
				playingLyric,
				pureMusicLyric,
				stopLyric
			} = useLyric({
				songReady,
				currentTime
			})
			const {
				currentShow,
				onMiddleTouchStart,
				onMiddleTouchMove,
				onMiddleTouchEnd,
				middleLStyle,
				middleRStyle
			} = useMiddleInteractive()

			const ready = () => {
				if (songReady.value) {
					return
				}
				songReady.value = true
				playLyric()
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
				store.commit('setPlayingState', true)
			}
			const error = () => {
				songReady.value = true
			}
			const end = () => {
				if (playMode.value === PLAY_MODE.loop) {
					loop()
				} else {
					next()
				}
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

			// Update the song play time
			const updateTime = (e) => {
				if (!progressChanging) {
					currentTime.value = e.target.currentTime
				}
			}
			const onProgressChanging = (progress) => {
				progressChanging = true
				currentTime.value = currentSong.value.duration * progress
				playLyric()
				stopLyric()
			}
			const onProgressChanged = (progress) => {
				progressChanging = false
				currentTime.value = currentSong.value.duration * progress
				audioRef.value.currentTime = currentSong.value.duration * progress
				if (!playing.value) {
					store.commit('setPlayingState', true)
				}
				playLyric()
			}

			return {
				fullScreen,
				currentSong,
				audioRef,
				// operators
				goBack,
				playIcon,
				togglePlay,
				pause,
				prev,
				next,
				ready,
				disableCls,
				error,
				modeIcon,
				changeMode,
				toggleFavorite,
				getFavoriteIcon,
				// progress-bar
				updateTime,
				currentTime,
				formatTime,
				progress,
				onProgressChanging,
				onProgressChanged,
				end,
				// cd
				imgCls,
				cdRef,
				cdImageRef,
				// lyric
				currentLyric,
				currentLineNum,
				lyricScrollRef,
				lyricListRef,
				playingLyric,
				pureMusicLyric,
				// Middle Interactive
				currentShow,
				onMiddleTouchStart,
				onMiddleTouchMove,
				onMiddleTouchEnd,
				middleLStyle,
				middleRStyle
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
			.middle {
				position: fixed;
				width: 100%;
				top: 100px;
				bottom: 160px;
				white-space: nowrap;
				font-size: 0;
				.middle-l {
					display: inline-block;
					vertical-align: top;
					position: relative;
					width: 100%;
					height: 0;
					padding-top: 70%;
					/* padding based on width */
					/* so padding 80% means the cd-wrapper will get a height = 70% width */
					.cd-wrapper {
						position: absolute;
						left: 15%;
						top: 0;
						width: 70%;
						height: 100%;
						.cd {
							width: 100%;
							height: 100%;
							border-radius: 50%;
							img {
								position: absolute;
								left: 0;
								top: 0;
								width: 100%;
								height: 100%;
								border-radius: 50%;
								box-sizing: border-box;
								border: 10px solid rgba(255, 255, 255, 0.1);
							}
							.playing {
								animation: rotate 24s infinite linear;
							}
						}
					}
					.playing-lyric-wrapper {
						width: 80%;
						margin: 30px auto 0 auto;
						overflow: hidden;
						text-align: center;
						.playing-lyric {
							height: 20px;
							line-height: 20px;
							font-size: $font-size-medium;
							color: $color-text-l;
						}
					}
				}
				.middle-r {
					display: inline-block;
					vertical-align: top;
					width: 100%;
					height: 100%;
					overflow: hidden;
					.lyric-wrapper {
						width: 80%;
						margin: 0 auto;
						overflow: hidden;
						text-align: center;
						.text {
							line-height: 32px;
							color: $color-text-l;
							font-size: $font-size-medium;
							&.current {
								color: $color-text;
							}
						}
						.pure-music {
							padding-top: 50%;
							line-height: 32px;
							color: $color-text-l;
							font-size: $font-size-medium;
						}
					}
				}
			}
			.bottom {
				position: absolute;
				bottom: 50px;
				width: 100%;
				.dot-wrapper {
					text-align: center;
					font-size: 0;
					.dot {
						display: inline-block;
						vertical-align: middle;
						margin: 0 4px;
						width: 8px;
						height: 8px;
						border-radius: 50%;
						background: $color-text-l;
						&.active {
							width: 20px;
							border-radius: 5px;
							background: $color-text-ll;
						}
					}
				}
				.progress-wrapper {
					display: flex;
					align-items: center;
					width: 80%;
					margin: 0px auto;
					padding: 10px 0;
					.time {
						color: $color-text;
						font-size: $font-size-small;
						flex: 0 0 40px;
						line-height: 30px;
						width: 40px;
						&.time-l {
							text-align: left;
						}
						&.time-r {
							text-align: right;
						}
					}
					.progress-bar-wrapper {
						flex: 1;
					}
				}
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
