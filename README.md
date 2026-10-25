# Bác Trà Ký — Mở Bánh • Mở Chuyện (V4.10)

Bản GitHub Pages hoàn chỉnh, **giữ giao diện tối và nền làng Giang Xá của V4**. Cập nhật lớn nhất là màn chọn nguyên liệu trong game Bánh Bác.

## Có gì mới ở V4.10?

- **Mâm tre trực quan thay giỏ cũ**: không còn lưới giỏ chật trong cột bên phải.
- **Bàn nguyên liệu toàn màn**: 10 bát nguyên liệu minh họa được bày trực tiếp quanh bàn gỗ, chọn đúng 6 thứ. Thứ tự vị trí ngẫu nhiên khi bắt đầu lại.
- **Kéo thả hình bát** bằng chuột hoặc ngón tay. Hình đi theo con trỏ/ngón tay; thả vào mâm để chọn. Chạm vào bát trên mâm để lấy ra thay. Trên thiết bị hỗ trợ, có thể nhấn/chạm bát để tự đặt vào mâm.
- **Mâm hiện sáu bát theo hàng 3×2**, co giãn đúng ở desktop, 390px và 320px. Bỏ hoàn toàn CSS giỏ 6 ô trước đó khỏi màn chọn.
- **Hiệu ứng và âm thanh** khi nhặt/thả, bát trên mâm hiện dần và mâm sáng nhẹ khi đầy.
- **Giữ chặng canh lửa kiểu timing**, xếp lớp, vuốt cuộn và dâng vua. Đúng nguyên liệu + làm đúng kỹ thuật → WIN; sai nguyên liệu/khâu khác → LOSE cùng lý do.
- **Giữ nguyên game lịch sử Giang Xá**, bao gồm hidden-object và màn mở đường hành quân của V4.7.

## Cách đăng lên GitHub Pages

1. Giải nén file ZIP.
2. Vào repository hiện đang chạy GitHub Pages của nhóm.
3. Tải **toàn bộ nội dung bên trong ZIP**, gồm `index.html`, `game.js`, `styles.css`, `cake-market.css`, `march.js`, `march.css`, thư mục `assets/`, `.nojekyll`, các file README/SOURCES, lên ngay **thư mục gốc (root)**.
4. Nếu có file trùng, dùng bản V4.10 để thay thế.
5. Trong Settings → Pages, nguồn xuất bản giữ `main` + `/(root)`.
6. Sau khi GitHub hoàn tất deploy, mở tab ẩn danh hoặc tải lại bằng `Ctrl + Shift + R`.

**Không cần tạo lại QR** nếu giữ URL GitHub Pages cũ.

## Link Beacons

Trong `game.js`, sửa:

```js
const SETTINGS={beaconsUrl:''};
```

thành:

```js
const SETTINGS={beaconsUrl:'https://beacons.ai/ten-cua-nhom'};
```

(Nếu chưa có link chính thức, có thể để trống.)

## Kiểm thử

Đọc `QA-V4-10.md` để xem các luồng đã thử, các giới hạn còn cần test trên điện thoại thật.

## Ranh giới lịch sử

Truyền thuyết Bánh Bác dâng vua Lý Nam Đế được sử dụng làm chất liệu hư cấu trò chơi. **Không khẳng định vua thật sự nếm và chấm bánh.** Tư liệu xem `SOURCES.md`.
