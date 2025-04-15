<template>
  <div id="app">
    <header>
      <h1>ZXEI Icons 组件库</h1>
      <p>一个基于SVG的Vue图标组件库，提供了丰富的图标集合</p>
    </header>
    
    <main>
      <IconDemo />
      <hr />
      <CategoryDemo />
    </main>
    
    <footer>
      <p>© 2023 ZXEI Icons. ISC Licensed.</p>
    </footer>
  </div>
</template>

<script>
import IconDemo from './IconDemo.vue';
import CategoryDemo from './CategoryDemo.vue';

export default {
  name: 'App',
  components: {
    IconDemo,
    CategoryDemo
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  color: #333;
  background-color: #f8f9fa;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: #4a90e2;
  color: white;
  padding: 20px;
  text-align: center;
}

header h1 {
  margin: 0;
  font-size: 2rem;
}

header p {
  margin: 10px 0 0;
  opacity: 0.8;
}

main {
  flex-grow: 1;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

hr {
  margin: 40px 0;
  border: none;
  border-top: 1px solid #e0e0e0;
}

footer {
  background-color: #f1f1f1;
  padding: 20px;
  text-align: center;
  color: #666;
}
</style> 