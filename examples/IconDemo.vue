<template>
  <div class="icon-demo">
    <h1>ZXEI Icons 示例</h1>
    
    <div class="section">
      <h2>基本用法</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <ArrowDownFill />
          <span>ArrowDownFill</span>
        </div>
        <div class="icon-item">
          <ArrowUpFill />
          <span>ArrowUpFill</span>
        </div>
        <div class="icon-item">
          <ArrowLeftFill />
          <span>ArrowLeftFill</span>
        </div>
        <div class="icon-item">
          <ArrowRightFill />
          <span>ArrowRightFill</span>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>自定义大小</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <ArrowDownFill :size="16" />
          <span>16px</span>
        </div>
        <div class="icon-item">
          <ArrowDownFill :size="24" />
          <span>24px</span>
        </div>
        <div class="icon-item">
          <ArrowDownFill :size="32" />
          <span>32px</span>
        </div>
        <div class="icon-item">
          <ArrowDownFill :size="48" />
          <span>48px</span>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h2>自定义颜色</h2>
      <div class="icon-grid">
        <div class="icon-item">
          <ArrowDownFill color="red" />
          <span>红色</span>
        </div>
        <div class="icon-item">
          <ArrowDownFill color="blue" />
          <span>蓝色</span>
        </div>
        <div class="icon-item">
          <ArrowDownFill color="green" />
          <span>绿色</span>
        </div>
        <div class="icon-item">
          <ArrowDownFill color="#FF5733" />
          <span>自定义颜色</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowDownFill, ArrowUpFill, ArrowLeftFill, ArrowRightFill } from 'zxei-icons';

export default {
  name: 'IconDemo',
  components: {
    ArrowDownFill,
    ArrowUpFill,
    ArrowLeftFill,
    ArrowRightFill
  }
}
</script>

<style scoped>
.icon-demo {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.section {
  margin-bottom: 30px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
}

h2 {
  font-size: 20px;
  margin-bottom: 15px;
}

.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 100px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px;
}

.icon-item span {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
}
</style> 