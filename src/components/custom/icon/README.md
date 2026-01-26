# Icon Component

Component hiển thị icon từ sprite SVG.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `name` | `string` | required | Tên của icon trong sprite |
| `size` | `number \| string` | `24` | Kích thước icon (width và height) |
| `color` | `string` | `"currentColor"` | Màu của icon |
| `class` | `string` | `""` | CSS class bổ sung |

## Sử dụng

### Basic
```vue
<Icon name="arrow-down" />
```

### Custom size
```vue
<!-- Number (px) -->
<Icon name="search" :size="16" />

<!-- String -->
<Icon name="close" size="2rem" />
```

### Custom color
```vue
<Icon name="heart" color="#ff0000" />
<Icon name="star" color="rgb(255, 200, 0)" />
```

### With CSS class
```vue
<Icon 
  name="settings" 
  class="hover:text-blue-500 transition-colors cursor-pointer" 
/>
```

### Trong button
```vue
<button class="flex items-center gap-2">
  <Icon name="plus" :size="16" />
  <span>Thêm mới</span>
</button>
```

## Available Icons

Icons được generate từ file sprite tại `/src/assets/icons/sprites.svg`. Xem file `/src/assets/icons/types.ts` để biết danh sách icons có sẵn.

## Special Features

### Inline Rendering cho Gradient Icons

Component hỗ trợ inline rendering cho các icon có gradient hoặc defs phức tạp. Các icon này sẽ được render trực tiếp thay vì dùng `<use>` từ sprite để giữ nguyên các định nghĩa gradient.

```vue
<!-- Icon với gradient -->
<Icon name="book" :size="32" />

<!-- Custom color cho gradient icon -->
<Icon name="book" :size="32" color="#0069fe" />
```

Các icon hỗ trợ inline rendering:
- `book` - Icon với linear gradient
- `suitcase` - Icon với gradient phức tạp
- `megaphone-01` - Icon với nhiều defs
- Và các icon khác được config trong `iconConfig.js`

### Animation

```vue
<!-- Loading spinner -->
<Icon name="search" class="animate-spin" />

<!-- Bounce animation -->
<Icon name="arrow-down-01-sharp" class="animate-bounce" />

<!-- Pulse animation -->
<Icon name="heart" class="animate-pulse" />
```

## Implementation Details

Component sử dụng 2 phương thức render:

1. **Sprite rendering** (mặc định): Sử dụng `<use>` element để reference icon từ sprite SVG
2. **Inline rendering**: Render trực tiếp SVG content cho các icon có gradient/defs phức tạp

### File Structure

- `Icon.vue` - Component chính
- `iconConfig.js` - Config các icon cần inline rendering
- `iconUtils.js` - Utility functions để xử lý SVG content
- `useSprite.js` - Composable để load sprite SVG

## Notes

- Icon sử dụng `currentColor` mặc định, nên sẽ kế thừa màu text từ parent element
- Icon là inline-block element
- Có thể style bằng CSS class hoặc inline style
- Khi dùng custom color cho gradient icon, màu trắng (#fff, #ffffff, white) trong gradient sẽ được thay thế bằng màu custom
- Component tự động detect và xử lý các icon cần inline rendering