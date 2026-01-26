# Table Component

Component Table mạnh mẽ và linh hoạt cho Vue 3 với nhiều tính năng nâng cao.

## Tính năng chính

- ⚡ **Virtual Scrolling**: Xử lý hiệu quả dataset lớn với hàng nghìn dòng
- 🔒 **Column Freezing**: Cố định cột bên trái khi cuộn ngang
- 📊 **Pivot Mode**: Chế độ pivot table để phân tích dữ liệu
- 👥 **Grouping**: Nhóm dữ liệu theo nhiều cấp độ
- 🎨 **Custom Slots**: Tùy chỉnh hiển thị cell với slots
- 📏 **Column Resizing**: Điều chỉnh độ rộng cột bằng cách kéo
- 🔍 **Search & Filter**: Tìm kiếm và lọc dữ liệu
- ✅ **Row Selection**: Chọn nhiều dòng với checkbox
- 📱 **Responsive**: Tương thích với nhiều kích thước màn hình
- 💾 **Persistence**: Lưu cấu hình cột vào localStorage

## Cài đặt

```typescript
import { Table } from '@/components/custom/table';
```

## Sử dụng cơ bản

```vue
<template>
  <Table
    :columns="columns"
    :data="data"
    :total-rows="data.length"
    :table_info="{ name: 'my-table', key_id: 'id' }"
    @row-click="handleRowClick"
  />
</template>

<script setup>
const columns = [
  { field: 'id', name: 'ID', width: 60 },
  { field: 'name', name: 'Tên', width: 200 },
  { field: 'email', name: 'Email', width: 250 }
];

const data = [
  { id: 1, name: 'Nguyễn Văn A', email: 'a@example.com' },
  { id: 2, name: 'Trần Thị B', email: 'b@example.com' }
];

const handleRowClick = (row, index) => {
  console.log('Clicked:', row);
};
</script>
```

## Props

| Prop | Type | Default | Mô tả |
|------|------|---------|-------|
| `columns` | `Array` | `[]` | Định nghĩa cột của bảng |
| `data` | `Array` | `[]` | Dữ liệu hiển thị |
| `totalRows` | `Number` | `0` | Tổng số dòng (cho pagination) |
| `currentPage` | `Number` | `1` | Trang hiện tại |
| `pageSize` | `Number` | `50` | Số dòng mỗi trang |
| `tableInfo` | `Object` | `{}` | Thông tin bảng (name, key_id) |
| `showToolbar` | `Boolean` | `true` | Hiển thị thanh công cụ |
| `showCheckbox` | `Boolean` | `false` | Hiển thị checkbox chọn dòng |
| `showPaging` | `Boolean` | `false` | Hiển thị phân trang |
| `showSorting` | `Boolean` | `true` | Cho phép sắp xếp |
| `tools` | `Array` | `[]` | Danh sách công cụ toolbar |
| `enableColumnFreeze` | `Boolean` | `false` | Cho phép cố định cột |
| `enableGrouping` | `Boolean` | `false` | Cho phép nhóm dữ liệu |
| `rowGroups` | `Array` | `[]` | Danh sách cột để nhóm |
| `pivotMode` | `Boolean` | `false` | Bật chế độ pivot |
| `pivotDimensions` | `Array` | `[]` | Dimensions cho pivot |
| `pivotMetrics` | `Array` | `[]` | Metrics cho pivot |
| `enableDynamicRowHeight` | `Boolean` | `false` | Chiều cao dòng động |
| `rowHeight` | `Number` | `40` | Chiều cao dòng cố định |
| `headerHeight` | `Number` | `40` | Chiều cao header |
| `colorRules` | `Array` | `[]` | Quy tắc tô màu có điều kiện |

## Column Configuration

```typescript
interface Column {
  field: string;       // Tên field trong data
  name: string;        // Tên hiển thị
  width?: number;      // Độ rộng (px)
  frozen?: boolean;    // Cố định cột
  sortable?: boolean;  // Cho phép sắp xếp
  position?: 'left' | 'right' | 'center'; // Căn chỉnh
  editable?: boolean;  // Cho phép chỉnh sửa
  formatter?: (value: any) => string; // Format giá trị
}
```

## Events

| Event | Payload | Mô tả |
|-------|---------|-------|
| `row-click` | `(row, index)` | Khi click vào dòng |
| `select` | `(selectedRows)` | Khi chọn/bỏ chọn dòng |
| `sort` | `(column, direction)` | Khi sắp xếp |
| `search` | `(query)` | Khi tìm kiếm |
| `filter` | `(filters)` | Khi lọc dữ liệu |
| `page-change` | `(page)` | Khi chuyển trang |
| `column-resize` | `(column, width)` | Khi resize cột |
| `cell-edit` | `(row, column, value)` | Khi sửa cell |

## Toolbar Tools

Các công cụ có thể sử dụng trong toolbar:

- `refresh` - Nút làm mới
- `search` - Ô tìm kiếm
- `filter` - Bộ lọc nâng cao
- `custom-column` - Tùy chỉnh cột hiển thị
- `zoom` - Chế độ toàn màn hình
- `group` - Cấu hình nhóm
- `pivot` - Cấu hình pivot
- `export` - Xuất dữ liệu
- `date` - Bộ lọc ngày tháng

## Custom Slots

### Cell Slots

Tùy chỉnh hiển thị cho từng cột:

```vue
<Table :columns="columns" :data="data">
  <!-- Slot cho cột status -->
  <template #status="{ value, row, column }">
    <span :class="getStatusClass(value)">
      {{ value }}
    </span>
  </template>
  
  <!-- Slot cho cột action -->
  <template #action="{ row }">
    <button @click="editRow(row)">Edit</button>
    <button @click="deleteRow(row)">Delete</button>
  </template>
</Table>
```

### Header Slots

Tùy chỉnh header:

```vue
<template #header-status="{ column }">
  <div class="custom-header">
    {{ column.name }}
    <Icon name="info" />
  </div>
</template>
```

## Virtual Scrolling

Table tự động sử dụng virtual scrolling cho dataset lớn. Chỉ render các dòng và cột trong viewport:

```vue
<Table
  :data="largeDataset"  
  :total-rows="100000"
  :virtual-scroll="true"
  :buffer-size="5"
/>
```

## Column Freezing

Cố định cột bên trái:

```javascript
const columns = [
  { field: 'id', name: 'ID', width: 60, frozen: true },
  { field: 'name', name: 'Name', width: 200, frozen: true },
  // Các cột khác sẽ scroll ngang
  { field: 'email', name: 'Email', width: 250 }
];
```

## Grouping

Nhóm dữ liệu theo cột:

```vue
<Table
  :data="data"
  :enable-grouping="true"
  :row-groups="['department', 'role']"
/>
```

## Pivot Mode

Chế độ pivot để phân tích dữ liệu:

```vue
<Table
  :data="salesData"
  :pivot-mode="true"
  :pivot-dimensions="['category', 'month']"
  :pivot-metrics="['revenue', 'quantity']"
/>
```

## Dynamic Row Height

Chiều cao dòng tự động theo nội dung:

```vue
<Table
  :data="data"
  :enable-dynamic-row-height="true"
  :get-row-height="(row) => {
    // Logic tính chiều cao
    return row.description?.length > 100 ? 80 : 40;
  }"
/>
```

## Color Rules

Tô màu có điều kiện:

```javascript
const colorRules = [
  {
    column: 'status',
    condition: (value) => value === 'active',
    style: { background: '#10b981', color: 'white' }
  },
  {
    column: 'amount',
    condition: (value) => value > 1000000,
    style: { fontWeight: 'bold', color: '#ef4444' }
  }
];
```

## Performance Tips

1. **Virtual Scrolling**: Luôn bật cho dataset > 1000 dòng
2. **Lazy Loading**: Load dữ liệu theo trang với `@page-change`
3. **Memoization**: Cache computed values cho format phức tạp
4. **Debounce**: Debounce search và filter operations
5. **Column Width**: Đặt width cố định để tránh recalculate

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Dependencies

- Vue 3.3+
- TypeScript 5.0+ (optional)
- TailwindCSS (for styling)

## License

MIT