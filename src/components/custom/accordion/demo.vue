<template>
  <div class="demo-container">
    <h1>Accordion Component Demo</h1>
    
    <div class="demo-section">
      <h2>Accordion đơn giản</h2>
      <Accordion>
        <template #title>
          <h3>Câu hỏi thường gặp về Vue.js</h3>
        </template>
        <template #content>
          <div style="padding: 0 16px 16px 16px;">
            <p>Vue.js là một framework JavaScript progressive được sử dụng để xây dựng giao diện người dùng. 
            Không giống như các framework monolithic khác, Vue được thiết kế từ đầu để có thể áp dụng dần dần.</p>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="demo-section">
      <h2>Accordion với v-model</h2>
      <div class="controls">
        <button @click="controlledAccordion = !controlledAccordion" class="control-button">
          {{ controlledAccordion ? 'Đóng' : 'Mở' }} Accordion từ bên ngoài
        </button>
        <span class="status">Trạng thái: {{ controlledAccordion ? 'Đang mở' : 'Đã đóng' }}</span>
      </div>
      <Accordion v-model="controlledAccordion">
        <template #title>
          <h3>Accordion được điều khiển bằng v-model</h3>
        </template>
        <template #content>
          <div style="padding: 0 16px 16px 16px;">
            <p>Accordion này có thể được điều khiển từ bên ngoài thông qua v-model binding.</p>
            <p>Click vào button phía trên hoặc vào header để toggle.</p>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="demo-section">
      <h2>Accordion với disabled state</h2>
      <Accordion :disabled="true">
        <template #title>
          <h3 style="opacity: 0.5;">🔒 Accordion bị vô hiệu hóa</h3>
        </template>
        <template #content>
          <div style="padding: 0 16px 16px 16px;">
            <p>Nội dung này không thể được xem vì accordion bị disabled</p>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="demo-section">
      <h2>Accordion với events</h2>
      <div class="event-log">
        <strong>Event Log:</strong> {{ eventLog }}
      </div>
      <Accordion @open="handleOpen" @close="handleClose">
        <template #title>
          <h3>Accordion với event handlers</h3>
        </template>
        <template #content>
          <div style="padding: 0 16px 16px 16px;">
            <p>Mở/đóng accordion này để xem events được emit</p>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="demo-section">
      <h2>Nhiều Accordion</h2>
      <div class="accordion-group">
        <Accordion>
          <template #title>
            <div class="custom-title">
              <span>🎯 Tính năng chính</span>
            </div>
          </template>
          <template #content>
            <div style="padding: 0 16px 16px 16px;">
              <ul>
                <li>Reactive và composable</li>
                <li>Component-based</li>
                <li>Virtual DOM</li>
                <li>Lightweight và performance tốt</li>
              </ul>
            </div>
          </template>
        </Accordion>

        <Accordion>
          <template #title>
            <div class="custom-title">
              <span>📚 Tài liệu học tập</span>
            </div>
          </template>
          <template #content>
            <div style="padding: 0 16px 16px 16px;">
              <p>Bạn có thể tìm hiểu thêm về Vue.js tại:</p>
              <ul>
                <li>Official Documentation: vuejs.org</li>
                <li>Vue School: vueschool.io</li>
                <li>Vue Mastery: vuemastery.com</li>
              </ul>
            </div>
          </template>
        </Accordion>

        <Accordion>
          <template #title>
            <div class="custom-title">
              <span>💡 Tips & Tricks</span>
            </div>
          </template>
          <template #content>
            <div class="tips-content">
              <p><strong>Tip 1:</strong> Sử dụng Composition API cho logic phức tạp</p>
              <p><strong>Tip 2:</strong> Tận dụng computed properties để tối ưu performance</p>
              <p><strong>Tip 3:</strong> Sử dụng v-show thay vì v-if cho các toggle thường xuyên</p>
            </div>
          </template>
        </Accordion>
      </div>
    </div>

    <div class="demo-section">
      <h2>Accordion với nội dung phức tạp</h2>
      <Accordion>
        <template #title>
          <div class="complex-title">
            <span class="icon">📊</span>
            <div>
              <h4>Báo cáo doanh thu Q4/2024</h4>
              <p class="subtitle">Click để xem chi tiết</p>
            </div>
          </div>
        </template>
        <template #content>
          <div class="report-content">
            <table>
              <thead>
                <tr>
                  <th>Tháng</th>
                  <th>Doanh thu</th>
                  <th>Tăng trưởng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Tháng 10</td>
                  <td>$125,000</td>
                  <td class="positive">+15%</td>
                </tr>
                <tr>
                  <td>Tháng 11</td>
                  <td>$142,000</td>
                  <td class="positive">+13.6%</td>
                </tr>
                <tr>
                  <td>Tháng 12</td>
                  <td>$168,000</td>
                  <td class="positive">+18.3%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </Accordion>
    </div>

    <div class="demo-section">
      <h2>Accordion với style tùy chỉnh</h2>
      <Accordion class="custom-styled">
        <template #title>
          <h3 style="color: white;">Accordion với style custom</h3>
        </template>
        <template #content>
          <div style="padding: 16px;">
            <p>Accordion này đã được tùy chỉnh style với màu sắc và border khác biệt.</p>
          </div>
        </template>
      </Accordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Accordion } from './index'

// V-model controlled accordion
const controlledAccordion = ref(false);

// Event log
const eventLog = ref('Chưa có event nào');

const handleOpen = () => {
  eventLog.value = 'Event "open" đã được emit tại ' + new Date().toLocaleTimeString();
};

const handleClose = () => {
  eventLog.value = 'Event "close" đã được emit tại ' + new Date().toLocaleTimeString();
};
</script>

<style scoped>
.demo-container {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

h2 {
  color: #555;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.demo-section {
  margin-bottom: 40px;
}

.accordion-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-title {
  font-weight: 600;
  color: #2c3e50;
}

.complex-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.complex-title .icon {
  font-size: 2rem;
}

.complex-title h4 {
  margin: 0;
  color: #2c3e50;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 0.875rem;
  color: #718096;
}

.tips-content {
  padding: 0 16px 16px 16px;
}

.tips-content p {
  margin-bottom: 10px;
  line-height: 1.6;
}

.report-content {
  padding: 0 16px 16px 16px;
}

.report-content table {
  width: 100%;
  border-collapse: collapse;
}

.report-content th,
.report-content td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.report-content th {
  background-color: #f7fafc;
  font-weight: 600;
  color: #4a5568;
}

.report-content .positive {
  color: #48bb78;
  font-weight: 600;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

/* V-model demo controls */
.controls {
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.control-button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
}

.control-button:hover {
  background: #0056b3;
}

.status {
  color: #666;
  font-size: 14px;
}

/* Event log */
.event-log {
  padding: 12px;
  background: #f0f8ff;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 14px;
  color: #333;
}

/* Custom styled accordion */
.custom-styled {
  border: 2px solid #007bff !important;
  border-radius: 8px !important;
}

.custom-styled > div:first-child {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
  color: white;
}

.custom-styled > div:first-child:hover {
  opacity: 0.9;
}
</style>