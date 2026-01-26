<template>
    <div class="p-8 space-y-8 w-full">
        <h1 class="text-3xl font-bold mb-6">Table Component Demo</h1>

        <!-- Demo 1: Basic Table với Virtual Scrolling -->
        <section class="space-y-4">
            <h2 class="text-xl font-semibold">1. Basic Table với Virtual Scrolling</h2>
            <p class="text-gray-600">Bảng cơ bản với khả năng xử lý dữ liệu lớn nhờ virtual scrolling</p>

            <Table
                :columns="basicColumns"
                :data="basicData"
                :total-rows="basicData.length"
                :current-page="1"
                :table_info="{ name: 'basic-table', key_id: 'id' }"
                :show-toolbar="true"
                :show-checkbox="true"
                :tools="['refresh', 'search', 'custom-column', 'zoom']"
                @row-click="handleRowClick"
                @select="handleSelect" />
        </section>

        <!-- Demo 2: Table với Column Freezing -->
        <section class="space-y-4">
            <h2 class="text-xl font-semibold">2. Table với Column Freezing</h2>
            <p class="text-gray-600">Có thể cố định cột bên trái bằng cách nhấn vào icon trong header</p>

            <Table
                :columns="freezeColumns"
                :data="freezeData"
                :total-rows="freezeData.length"
                :table_info="{ name: 'freeze-table', key_id: 'id' }"
                :show-toolbar="true"
                :enable-column-freeze="true"
                :tools="['custom-column']" />
        </section>

        <!-- Demo 3: Table với Grouping -->
        <section class="space-y-4">
            <h2 class="text-xl font-semibold">3. Table với Grouping</h2>
            <p class="text-gray-600">Nhóm dữ liệu theo cột department</p>

            <Table
                :columns="groupColumns"
                :data="groupData"
                :total-rows="groupData.length"
                :table_info="{ name: 'group-table', key_id: 'id' }"
                :show-toolbar="true"
                :enable-grouping="true"
                :row-groups="['department']"
                :tools="['group']" />
        </section>

        <!-- Demo 4: Table với Pivot Mode -->
        <section class="space-y-4">
            <h2 class="text-xl font-semibold">4. Table với Pivot Mode</h2>
            <p class="text-gray-600">Chế độ pivot để phân tích dữ liệu</p>

            <Table
                :columns="pivotColumns"
                :data="pivotData"
                :table_info="{ name: 'pivot-table', key_id: 'id' }"
                :show-toolbar="true"
                :pivot-mode="true"
                :pivot-dimensions="['category', 'month']"
                :pivot-metrics="['revenue', 'quantity']"
                :tools="['pivot']" />
        </section>

        <!-- Demo 5: Table với Custom Slots -->
        <section class="space-y-4">
            <h2 class="text-xl font-semibold">5. Table với Custom Slots</h2>
            <p class="text-gray-600">Tùy chỉnh hiển thị cell với slots</p>

            <Table
                :columns="slotColumns"
                :data="slotData"
                :total-rows="slotData.length"
                :table_info="{ name: 'slot-table', key_id: 'id' }"
                :show-toolbar="false">
                <!-- Custom slot cho status column -->
                <template #status="{ value }">
                    <span class="px-2 py-1 rounded-full text-xs font-medium" :class="getStatusClass(value)">
                        {{ value }}
                    </span>
                </template>

                <!-- Custom slot cho action column -->
                <template #action="{ row }">
                    <div class="flex gap-2">
                        <button @click="handleEdit(row)" class="p-1 hover:bg-gray-100 rounded">
                            <Icon name="edit" :size="16" />
                        </button>
                        <button @click="handleDelete(row)" class="p-1 hover:bg-red-100 rounded text-red-600">
                            <Icon name="trash" :size="16" />
                        </button>
                    </div>
                </template>
            </Table>
        </section>

        <!-- Demo 6: Table với Dynamic Row Height -->
        <section class="space-y-4">
            <h2 class="text-xl font-semibold">6. Table với Dynamic Row Height</h2>
            <p class="text-gray-600">Chiều cao dòng tự động điều chỉnh theo nội dung</p>

            <Table
                :columns="dynamicColumns"
                :data="dynamicData"
                :total-rows="dynamicData.length"
                :table_info="{ name: 'dynamic-table', key_id: 'id' }"
                :enable-dynamic-row-height="true"
                :show-toolbar="false" />
        </section>

        <!-- Demo 7: Large Dataset với Pagination -->
        <section class="space-y-4 h-[500px]">
            <h2 class="text-xl font-semibold">7. Large Dataset với Pagination</h2>
            <p class="text-gray-600">Xử lý dataset lớn với phân trang và virtual scrolling</p>

            <Table
                :columns="largeColumns"
                :data="largeDataset"
                :total-rows="10000"
                :current-page="currentPage"
                :page-size="50"
                :table_info="{ name: 'large-table', key_id: 'id' }"
                :show-toolbar="true"
                :show-paging="true"
                :tools="['refresh', 'search', 'filter']"
                @page-change="handlePageChange" />
        </section>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { Table } from "./index"
import { Icon } from "@/components/custom/icon"

// Basic table data
const basicColumns = ref([
    { field: "id", name: "ID", width: 60 },
    { field: "name", name: "Tên", width: 200 },
    { field: "email", name: "Email", width: 250 },
    { field: "role", name: "Vai trò", width: 150 },
    { field: "department", name: "Phòng ban", width: 150 },
    { field: "joinDate", name: "Ngày tham gia", width: 150 }
])

const basicData = ref([
    {
        id: 1,
        name: "Nguyễn Văn A",
        email: "a.nguyen@example.com",
        role: "Developer",
        department: "Engineering",
        joinDate: "2023-01-15"
    },
    {
        id: 2,
        name: "Trần Thị B",
        email: "b.tran@example.com",
        role: "Designer",
        department: "Design",
        joinDate: "2023-02-20"
    },
    {
        id: 3,
        name: "Lê Văn C",
        email: "c.le@example.com",
        role: "Manager",
        department: "Management",
        joinDate: "2023-03-10"
    },
    {
        id: 4,
        name: "Phạm Thị D",
        email: "d.pham@example.com",
        role: "Developer",
        department: "Engineering",
        joinDate: "2023-04-05"
    },
    {
        id: 5,
        name: "Hoàng Văn E",
        email: "e.hoang@example.com",
        role: "Tester",
        department: "QA",
        joinDate: "2023-05-12"
    }
])

// Freeze columns data
const freezeColumns = ref([
    { field: "id", name: "ID", width: 60, frozen: true },
    { field: "name", name: "Họ tên", width: 150, frozen: true },
    { field: "position", name: "Vị trí", width: 150 },
    { field: "department", name: "Phòng ban", width: 150 },
    { field: "salary", name: "Lương", width: 120 },
    { field: "bonus", name: "Thưởng", width: 120 },
    { field: "total", name: "Tổng", width: 120 },
    { field: "performance", name: "Hiệu suất", width: 100 },
    { field: "projects", name: "Dự án", width: 100 },
    { field: "skills", name: "Kỹ năng", width: 200 }
])

const freezeData = ref(
    Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        name: `Nhân viên ${i + 1}`,
        position: ["Developer", "Designer", "Manager", "Tester"][i % 4],
        department: ["Engineering", "Design", "Management", "QA"][i % 4],
        salary: Math.floor(Math.random() * 50000000) + 10000000,
        bonus: Math.floor(Math.random() * 10000000),
        total: 0,
        performance: Math.floor(Math.random() * 100) + "%",
        projects: Math.floor(Math.random() * 10) + 1,
        skills: ["React, Node.js", "Figma, Sketch", "Leadership, Planning", "Selenium, Jest"][i % 4]
    })).map(item => ({ ...item, total: item.salary + item.bonus }))
)

// Group columns data
const groupColumns = ref([
    { field: "name", name: "Họ tên", width: 200 },
    { field: "department", name: "Phòng ban", width: 150 },
    { field: "role", name: "Vai trò", width: 150 },
    { field: "experience", name: "Kinh nghiệm", width: 120 },
    { field: "salary", name: "Lương", width: 150 }
])

const groupData = ref([
    { id: 1, name: "Nguyễn Văn A", department: "Engineering", role: "Senior Dev", experience: "5 năm", salary: "30M" },
    { id: 2, name: "Trần Thị B", department: "Engineering", role: "Junior Dev", experience: "1 năm", salary: "15M" },
    { id: 3, name: "Lê Văn C", department: "Design", role: "UI Designer", experience: "3 năm", salary: "20M" },
    { id: 4, name: "Phạm Thị D", department: "Design", role: "UX Designer", experience: "4 năm", salary: "25M" },
    { id: 5, name: "Hoàng Văn E", department: "Management", role: "PM", experience: "6 năm", salary: "35M" },
    { id: 6, name: "Vũ Thị F", department: "Management", role: "Scrum Master", experience: "3 năm", salary: "22M" },
    { id: 7, name: "Đặng Văn G", department: "QA", role: "Test Lead", experience: "4 năm", salary: "24M" },
    { id: 8, name: "Bùi Thị H", department: "QA", role: "Tester", experience: "2 năm", salary: "16M" }
])

// Pivot columns data
const pivotColumns = ref([
    { field: "category", name: "Danh mục", width: 150 },
    { field: "month", name: "Tháng", width: 100 },
    { field: "revenue", name: "Doanh thu", width: 150 },
    { field: "quantity", name: "Số lượng", width: 100 }
])

const pivotData = ref([
    { id: 1, category: "Điện tử", month: "T1", revenue: 15000000, quantity: 120 },
    { id: 2, category: "Điện tử", month: "T2", revenue: 18000000, quantity: 150 },
    { id: 3, category: "Điện tử", month: "T3", revenue: 22000000, quantity: 180 },
    { id: 4, category: "Thời trang", month: "T1", revenue: 12000000, quantity: 200 },
    { id: 5, category: "Thời trang", month: "T2", revenue: 14000000, quantity: 220 },
    { id: 6, category: "Thời trang", month: "T3", revenue: 16000000, quantity: 250 },
    { id: 7, category: "Thực phẩm", month: "T1", revenue: 8000000, quantity: 500 },
    { id: 8, category: "Thực phẩm", month: "T2", revenue: 9000000, quantity: 550 },
    { id: 9, category: "Thực phẩm", month: "T3", revenue: 11000000, quantity: 600 }
])

// Slot columns data
const slotColumns = ref([
    { field: "id", name: "ID", width: 60 },
    { field: "product", name: "Sản phẩm", width: 200 },
    { field: "price", name: "Giá", width: 150 },
    { field: "status", name: "Trạng thái", width: 120 },
    { field: "action", name: "Thao tác", width: 100 }
])

const slotData = ref([
    { id: 1, product: "iPhone 15 Pro", price: "28.999.000đ", status: "active" },
    { id: 2, product: "Samsung Galaxy S24", price: "22.999.000đ", status: "active" },
    { id: 3, product: "iPad Pro M2", price: "24.999.000đ", status: "inactive" },
    { id: 4, product: "MacBook Air M2", price: "32.999.000đ", status: "pending" },
    { id: 5, product: "AirPods Pro 2", price: "6.499.000đ", status: "active" }
])

// Dynamic height columns data
const dynamicColumns = ref([
    { field: "title", name: "Tiêu đề", width: 200 },
    { field: "description", name: "Mô tả", width: 400 },
    { field: "author", name: "Tác giả", width: 150 }
])

const dynamicData = ref([
    {
        id: 1,
        title: "Bài viết ngắn",
        description: "Mô tả ngắn gọn",
        author: "Nguyễn Văn A"
    },
    {
        id: 2,
        title: "Bài viết dài",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
        author: "Trần Thị B"
    },
    {
        id: 3,
        title: "Bài viết trung bình",
        description: "Đây là một mô tả có độ dài trung bình, không quá ngắn cũng không quá dài.",
        author: "Lê Văn C"
    }
])

// Large dataset columns
const largeColumns = ref([
    { field: "id", name: "ID", width: 80 },
    { field: "customerName", name: "Khách hàng", width: 200 },
    { field: "orderNumber", name: "Mã đơn", width: 150 },
    { field: "product", name: "Sản phẩm", width: 250 },
    { field: "quantity", name: "SL", width: 80 },
    { field: "price", name: "Giá", width: 120 },
    { field: "total", name: "Tổng", width: 120 },
    { field: "orderDate", name: "Ngày đặt", width: 120 },
    { field: "status", name: "Trạng thái", width: 100 }
])

// Generate large dataset
const largeDataset = ref<any[]>([])
const currentPage = ref(1)

const generateLargeData = (page: number, pageSize: number = 50) => {
    const start = (page - 1) * pageSize
    const products = ["iPhone 15", "Samsung S24", "iPad Pro", "MacBook Air", "AirPods"]
    const statuses = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"]

    return Array.from({ length: pageSize }, (_, i) => {
        const quantity = Math.floor(Math.random() * 10) + 1
        const price = Math.floor(Math.random() * 50000000) + 1000000
        return {
            id: start + i + 1,
            customerName: `Khách hàng ${start + i + 1}`,
            orderNumber: `ORD-${String(start + i + 1).padStart(6, "0")}`,
            product: products[Math.floor(Math.random() * products.length)],
            quantity,
            price,
            total: quantity * price,
            orderDate: new Date(
                2024,
                Math.floor(Math.random() * 12),
                Math.floor(Math.random() * 28) + 1
            ).toLocaleDateString("vi-VN"),
            status: statuses[Math.floor(Math.random() * statuses.length)]
        }
    })
}

// Event handlers
const handleRowClick = (row: any, index: number) => {
    console.log("Row clicked:", row, "Index:", index)
}

const handleSelect = (selectedRows: any[]) => {
    console.log("Selected rows:", selectedRows)
}

const handleEdit = (row: any) => {
    console.log("Edit row:", row)
}

const handleDelete = (row: any) => {
    console.log("Delete row:", row)
}

const handlePageChange = (page: number) => {
    currentPage.value = page
    largeDataset.value = generateLargeData(page)
}

const getStatusClass = (status: string) => {
    const classes: Record<string, string> = {
        active: "bg-green-100 text-green-800",
        inactive: "bg-gray-100 text-gray-800",
        pending: "bg-yellow-100 text-yellow-800"
    }
    return classes[status] || "bg-gray-100 text-gray-800"
}

// Initialize data
onMounted(() => {
    largeDataset.value = generateLargeData(1)
})
</script>
