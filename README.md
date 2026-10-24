# Bác Trà Ký – GitHub Pages Version 2

## Điểm mới trong bản này

- Sửa lại phần **logo / slogan** để hiển thị sạch hơn.
- Thêm **tuyến kể chuyện Giang Xá xưa** theo dạng story game nhẹ.
- Thêm **mini game làm Bánh Bác** gồm 3 chặng:
  1. Chọn nguyên liệu
  2. Sắp xếp công đoạn
  3. Hoàn thiện phần trình bày
- Giữ sẵn khu **ảnh & video** để bạn gắn YouTube hoặc MP4.

## Cách upload lên GitHub Pages

1. Giải nén file ZIP.
2. Upload toàn bộ file lên repository GitHub.
3. Đảm bảo `index.html` nằm ở thư mục gốc.
4. Vào **Settings → Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main**
   - Folder: **/(root)**

## Chỉnh nhanh cấu hình

Mở `index.html`, tìm đoạn:

```js
const SITE_CONFIG = {
  beaconsUrl: "",
  videoEmbed: "",
  videoSrc: "",
  videoPoster: "assets/brand-scene.png"
};
```

### Link Beacons
```js
beaconsUrl: "https://beacons.ai/your-link"
```

### Video YouTube embed
```js
videoEmbed: "https://www.youtube.com/embed/VIDEO_ID"
```

### Hoặc video MP4 tự host
```js
videoSrc: "assets/ten-video.mp4"
```

## Tài nguyên ảnh hiện có

- `assets/official-logo.png` – logo FPT + Bác Trà Ký nền trắng
- `assets/brand-scene.png` – visual phong cách BTK
- `assets/products.png` – ảnh sản phẩm tổng quan
- `assets/box-dau-xanh.png` – hộp Bánh Bác đậu xanh

## Lưu ý nội dung

Tuyến “bánh dâng vua” nên tiếp tục được kể như:

- truyền thuyết
- câu chuyện được lưu truyền
- lời kể dân gian
- ký ức địa phương

tránh dùng như một khẳng định lịch sử tuyệt đối.
