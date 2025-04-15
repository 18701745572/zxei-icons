<template>
  <div class="category-demo">
    <h1>按类别使用图标</h1>
    
    <div class="categories">
      <div class="category">
        <h2>箭头类图标</h2>
        <div class="icon-grid">
          <div class="icon-item" v-for="(icon, name) in arrowIcons" :key="name">
            <component :is="icon" />
            <span>{{ name }}</span>
          </div>
        </div>
      </div>
      
      <div class="category">
        <h2>系统类图标</h2>
        <div class="icon-grid">
          <div class="icon-item" v-for="(icon, name) in systemIcons" :key="name">
            <component :is="icon" />
            <span>{{ name }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 按类别导入图标
import * as ArrowIcons from 'zxei-icons/src/components/arrow';
import * as SystemIcons from 'zxei-icons/src/components/system';

export default {
  name: 'CategoryDemo',
  data() {
    return {
      // 限制展示的图标数量
      arrowIcons: Object.fromEntries(
        Object.entries(ArrowIcons).slice(0, 12)
      ),
      systemIcons: Object.fromEntries(
        Object.entries(SystemIcons).slice(0, 12)
      )
    };
  }
}
</script>

<style scoped>
.category-demo {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

.categories {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.category {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 20px;
  background-color: white;
}

.category h2 {
  margin-top: 0;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  font-size: 18px;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
  transition: all 0.2s ease;
}

.icon-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.icon-item span {
  margin-top: 8px;
  font-size: 10px;
  color: #666;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
}
</style> 