# Bác Trà Ký – Microsite GitHub Pages

Bản này là phiên bản triển khai phong cách **Mở Bánh – Mở Chuyện**, có:

- Trang mở đầu với bối cảnh Giang Xá xưa
- Hai nhánh chính:
  - Giang Xá xưa
  - Truyền thuyết bánh dâng vua
- Hiệu ứng **mở sớ / cuộn thư** bằng popup animation
- Khu **Khám phá Bánh Bác**
- Khu **Ảnh & video**
- CTA quay về Beacons

## Cách dùng nhanh

1. Upload toàn bộ thư mục này lên GitHub repository.
2. Đảm bảo `index.html` nằm ở thư mục gốc.
3. Bật **GitHub Pages** ở nhánh `main` và thư mục `/(root)`.
4. Mở `index.html` và sửa phần `SITE_CONFIG` ở cuối file:

```js
const SITE_CONFIG = {
  beaconsUrl: "https://beacons.ai/...",
  videoEmbed: "",
  videoSrc: "",
  videoPoster: "assets/brand-scene.png"
};
```

## Gợi ý thêm video

### Cách 1 – YouTube embed
Dán link dạng:

```js
videoEmbed: "https://www.youtube.com/embed/VIDEO_ID"
```

### Cách 2 – File MP4
Chép file video vào thư mục `assets/` rồi sửa:

```js
videoSrc: "assets/ten-video.mp4"
```

## Tài nguyên ảnh hiện có

- `assets/brand-scene.png` – mỹ thuật thương hiệu / logo / Giang Xá
- `assets/banh-bac-products.png` – ảnh sản phẩm Bánh Bác
- `assets/banh-bac-box.png` – ảnh close-up hộp bánh
- `assets/btk-logo-small.png` – logo nhỏ

## Lưu ý nội dung

Tuyến “bánh dâng vua” nên được diễn đạt như:

- truyền thuyết
- câu chuyện được lưu truyền
- ký ức địa phương

Không nên viết như một sự kiện lịch sử đã được xác nhận tuyệt đối.
