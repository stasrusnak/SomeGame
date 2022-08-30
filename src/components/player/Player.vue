<template>
  <div class="player" ref="hero" tabindex="0" :style="getStyles">

    <div class="popup">
      <span class="player__pos">{{ x }}{{ y }}</span>
      <span class="player__boundaries">{{ top }},{{ right }},{{ bottom }},{{ left }}</span>
    </div>

  </div>
</template>
<style src="./Player.scss" lang="scss"></style>
<script src="./Player.js"></script>
