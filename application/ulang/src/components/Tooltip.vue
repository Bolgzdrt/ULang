<template>
  <div class="tooltip-box">
    <slot></slot>
    <div class="tooltip">
      <span class="text">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: { 
    text: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.tooltip-box { 
  position: relative;
  display: inline-block;
}

.tooltip-box:hover .tooltip{
  display: block;
}

.tooltip { 
  text-align: center;
  padding: 5px 0;
  border-radius: 2px;
  width: 170px;
  bottom: 125%;
  left: 50%;
  margin-left: -85px;
  position: absolute;
  z-index: 1;
  background: #bfdbf7;
  display: none;
}

.text::after {
  content: " ";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: #bfdbf7 transparent transparent transparent;
}
</style>
