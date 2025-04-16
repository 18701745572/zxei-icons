<template>
  <div class="demo-container">
    <h1>zxei-icons 演示</h1>
    
    <section>
      <h2>基本用法</h2>
      <div class="icon-row">
        <div class="icon-item">
          <ArrowRightFill />
          <span>默认</span>
        </div>
        <div class="icon-item">
          <ArrowRightFill :size="32" />
          <span>自定义大小</span>
        </div>
        <div class="icon-item">
          <ArrowRightFill color="red" />
          <span>自定义颜色</span>
        </div>
        <div class="icon-item">
          <ArrowRightLine :size="32" color="#3498db" />
          <span>线条图标</span>
        </div>
      </div>
    </section>

    <section>
      <h2>动态图标</h2>
      <div class="icon-row">
        <div class="icon-item">
          <component :is="currentIcon" :size="32" color="#2ecc71" />
          <span>动态切换</span>
        </div>
        <button @click="toggleIcon">切换图标</button>
      </div>
    </section>

    <section>
      <h2>图标主题</h2>
      <div class="icon-row">
        <div 
          v-for="(color, type) in theme" 
          :key="type" 
          class="icon-item"
        >
          <IconWrapper 
            :icon="ThumbUpFill" 
            :color-type="type" 
            :size="32" 
          />
          <span>{{ type }}</span>
        </div>
      </div>
    </section>

    <section>
      <h2>常用图标</h2>
      <div class="icon-grid">
        <div 
          v-for="icon in commonIcons" 
          :key="icon.name" 
          class="icon-item"
        >
          <component :is="icon.component" :size="24" />
          <span>{{ icon.name }}</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { defineComponent, h } from 'vue';
import { 
  ArrowRightFill, 
  ArrowRightLine,
  ArrowLeftFill,
  AlertFill,
  CheckFill,
  StarFill,
  HeartFill,
  UserFill,
  HomeFill,
  SettingsFill,
  CloudFill,
  ThumbUpFill,
  ThumbDownFill
} from 'zxei-icons';

// 图标主题包装器
const IconWrapper = defineComponent({
  props: {
    icon: {
      type: Object,
      required: true
    },
    size: {
      type: [Number, String],
      default: 24
    },
    colorType: {
      type: String,
      default: 'primary'
    }
  },
  setup(props) {
    const theme = {
      primary: '#3498db',
      success: '#2ecc71',
      warning: '#f1c40f',
      danger: '#e74c3c',
      info: '#1abc9c'
    };

    return () => h(props.icon, {
      size: props.size,
      color: theme[props.colorType] || theme.primary
    });
  }
});

// 动态图标切换
const currentIcon = ref(ArrowRightFill);
const toggleIcon = () => {
  currentIcon.value = currentIcon.value === ArrowRightFill 
    ? ArrowLeftFill 
    : ArrowRightFill;
};

// 主题颜色
const theme = {
  primary: '#3498db',
  success: '#2ecc71',
  warning: '#f1c40f',
  danger: '#e74c3c',
  info: '#1abc9c'
};

// 常用图标列表
const commonIcons = [
  { name: 'ArrowRightFill', component: ArrowRightFill },
  { name: 'AlertFill', component: AlertFill },
  { name: 'CheckFill', component: CheckFill },
  { name: 'StarFill', component: StarFill },
  { name: 'HeartFill', component: HeartFill },
  { name: 'UserFill', component: UserFill },
  { name: 'HomeFill', component: HomeFill },
  { name: 'SettingsFill', component: SettingsFill },
  { name: 'CloudFill', component: CloudFill },
  { name: 'ThumbUpFill', component: ThumbUpFill },
  { name: 'ThumbDownFill', component: ThumbDownFill },
  { name: 'ArrowRightLine', component: ArrowRightLine }
];
</script>

<style scoped>
.demo-container {
  font-family: Arial, sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  color: #333;
  text-align: center;
}

h2 {
  margin-top: 30px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

section {
  margin-bottom: 40px;
}

.icon-row {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 15px;
  align-items: center;
}

.icon-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 8px;
  background-color: #f9f9f9;
  min-width: 80px;
}

.icon-item span {
  margin-top: 8px;
  font-size: 12px;
  color: #666;
}

button {
  padding: 8px 16px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}
</style> 