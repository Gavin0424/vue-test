<template>
	<div class="default">{{msg}}</div>
</template>

<script>
  export default {
    name: 'Welcome',
    data() {
      return {
      	msg: 'Hello Welcome'
      }
    },
    methods: {}
  }
</script>

<style>
.default {
    text-align: center;
    margin-top: 200px;
    margin-left: 50px;
    font-size: 28px;
  }
</style>