<template>
 <div class="msg-details">
  <h1>Message Details</h1>
  <p>Message ID: {{ $route.params.id }}</p>
  <p>Message Content: {{ $route.params.content }}</p>
 </div>
</template>

<script>
export default {
 name: 'MsgDetails',
}
</script>

<style></style>