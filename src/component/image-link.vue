<template>
	<div ref="image" class="progressive-image">
		<canvas v-if="!shouldImageRender" width="1" height="1" class="canvas" ref="canvas"></canvas>
		<router-link :to="url" ><div class="progressive-image-wrapper" :style="wrapperStyle">
			<transition
				enter-class="progressive-image-enter"
				enter-active-class="progressive-image-before-enter">
			<img
				v-show="shouldImageRender"
				class="progressive-image-main"
				ref="main"
				:src="image"
				:alt="alt"
			/>
			</transition>
			<transition
				enter-class="progressive-image-enter"
				enter-active-class="progressive-image-before-enter">
			<div
				v-if="shouldPlaceholderRender"
				class="progressive-image-placeholder"
				:class="{ 'progressive-image-placeholder-out': shouldImageRender }"
				:style="placeholderStyle">
			</div>
			</transition>
			<div class="middle">
				<div class="text">{{ alt }}</div>
			</div>
		</div></router-link>
	</div>
</template>

<script>
import image from '../mixin/image'

export default {
	name: 'progressive-img-link',
	mixins: [
		image
	],
	computed: {
		placeholderStyle () {
			return {
				...this.blurStyle,
				'background-image': `url(${this.placeholder || this.options.placeholder})`
			}
		}
	},
	props: {
		url: {
			type: String,
			required: true
		}
	}
}
</script>

<style scoped lang="css">
.progressive-image {
	position: relative;
	overflow: hidden;
}

.canvas {
	visibility: hidden;
	position: absolute;
	top: 0;
	left: 0;
}

.progressive-image-main {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	height: auto;
	z-index: 1;
	transition-duration: 0.3s;
	transition-property: all;
	transition-timing-function: ease-out;
	transform: translateZ(0);
}

.progressive-image-before-enter {
	opacity: 1;
}

.progressive-image-enter {
	opacity: 0;
}

.progressive-image-placeholder {
	position: absolute;
	top: 0px;
	left: 0px;
	z-index: 0;
	overflow: hidden;
	transition-duration: 300ms;
	transition-property: all;
	transition-timing-function: ease-out;
	backface-visibility: hidden;
	transform: translateZ(0) scale(1.1);
	width: 100%;
	height: 100%;
	background-size: cover;
}

.progressive-image-placeholder-out {
	transition-duration: inherit;
	transition-property: all;
	transition-timing-function: ease-out;
	transition-delay: 0.4s;
	opacity: 0;
}

.middle {
	transition: .5s ease;
	opacity: 0;
	position: absolute;
	top: 100%;
	left: 50%;
	width: 100%;
	height: auto;
	transform: translate(-50%, -100%);
	-ms-transform: translate(-50%, -100%);
	text-align: center;
	z-index: 1;
}

.text {
	background-color: rgba(0,0,0,0.6);
	color: white;
	font-size: large;
	padding: 16px 32px;
}

.progressive-image-wrapper:hover img {
	opacity: 0.8;
}

.progressive-image-wrapper:hover .middle {
	opacity: 1;
}

</style>
