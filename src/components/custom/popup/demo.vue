<template>
    <div class="demo-container">
        <h1>Popup Component Demo</h1>

        <!-- Popup cơ bản -->
        <div class="demo-section">
            <h2>Popup cơ bản</h2>
            <Button @click="basicPopup = true" variant="secondary">Mở Popup cơ bản</Button>

            <Popup v-model="basicPopup" title="Tiêu đề Popup">
                <p>Đây là popup cơ bản với tiêu đề và nội dung.</p>
                <p class="mt-2">Click vào nút X hoặc bên ngoài để đóng.</p>
            </Popup>
        </div>

        <!-- Popup với footer -->
        <div class="demo-section">
            <h2>Popup với Footer</h2>
            <Button @click="footerPopup = true">Mở Popup có Footer</Button>

            <Popup v-model="footerPopup" title="Xác nhận hành động">
                <p>Bạn có chắc chắn muốn thực hiện hành động này?</p>
                <p class="text-muted">Hành động này không thể hoàn tác.</p>

                <template #footer>
                    <div class="footer-actions">
                        <Button @click="footerPopup = false">Hủy</Button>
                        <Button @click="handleConfirm">Xác nhận</Button>
                    </div>
                </template>
            </Popup>
        </div>

        <!-- Header tùy chỉnh -->
        <div class="demo-section">
            <h2>Header tùy chỉnh</h2>
            <Button @click="customHeaderPopup = true">Mở Popup Header tùy chỉnh</Button>

            <Popup v-model="customHeaderPopup" width="600px">
                <template #header-icon>
                    <div class="alert-icon">!</div>
                </template>

                <template #header-title>
                    <span class="text-danger">Thông báo quan trọng</span>
                </template>

                <template #header-extra>
                    <label class="checkbox-label">
                        <input type="checkbox" v-model="isInternal" />
                        <span>Nội bộ</span>
                    </label>
                </template>

                <div>
                    <p>Popup này có header tùy chỉnh với icon, tiêu đề được style, và nội dung bổ sung.</p>
                    <p class="mt-2">
                        Checkbox nội bộ đang
                        {{ isInternal ? "được chọn" : "không được chọn" }}
                    </p>
                </div>
            </Popup>
        </div>

        <!-- Popup với form phức tạp -->
        <div class="demo-section">
            <h2>Form đăng ký</h2>
            <Button @click="formPopup = true">Mở Form đăng ký (860px)</Button>

            <Popup v-model="formPopup" title="Form đăng ký" width="860px">
                <form class="registration-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Họ</label>
                            <input type="text" class="form-control" placeholder="Nhập họ" />
                        </div>
                        <div class="form-group">
                            <label>Tên</label>
                            <input type="text" class="form-control" placeholder="Nhập tên" />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" class="form-control" placeholder="email@example.com" />
                    </div>

                    <div class="form-group">
                        <label>Số điện thoại</label>
                        <input type="tel" class="form-control" placeholder="0909090909" />
                    </div>

                    <div class="form-group">
                        <label>Địa chỉ</label>
                        <textarea class="form-control" rows="3" placeholder="Nhập địa chỉ"></textarea>
                    </div>
                </form>

                <template #footer>
                    <div class="footer-actions">
                        <Button @click="formPopup = false">Hủy</Button>
                        <Button @click="handleSubmit">Đăng ký</Button>
                    </div>
                </template>
            </Popup>
        </div>

        <!-- Nội dung dài có scroll -->
        <div class="demo-section">
            <h2>Nội dung có Scroll</h2>
            <Button @click="scrollablePopup = true">Mở Popup nội dung dài</Button>

            <Popup v-model="scrollablePopup" title="Danh sách sản phẩm" width="500px">
                <div class="product-list">
                    <p class="list-header">Danh sách có 50 sản phẩm (scroll để xem thêm):</p>
                    <div v-for="i in 50" :key="i" class="product-item">
                        <span class="product-number">{{ i }}</span>
                        <span class="product-name">Sản phẩm {{ i }} - Lorem ipsum dolor sit amet</span>
                        <span class="product-price">{{ (i * 100000).toLocaleString("vi-VN") }}đ</span>
                    </div>
                </div>

                <template #footer>
                    <Button @click="scrollablePopup = false">Đóng</Button>
                </template>
            </Popup>
        </div>

        <!-- Không đóng khi click outside -->
        <div class="demo-section">
            <h2>Modal (Không đóng khi click ngoài)</h2>
            <Button @click="modalPopup = true">Mở Modal quan trọng</Button>

            <Popup v-model="modalPopup" title="Thông tin quan trọng" :close-on-click-outside="false">
                <div class="modal-content">
                    <p class="warning-text">⚠️ Popup này không thể đóng khi click bên ngoài!</p>
                    <p>Bạn phải sử dụng nút X hoặc nút trong footer để đóng.</p>
                    <p class="mt-3">Điều này hữu ích cho các form quan trọng hoặc cảnh báo.</p>
                </div>

                <template #footer>
                    <Button variant="primary" @click="modalPopup = false">Tôi đã hiểu</Button>
                </template>
            </Popup>
        </div>

        <!-- Popup không có title -->
        <div class="demo-section">
            <h2>Popup không tiêu đề</h2>
            <Button @click="noTitlePopup = true">Mở Popup không tiêu đề</Button>

            <Popup v-model="noTitlePopup" width="400px">
                <div class="custom-content">
                    <div class="success-icon">✅</div>
                    <h3>Thành công!</h3>
                    <p>Thao tác của bạn đã được thực hiện thành công.</p>
                    <Button class="mt-4" @click="noTitlePopup = false">OK</Button>
                </div>
            </Popup>
        </div>

        <!-- Popup với height cố định -->
        <div class="demo-section">
            <h2>Popup với chiều cao cố định</h2>
            <Button @click="fixedHeightPopup = true">Mở Popup height 400px</Button>

            <Popup v-model="fixedHeightPopup" title="Log Viewer" width="700px" height="400px">
                <div class="log-viewer">
                    <div v-for="i in 100" :key="i" class="log-entry">
                        <span class="log-time">[{{ new Date().toLocaleTimeString() }}]</span>
                        <span class="log-level" :class="getLogLevel(i)">{{ getLogLevel(i)?.toUpperCase() }}</span>
                        <span class="log-message">Log message {{ i }} - Lorem ipsum dolor sit amet</span>
                    </div>
                </div>
            </Popup>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Popup } from "./index"
import { Button } from "../button"

const basicPopup = ref(false)
const footerPopup = ref(false)
const customHeaderPopup = ref(false)
const formPopup = ref(false)
const scrollablePopup = ref(false)
const modalPopup = ref(false)
const noTitlePopup = ref(false)
const fixedHeightPopup = ref(false)

const isInternal = ref(false)

const handleConfirm = () => {
    alert("Đã xác nhận hành động!")
    footerPopup.value = false
}

const handleSubmit = () => {
    alert("Form đã được gửi!")
    formPopup.value = false
}

const getLogLevel = (index: number) => {
    const levels = ["info", "warning", "error", "debug"]
    return levels[index % levels.length]
}
</script>

<style scoped>
.demo-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 2rem;
    color: #333;
}

h2 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
    color: #555;
}

.demo-section {
    margin-bottom: 3rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 8px;
}

/* Form styles */
.registration-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.form-group label {
    font-weight: 500;
    font-size: 0.875rem;
    color: #374151;
}

.form-control {
    padding: 0.5rem 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 0.875rem;
    transition: border-color 0.2s;
}

.form-control:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Footer styles */
.footer-actions {
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
}

/* Custom header styles */
.alert-icon {
    width: 1.5rem;
    height: 1.5rem;
    background-color: var(--danger-600);
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.875rem;
    font-weight: bold;
}

.text-danger {
    color: var(--danger-600);
}

.checkbox-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
}

/* Product list styles */
.product-list {
    padding: 1rem;
}

.list-header {
    font-weight: 600;
    margin-bottom: 1rem;
}

.product-item {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: 1rem;
    padding: 0.75rem 0;
    border-bottom: 1px solid #e5e7eb;
    align-items: center;
}

.product-number {
    font-weight: 500;
    color: #6b7280;
}

.product-name {
    color: #374151;
}

.product-price {
    font-weight: 600;
    color: #059669;
}

/* Modal styles */
.modal-content {
    padding: 1.5rem;
    text-align: center;
}

.warning-text {
    font-size: 1.125rem;
    font-weight: 600;
    color: #d97706;
    margin-bottom: 1rem;
}

/* Success popup styles */
.custom-content {
    padding: 2rem;
    text-align: center;
}

.success-icon {
    font-size: 3rem;
    margin-bottom: 1rem;
}

.custom-content h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
}

/* Log viewer styles */
.log-viewer {
    font-family: monospace;
    font-size: 0.875rem;
    background: #1e293b;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 4px;
}

.log-entry {
    display: flex;
    gap: 0.75rem;
    padding: 0.25rem 0;
    border-bottom: 1px solid #334155;
}

.log-time {
    color: #94a3b8;
}

.log-level {
    font-weight: 600;
    width: 60px;
}

.log-level.info {
    color: #3b82f6;
}

.log-level.warning {
    color: #f59e0b;
}

.log-level.error {
    color: #ef4444;
}

.log-level.debug {
    color: #10b981;
}

.log-message {
    flex: 1;
    color: #cbd5e1;
}

.text-muted {
    color: #6b7280;
    font-size: 0.875rem;
    margin-top: 0.5rem;
}
</style>
