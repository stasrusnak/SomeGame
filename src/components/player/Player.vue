<template>
  <div class="player" ref="hero" tabindex="0" :style="getStyles">
    <span class="player__pos">{{ x }},{{ y }}</span>
    <span class="player__boundaries">{{ top }},{{ right }},{{ bottom }},{{ left }}</span>
  </div>
</template>
<style src="./Player.scss" lang="scss"></style>
<script src="./Player.js"></script>
