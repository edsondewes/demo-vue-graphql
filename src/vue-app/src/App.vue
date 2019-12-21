<template>
  <div class="container-fluid">
    <div class="card-container">
      <router-view />
    </div>
  </div>
</template>

<style>
html {
  height: 100%;
}
body {
  background-attachment: fixed;
  background-image: linear-gradient(rgb(104, 145, 162), rgb(12, 97, 33));
  background-repeat: no-repeat;
  height: 100%;
  margin: 0;
  padding-top: 50px;
}
</style>
<style scoped>
.card-container {
  background-color: #f7f7f7;
  border-radius: 2px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  margin: 0 auto 25px;
  max-width: 600px;
  padding: 40px 40px;
}
</style>