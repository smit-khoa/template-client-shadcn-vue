# Custom Components Usage Guide

> Tài liệu này mô tả chi tiết các custom components trong dự án, bao gồm props, events, slots và cách sử dụng. Dành cho AI và developers để hiểu và tận dụng tối đa các component có sẵn.

---

## Table of Contents

1. [Accordion](#accordion)
2. [Box](#box)
3. [Button](#button)
4. [Checkbox & CheckboxBlock](#checkbox--checkboxblock)
5. [Confirm](#confirm)
6. [Drawer](#drawer)
7. [Dropdown, DropdownItem, DropdownTitle](#dropdown)
8. [Icon](#icon)
9. [Input](#input)
10. [Loading (LoadDefault, LoadPage)](#loading)
11. [Paging](#paging)
12. [Popup](#popup)
13. [Search](#search)
14. [Switch](#switch)
15. [Table](#table)
16. [AppTable](#apptable)
17. [LayoutTable](#layouttable)
18. [Tabs](#tabs)
19. [TagInput](#taginput)
20. [Toast](#toast)
21. [Tooltip](#tooltip)
22. [DatePicker](#datepicker)
23. [FilterPanel & FilterTags](#filterpanel--filtertags)
24. [ThemeToggle](#themetoggle)
25. [Display (Shared)](#display-shared)
26. [SelectAssets (Shared)](#selectassets-shared)

---

## Accordion

**Import:** `import { Accordion } from '@/components/custom/accordion'`

Component accordion có thể mở/đóng với animation smooth.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `undefined` | Two-way binding cho trạng thái mở/đóng (v-model) |
| `disabled` | `boolean` | `false` | Vô hiệu hóa khả năng toggle |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `open` | - | Emit khi accordion mở |
| `close` | - | Emit khi accordion đóng |
| `update:modelValue` | `boolean` | Two-way binding |

### Slots

| Slot | Description |
|------|-------------|
| `title` | Nội dung header/trigger của accordion |
| `content` | Nội dung bên trong accordion |

### Usage

```vue
<Accordion v-model="isOpen" @open="handleOpen" @close="handleClose">
  <template #title>
    <h3>Tiêu đề accordion</h3>
  </template>
  <template #content>
    <p>Nội dung accordion ở đây</p>
  </template>
</Accordion>

<!-- Disabled state -->
<Accordion :disabled="true">
  <template #title><h3>Không thể click</h3></template>
  <template #content><p>Nội dung</p></template>
</Accordion>
```

---

## Box

**Import:** `import { Box } from '@/components/custom/box'`

Container component với các trạng thái visual khác nhau.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `'default' \| 'selected' \| 'disabled'` | `'default'` | Trạng thái visual |
| `class` | `string` | `''` | Custom classes |

### Usage

```vue
<Box state="default">Nội dung mặc định</Box>
<Box state="selected">Đã được chọn (có highlight)</Box>
<Box state="disabled">Bị vô hiệu hóa</Box>
```

---

## Button

**Import:** `import { Button } from '@/components/custom/button'`

Button component đa năng với nhiều variants và states.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'noborder' \| 'danger' \| 'error' \| 'success' \| 'tool'` | `'primary'` | Kiểu button |
| `size` | `'default' \| 'sm' \| 'lg' \| 'mini' \| 'tiny'` | `'default'` | Kích thước |
| `disabled` | `boolean` | `false` | Vô hiệu hóa button |
| `loading` | `boolean` | `false` | Hiển thị loading spinner |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | Type của button HTML |
| `icon` | `string` | - | Tên icon hiển thị bên trái |
| `onlyIcon` | `boolean` | `false` | Chỉ hiển thị icon |
| `tooltip` | `string` | `''` | Tooltip text |
| `color_icon` | `string` | `''` | Custom màu cho icon |

### Usage

```vue
<!-- Variants -->
<Button>Primary (mặc định)</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="noborder">No Border</Button>
<Button variant="danger">Danger</Button>
<Button variant="error">Error</Button>
<Button variant="success">Success</Button>
<Button variant="tool">Tool</Button>

<!-- Sizes -->
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="mini">Mini</Button>
<Button size="tiny">Tiny</Button>

<!-- With icon -->
<Button icon="add">Thêm mới</Button>
<Button icon="download-04" variant="secondary">Tải xuống</Button>

<!-- States -->
<Button :loading="true">Đang xử lý...</Button>
<Button :disabled="true">Disabled</Button>

<!-- With tooltip -->
<Button icon="restart" variant="tool" tooltip="Làm mới trang" />
```

---

## Checkbox & CheckboxBlock

**Import:**
```js
import { Checkbox, CheckboxBlock } from '@/components/custom/checkbox'
```

### Checkbox

Component checkbox/radio cơ bản.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean \| string \| number \| any[]` | `false` | Giá trị (v-model) |
| `value` | `string \| number \| boolean` | - | Giá trị khi checked (dùng với array) |
| `label` | `string` | - | Label text |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |
| `type` | `'checkbox' \| 'radio'` | `'checkbox'` | Loại input |
| `name` | `string` | - | Name attribute cho radio group |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean \| string \| number \| any[]` | Two-way binding |
| `change` | `boolean \| string \| number \| any[]` | Khi giá trị thay đổi |

### CheckboxBlock

Checkbox với style block (có border và padding).

#### Props

Tương tự Checkbox, thêm:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `tooltip` | `string` | `''` | Tooltip text |
| `class` | `string` | `''` | Custom classes |

### Usage

```vue
<!-- Single checkbox -->
<Checkbox v-model="checked" label="Đồng ý điều khoản" />

<!-- Multiple checkboxes với array -->
<Checkbox v-model="selectedFruits" value="apple" label="Táo" />
<Checkbox v-model="selectedFruits" value="orange" label="Cam" />
<Checkbox v-model="selectedFruits" value="banana" label="Chuối" />

<!-- Radio buttons -->
<Checkbox type="radio" v-model="plan" value="basic" name="plan" label="Basic" />
<Checkbox type="radio" v-model="plan" value="pro" name="plan" label="Pro" />

<!-- CheckboxBlock -->
<CheckboxBlock v-model="selected" label="Option 1" />
<CheckboxBlock v-model="selected" :disabled="true" label="Disabled" />
<CheckboxBlock v-model="selected" tooltip="Tooltip text" label="With tooltip" />
```

---

## Confirm

**Import:** `import { Confirm } from '@/components/custom/confirm'`

Dialog xác nhận với AlertDialog.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | **required** | Trạng thái hiển thị (v-model) |
| `title` | `string` | `'Thông báo'` | Tiêu đề dialog |
| `content` | `string` | - | Nội dung dialog |
| `width` | `string \| number` | `400` | Chiều rộng |
| `image` | `string` | `''` | URL hình ảnh illustration |
| `loading` | `boolean` | `false` | Loading state cho nút xác nhận |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Two-way binding |
| `confirm` | - | Khi nhấn nút xác nhận |

### Slots

| Slot | Description |
|------|-------------|
| `content` | Custom content (thay thế prop content) |
| `footer` | Custom footer buttons |

### Usage

```vue
<Button @click="showConfirm = true">Xóa</Button>

<Confirm
  v-model="showConfirm"
  title="Xác nhận xóa"
  content="Bạn có chắc chắn muốn xóa mục này?"
  @confirm="handleDelete"
/>

<!-- Custom footer -->
<Confirm v-model="showSave" title="Lưu thay đổi?">
  <template #footer>
    <Button variant="secondary" @click="handleDiscard">Không lưu</Button>
    <Button @click="handleSave">Lưu</Button>
  </template>
</Confirm>
```

---

## Drawer

**Import:** `import { Drawer } from '@/components/custom/drawer'`

Side panel drawer có thể resize.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | `false` | Trạng thái mở/đóng (v-model) |
| `width` | `string` | `'max-content'` | Chiều rộng (px, %, etc.) |
| `side` | `'left' \| 'right'` | `'right'` | Vị trí xuất hiện |
| `isPriority` | `boolean` | `false` | Không cho đóng khi click outside |
| `isConfirm` | `boolean` | `false` | Yêu cầu xác nhận trước khi đóng |
| `hideClose` | `boolean` | `false` | Ẩn nút close |
| `hasOverlay` | `boolean` | `false` | Có glass overlay effect |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Two-way binding |
| `open` | - | Khi drawer mở |
| `close` | - | Khi drawer đóng |
| `confirm-close` | - | Khi cố đóng drawer với isConfirm=true |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Full custom content |
| `header` | Header section |
| `content` | Main content |
| `footer` | Footer section |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `open()` | Mở drawer |
| `close()` | Đóng drawer |

### Usage

```vue
<Button @click="drawerOpen = true">Mở Drawer</Button>

<Drawer v-model="drawerOpen" width="600px">
  <template #header>
    <h3>Tiêu đề Drawer</h3>
  </template>
  <template #content>
    <p>Nội dung drawer</p>
  </template>
  <template #footer>
    <Button variant="secondary" @click="drawerOpen = false">Hủy</Button>
    <Button @click="handleSave">Lưu</Button>
  </template>
</Drawer>

<!-- Priority mode (không đóng khi click outside) -->
<Drawer v-model="priorityDrawer" :isPriority="true" width="500px">
  ...
</Drawer>

<!-- Confirm before close -->
<Drawer v-model="confirmDrawer" :isConfirm="true" @confirm-close="showConfirmDialog">
  ...
</Drawer>

<!-- Using ref methods -->
<Drawer ref="drawerRef" v-model="refDrawer">...</Drawer>
<Button @click="drawerRef.open()">Open</Button>
<Button @click="drawerRef.close()">Close</Button>
```

---

## Dropdown

**Import:**
```js
import { Dropdown, DropdownItem, DropdownTitle } from '@/components/custom/dropdown'
```

### Dropdown (Container)

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | - | Trạng thái mở/đóng (v-model) |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |
| `position` | `'bottom' \| 'top' \| 'bottom-start' \| 'bottom-end' \| 'top-start' \| 'top-end'` | `'bottom-start'` | Vị trí dropdown |
| `priority` | `boolean` | `false` | Không đóng khi click outside |
| `titleWidth` | `string` | `'fit-content'` | Chiều rộng trigger |
| `bodyWidth` | `string` | `'fit-content'` | Chiều rộng content (`'auto'` = match trigger) |
| `bodyHeight` | `string` | `'fit-content'` | Chiều cao content |
| `title` | `string` | `'Chọn'` | Default trigger text |
| `icon` | `string` | `''` | Icon cho default trigger |
| `noPadding` | `boolean` | `false` | Bỏ padding content |
| `contentClass` | `string` | `''` | Custom class cho content |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `open` | - | Khi dropdown mở |
| `close` | - | Khi dropdown đóng |

#### Slots

| Slot | Description |
|------|-------------|
| `trigger` | Custom trigger element |
| `default` | Dropdown content (DropdownItems) |

### DropdownItem

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `any` | `'Chọn'` | Display text |
| `icon` | `string` | `''` | Icon name |
| `state` | `'default' \| 'selected' \| 'disabled'` | `'default'` | Trạng thái |
| `tooltip` | `string` | `''` | Tooltip text |
| `colorIcon` | `string` | `'currentColor'` | Màu icon |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `click` | `MouseEvent` | Khi click item |

### DropdownTitle

Default trigger component cho Dropdown.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `any` | `'Chọn'` | Text hiển thị |
| `icon` | `string` | `''` | Icon name |
| `open` | `boolean` | `false` | Trạng thái mở (để xoay arrow) |

### Usage

```vue
<!-- Basic dropdown -->
<Dropdown v-model="isOpen">
  <template #trigger>
    <DropdownTitle title="Chọn tùy chọn" icon="settings" :open="isOpen" />
  </template>
  <DropdownItem value="Option 1" @click="handleSelect('opt1')" />
  <DropdownItem value="Option 2" state="selected" />
  <DropdownItem value="Option 3" state="disabled" />
</Dropdown>

<!-- Custom trigger -->
<Dropdown v-model="customOpen">
  <template #trigger>
    <button class="px-4 py-2 bg-blue-500 text-white rounded">
      Custom Trigger
    </button>
  </template>
  <DropdownItem icon="user" value="Profile" />
  <DropdownItem icon="settings" value="Settings" />
  <DropdownItem icon="logout" value="Logout" />
</Dropdown>

<!-- Fixed size dropdown -->
<Dropdown bodyWidth="300px" bodyHeight="200px" position="bottom-end">
  ...
</Dropdown>
```

---

## Icon

**Import:** `import { Icon } from '@/components/custom/icon'`

SVG icon component sử dụng sprite.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | **required** | Tên icon |
| `size` | `number \| string` | `24` | Kích thước (px hoặc css unit) |
| `color` | `string` | `'currentColor'` | Màu icon |
| `hoverColor` | `string` | `''` | Màu khi hover |
| `className` | `string` | `''` | Custom classes |

### Usage

```vue
<!-- Basic -->
<Icon name="search" />
<Icon name="add" :size="20" />

<!-- With color -->
<Icon name="file-add" color="#0069fe" />
<Icon name="bug-01" color="var(--danger-600)" />

<!-- With hover effect -->
<Icon name="settings" color="#1a2229" hover-color="#0069fe" />

<!-- Inherit parent color -->
<span class="text-blue-500">
  <Icon name="checkmark-square-02" />
</span>

<!-- With Tailwind classes -->
<Icon name="arrow-down-01-sharp" class="animate-bounce" />
```

### Available Icons

Xem danh sách đầy đủ trong sprite SVG hoặc file `iconConfig.ts`.

---

## Input

**Import:** `import { Input } from '@/components/custom/input'`

Input component đa năng hỗ trợ nhiều loại.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string \| number` | - | Giá trị (v-model) |
| `type` | `string` | `'text'` | Loại input: `'text'`, `'email'`, `'password'`, `'number'`, `'currency'` |
| `placeholder` | `string` | `'Nhập thông tin'` | Placeholder |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |
| `readonly` | `boolean` | `false` | Chỉ đọc |
| `error` | `boolean` | `false` | Hiển thị error state |
| `errorMessage` | `string` | - | Thông báo lỗi |
| `message` | `string` | - | Helper text |
| `currency` | `string` | `'VND'` | Đơn vị tiền tệ (type=currency) |
| `locale` | `string` | `'vi-VN'` | Locale format (type=currency) |
| `suffix` | `string` | - | Hậu tố (tuổi, cm, kg, %) |
| `icon` | `string` | - | Icon prefix |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string \| number` | Two-way binding |
| `focus` | `FocusEvent` | Khi focus |
| `blur` | `FocusEvent` | Khi blur |

### Usage

```vue
<!-- Basic text -->
<Input v-model="name" placeholder="Nhập họ tên" />

<!-- Email -->
<Input v-model="email" type="email" placeholder="email@example.com" />

<!-- Password (auto toggle visibility) -->
<Input v-model="password" type="password" placeholder="Mật khẩu" />

<!-- Number -->
<Input v-model="age" type="number" placeholder="Tuổi" />

<!-- Currency (auto format) -->
<Input v-model="amount" type="currency" currency="VND" placeholder="0" />
<Input v-model="usdAmount" type="currency" currency="USD" locale="en-US" />

<!-- With suffix -->
<Input v-model="height" type="number" suffix="cm" placeholder="0" />
<Input v-model="weight" type="number" suffix="kg" placeholder="0" />

<!-- With error -->
<Input
  v-model="email"
  :error="!isValidEmail"
  errorMessage="Email không đúng định dạng"
/>

<!-- With helper message -->
<Input v-model="address" message="Nhập địa chỉ đầy đủ" />

<!-- Disabled/Readonly -->
<Input v-model="value" :disabled="true" />
<Input v-model="value" :readonly="true" />

<!-- With prefix icon -->
<Input v-model="search" icon="search" placeholder="Tìm kiếm..." />
```

---

## Loading

**Import:**
```js
import { LoadDefault, LoadPage } from '@/components/custom/loading'
```

### LoadDefault

Spinner loading đơn giản cho các component nhỏ.

```vue
<LoadDefault />
```

### LoadPage

Loading với text animation "LOADING" cho loading toàn trang. **Cần background màu/gradient để hiển thị rõ.**

```vue
<div class="bg-gradient-to-br from-indigo-500 to-purple-500 h-screen flex items-center justify-center">
  <LoadPage />
</div>
```

---

## Paging

**Import:** `import { Paging } from '@/components/custom/paging'`

Component pagination sử dụng shadcn Pagination.

```vue
<Paging />
```

---

## Popup

**Import:** `import { Popup } from '@/components/custom/popup'`

Modal/Dialog component.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | **required** | Trạng thái hiển thị (v-model) |
| `title` | `string` | `''` | Tiêu đề popup |
| `width` | `string` | `'max-content'` | Chiều rộng |
| `height` | `string` | `'max-content'` | Chiều cao |
| `closeOnClickOutside` | `boolean` | `true` | Đóng khi click outside |
| `isCustom` | `boolean` | `false` | Sử dụng full custom layout |
| `hasWrapper` | `boolean` | `false` | Có glass overlay wrapper |
| `rounded` | `string` | `'16px'` | Border radius |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `boolean` | Two-way binding |
| `close` | - | Khi popup đóng |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Main content |
| `header-icon` | Icon bên cạnh title |
| `header-title` | Thêm nội dung vào title |
| `footer` | Footer section |

### Usage

```vue
<Popup v-model="isOpen" title="Tiêu đề popup" width="500px">
  <p>Nội dung popup</p>

  <template #footer>
    <Button variant="secondary" @click="isOpen = false">Hủy</Button>
    <Button @click="handleSave">Lưu</Button>
  </template>
</Popup>

<!-- Full custom layout -->
<Popup v-model="customPopup" :isCustom="true" width="600px">
  <div class="custom-layout">
    <!-- Full control over content -->
  </div>
</Popup>

<!-- With glass wrapper effect -->
<Popup v-model="glassPopup" :hasWrapper="true" width="400px" title="Glass Effect">
  <p>Content with glass background</p>
</Popup>
```

---

## Search

**Import:** `import { Search } from '@/components/custom/search'`

Search input với debounce.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Giá trị search (v-model) |
| `placeholder` | `string` | `'Tìm kiếm'` | Placeholder |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |
| `readonly` | `boolean` | `false` | Chỉ đọc |
| `debounce` | `number` | `300` | Debounce delay (ms) |
| `type` | `string` | `'text'` | Input type |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string` | Two-way binding |
| `search` | `string` | Emit sau khi debounce |
| `focus` | `FocusEvent` | Khi focus |
| `blur` | `FocusEvent` | Khi blur |
| `enter` | `string` | Khi nhấn Enter |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focus input |
| `blur()` | Blur input |

### Usage

```vue
<!-- Basic search -->
<Search v-model="query" @search="handleSearch" />

<!-- Instant search (no debounce) -->
<Search v-model="instantQuery" :debounce="0" @search="handleInstant" />

<!-- With Enter key handling -->
<Search
  v-model="searchTerm"
  placeholder="Nhấn Enter để tìm kiếm"
  @enter="submitSearch"
/>

<!-- Using ref methods -->
<Search ref="searchRef" v-model="query" />
<Button @click="searchRef.focus()">Focus</Button>
```

---

## Switch

**Import:** `import { Switch } from '@/components/custom/switch'`

Toggle switch component dựa trên reka-ui SwitchRoot.

### Props

Kế thừa từ reka-ui `SwitchRootProps`:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | - | Trạng thái (v-model) |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |
| `class` | `string` | - | Custom classes |

### Slots

| Slot | Description |
|------|-------------|
| `thumb` | Custom thumb content |

### Usage

```vue
<Switch v-model="isEnabled" />
<Switch v-model="darkMode" :disabled="true" />
```

---

## Table

**Import:** `import { Table } from '@/components/custom/table'`

Data grid table với virtualization, column resize, freeze columns, sorting, etc.

### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | `any[]` | Dữ liệu bảng |
| `columns` | `Column[]` | Cấu hình cột |
| `showToolbar` | `boolean` | Hiển thị toolbar |
| `showCheckbox` | `boolean` | Hiển thị checkbox |
| `showPaging` | `boolean` | Hiển thị pagination |
| `loading` | `boolean` | Loading state |
| `isBorder` | `boolean` | Có border |
| `tools` | `string[]` | Các tools: 'refresh', 'custom-column', 'zoom', 'group' |

### Column Interface

```ts
interface Column {
  field: string
  name: string
  width: number
  frozen?: boolean
  position?: 'left' | 'center' | 'right'
}
```

### Usage

```vue
<Table
  :data="tableData"
  :columns="columns"
  :show-checkbox="true"
  :loading="isLoading"
  @row-select="handleSelect"
>
  <template #[column.field]="{ value, row }">
    <span>{{ value }}</span>
  </template>
</Table>
```

---

## AppTable

**Import:** `import { AppTable } from '@/components/custom/app-table'`

High-level table component với layout toggle (list/grid), pagination, search, filter.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `any[]` | `[]` | Dữ liệu |
| `columns` | `Column[]` | `[]` | Cấu hình cột |
| `keyField` | `string` | `'id'` | Key field |
| `tableName` | `string` | `'app-table'` | Table name |
| `showLayoutToggle` | `boolean` | `false` | Hiển thị toggle list/grid |
| `defaultLayout` | `'list' \| 'grid'` | `'grid'` | Layout mặc định |
| `gridCols` | `number \| object` | `{sm:2, md:2, lg:3, xl:4}` | Grid columns responsive |
| `showPagination` | `boolean` | `true` | Hiển thị pagination |
| `total` | `number` | `0` | Tổng số items |
| `itemsPerPage` | `number` | `20` | Items per page |
| `currentPage` | `number` | `1` | Current page |
| `itemLabel` | `string` | `'tài khoản'` | Label cho item |
| `showCheckbox` | `boolean` | `false` | Hiển thị checkbox |
| `loading` | `boolean` | `false` | Loading state |
| `emptyImage` | `string` | - | Empty state image |
| `emptyTitle` | `string` | `'Không có dữ liệu'` | Empty state title |
| `filterCategories` | `FilterCategory[]` | `[]` | Filter categories |
| `filterSelected` | `Record<string, string[]>` | `{}` | Selected filters |
| `tools_use` | `string[]` | `[]` | Tools: 'filter', 'export', 'search' |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change-layout` | `'list' \| 'grid'` | Khi đổi layout |
| `change-page` | `number` | Khi đổi trang |
| `change-items-per-page` | `number` | Khi đổi số items/page |
| `row-select` | `RowSelectEvent` | Khi select row |
| `row-select-all` | `RowSelectAllEvent` | Khi select all |
| `search` | `string` | Khi search |
| `refresh` | - | Khi refresh |
| `filter-change` | `Record<string, string[]>` | Khi filter thay đổi |
| `filter-clear` | - | Khi clear filter |

### Slots

| Slot | Description |
|------|-------------|
| `header-left` | Left side of header (tabs) |
| `actions-right` | Right side actions |
| `platform-tabs` | Platform tabs row |
| `grid-item` | Custom grid item render |
| `col-{field}` | Custom column render |

### Usage

```vue
<AppTable
  :data="users"
  :columns="columns"
  :total="totalUsers"
  :current-page="page"
  :show-layout-toggle="true"
  :tools_use="['search', 'filter']"
  @search="handleSearch"
  @change-page="handlePageChange"
>
  <template #grid-item="{ item }">
    <UserCard :user="item" />
  </template>

  <template #col-name="{ value, row }">
    <span class="font-bold">{{ value }}</span>
  </template>
</AppTable>
```

---

## LayoutTable

**Import:** `import { LayoutTable } from '@/components/custom/table'`

Table layout với tabs header.

### Props

| Prop | Type | Description |
|------|------|-------------|
| `tabs` | `Tab[]` | Danh sách tabs |
| `tabSelected` | `string` | Tab đang chọn |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change-tab` | `string` | Khi đổi tab |

### Slots

| Slot | Description |
|------|-------------|
| `left` | Left header content |
| `right` | Right header content |
| `default` | Table body content |

---

## Tabs

**Import:** `import { Tabs } from '@/components/custom/tabs'`

Tab navigation với animation.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | Tab đang chọn (v-model) |
| `tabs` | `Tab[]` | `[]` | Danh sách tabs |

### Tab Interface

```ts
interface Tab {
  key: string
  title: string
  icon?: string
}
```

### Usage

```vue
<Tabs v-model="activeTab" :tabs="tabs" />

<script setup>
const activeTab = ref('tab1')
const tabs = [
  { key: 'tab1', title: 'Tab 1' },
  { key: 'tab2', title: 'Tab 2', icon: 'settings' },
  { key: 'tab3', title: 'Tab 3', icon: 'user' }
]
</script>
```

---

## TagInput

**Import:** `import { TagInput } from '@/components/custom/tag-input'`

Input cho multiple tags với validation.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string[]` | `[]` | Danh sách tags (v-model) |
| `placeholder` | `string` | `'Nhập và nhấn Enter...'` | Placeholder |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |
| `error` | `boolean` | `false` | Error state |
| `errorMessage` | `string` | - | Error message |
| `addOnPaste` | `boolean` | `true` | Auto add tags khi paste |
| `delimiter` | `RegExp \| string` | `/[,\s\n\t]+/` | Delimiter cho paste |
| `showAvatar` | `boolean` | `true` | Hiển thị avatar placeholder |
| `validate` | `(value: string) => boolean` | - | Validation function |
| `checkDuplicate` | `(value: string) => boolean` | - | Custom duplicate checker |

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `string[]` | Two-way binding |
| `add` | `string` | Khi thêm tag |
| `remove` | `string` | Khi xóa tag |
| `invalid` | `string` | Khi validation fail |
| `duplicate` | `string` | Khi phát hiện duplicate |

### Exposed Methods

| Method | Description |
|--------|-------------|
| `focus()` | Focus input |
| `clear()` | Clear all tags |

### Usage

```vue
<TagInput
  v-model="emails"
  placeholder="Nhập email..."
  :validate="validateEmail"
  @invalid="showError('Email không hợp lệ')"
  @duplicate="showError('Email đã tồn tại')"
/>

<script setup>
const emails = ref(['user1@example.com'])

const validateEmail = (value: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
</script>
```

---

## Toast

**Import:**
```js
import { Toast, toast } from '@/components/custom/toast'
```

Toast notification system sử dụng vue-sonner.

### Toast Component

Đặt một lần ở App.vue:

```vue
<template>
  <Toast />
  <RouterView />
</template>
```

### toast() Function

```js
// Success
toast.success('Thành công', { description: 'Đã lưu dữ liệu' })

// Error
toast.error('Lỗi', { description: 'Không thể kết nối server' })

// Warning
toast.warning('Cảnh báo', { description: 'Dữ liệu sẽ bị xóa' })

// Info
toast.info('Thông báo', { description: 'Có cập nhật mới' })

// With action button
toast.success('Đã xóa', {
  description: 'Item đã được xóa',
  action: {
    label: 'Hoàn tác',
    onClick: () => handleUndo()
  }
})
```

---

## Tooltip

**Import:** `import { Tooltip } from '@/components/custom/tooltip'`

Tooltip wrapper đơn giản.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | `''` | Nội dung tooltip |
| `class` | `string` | `''` | Custom class cho trigger |

### Slots

| Slot | Description |
|------|-------------|
| `default` | Trigger element |
| `content` | Custom tooltip content |

### Usage

```vue
<Tooltip content="Đây là tooltip">
  <Button>Hover me</Button>
</Tooltip>

<!-- Custom content -->
<Tooltip>
  <Button>Custom</Button>
  <template #content>
    <div class="custom-tooltip">
      <strong>Title</strong>
      <p>Description</p>
    </div>
  </template>
</Tooltip>
```

---

## DatePicker

**Import:**
```js
import { DatePicker, CalendarGrid } from '@/components/custom/datepicker'
```

Date range picker với presets.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `DateRange` | `{ start: null, end: null }` | Giá trị (v-model) |
| `position` | `Position` | `'bottom-start'` | Vị trí dropdown |
| `disabled` | `boolean` | `false` | Vô hiệu hóa |

### DateRange Interface

```ts
interface DateRange {
  start: Date | null
  end: Date | null
}
```

### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `update:modelValue` | `DateRange` | Two-way binding |
| `cancel` | - | Khi cancel |
| `confirm` | `DateRange` | Khi confirm |

### Slots

| Slot | Props | Description |
|------|-------|-------------|
| `trigger` | `{ startDate, endDate, displayText }` | Custom trigger |

### Built-in Presets

- Tất cả thời gian
- Hôm nay
- Hôm qua
- 7 ngày qua
- 30 ngày qua
- Tuần này
- Tuần trước
- Tháng này
- Tháng trước

### Usage

```vue
<DatePicker v-model="dateRange" @confirm="handleDateConfirm">
  <template #trigger="{ displayText }">
    <Button variant="secondary" icon="calendar-03">
      {{ displayText }}
    </Button>
  </template>
</DatePicker>
```

---

## FilterPanel & FilterTags

**Import:**
```js
import { FilterPanel, FilterTags, type FilterCategory } from '@/components/custom/filter'
```

### FilterPanel

Panel lọc với categories và options.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `categories` | `FilterCategory[]` | `[]` | Danh sách categories |
| `selected` | `Record<string, string[]>` | `{}` | Giá trị đã chọn |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `change` | `Record<string, string[]>` | Khi filter thay đổi |
| `clear` | - | Khi clear all |

### FilterTags

Hiển thị các filter đã chọn dạng tags.

#### Props

| Prop | Type | Description |
|------|------|-------------|
| `categories` | `FilterCategory[]` | Danh sách categories |
| `selected` | `Record<string, string[]>` | Giá trị đã chọn |

#### Events

| Event | Payload | Description |
|-------|---------|-------------|
| `remove` | `(categoryKey, value)` | Khi xóa tag |
| `clear-all` | - | Khi clear all |

### Interfaces

```ts
interface FilterOption {
  value: string
  label: string
}

interface FilterGroup {
  key: string
  label: string
  options: FilterOption[]
}

interface FilterCategory {
  key: string
  label: string
  icon: string
  groups: FilterGroup[]
}
```

### Usage

```vue
<FilterPanel
  :categories="filterCategories"
  :selected="selectedFilters"
  @change="handleFilterChange"
  @clear="handleFilterClear"
/>

<FilterTags
  :categories="filterCategories"
  :selected="selectedFilters"
  @remove="handleTagRemove"
  @clear-all="handleClearAll"
/>

<script setup>
const filterCategories: FilterCategory[] = [
  {
    key: 'status',
    label: 'Trạng thái',
    icon: 'status',
    groups: [
      {
        key: 'account',
        label: 'Tài khoản',
        options: [
          { value: 'active', label: 'Hoạt động' },
          { value: 'inactive', label: 'Ngừng hoạt động' }
        ]
      }
    ]
  }
]

const selectedFilters = ref<Record<string, string[]>>({})
</script>
```

---

## ThemeToggle

**Import:** `import { ThemeToggle } from '@/components/custom/theme-toggle'`

Toggle switch giữa light/dark mode.

### Usage

```vue
<ThemeToggle />
```

Sử dụng composable `useTheme()` để quản lý theme state.

---

## Display (Shared)

**Import:** `import Display from '@/components/shared/Display.vue'`

Utility component để delay unmount content.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | **required** | Trạng thái hiển thị |

### Usage

```vue
<Display :open="isOpen">
  <SomeContent />
</Display>
```

Content sẽ delay 300ms trước khi unmount để cho phép animation exit.

---

## SelectAssets (Shared)

**Import:** `import SelectAssets from '@/components/shared/SelectAssets.vue'`

Drawer cho phép chọn assets từ danh sách.

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `boolean` | - | Trạng thái hiển thị (v-model) |

### Usage

```vue
<Button @click="showSelectAssets = true">Chọn tài khoản</Button>
<SelectAssets v-model="showSelectAssets" />
```

---

## Best Practices

### 1. Import Components

```js
// Từ custom components
import { Button, Icon, Input } from '@/components/custom/button'
import { Dropdown, DropdownItem, DropdownTitle } from '@/components/custom/dropdown'

// Từ shared components
import Display from '@/components/shared/Display.vue'
```

### 2. Sử dụng v-model

Tất cả components hỗ trợ v-model đều implement chuẩn Vue 3:

```vue
<Input v-model="value" />
<Checkbox v-model="checked" />
<Drawer v-model="isOpen" />
```

### 3. Loading States

```vue
<Button :loading="isSubmitting">Submit</Button>
<Table :loading="isLoading" :data="data" />
```

### 4. Error Handling

```vue
<Input
  v-model="email"
  :error="!isValid"
  errorMessage="Email không hợp lệ"
/>
```

### 5. Slots Pattern

```vue
<Dropdown>
  <template #trigger>...</template>
  <DropdownItem />
</Dropdown>

<Drawer>
  <template #header>...</template>
  <template #content>...</template>
  <template #footer>...</template>
</Drawer>
```

---

## Notes

- Tất cả components sử dụng Tailwind CSS và CSS variables từ design system
- Icons sử dụng SVG sprite system
- Components được thiết kế để hoạt động cùng nhau (composable)
- Hỗ trợ dark mode thông qua CSS variables
