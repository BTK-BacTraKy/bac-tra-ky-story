# Bác Trà Ký — Mở Bánh · Mở Chuyện — Game V5 (Big Update)

Website tĩnh tương tác dùng cho hành trình QR của Bác Trà Ký. Mục tiêu của bản V5 là **giảm cảm giác “thô”**, nâng trải nghiệm thành một microsite kể chuyện – chơi game có bản sắc hơn, đồng thời giữ ranh giới rõ giữa **sử liệu / truyền thuyết / phần sáng tạo gameplay**.

## Big update ở V5

### 1) Nâng cấp giao diện tổng thể
- Làm lại **hero/home** theo hướng storybook: màu giấy – mực – son đỏ nhất quán hơn với chất liệu thương hiệu.
- Header sạch hơn, bố cục bớt rối, có nav rõ ràng: Trang chủ / Giang Xá xưa / Game làm bánh / Tư liệu.
- Thêm các thẻ giới thiệu, khối thông tin và cách trình bày giúp trang nhìn giống **sản phẩm hoàn chỉnh** hơn demo.
- Tinh chỉnh lại nhiều panel, nút, khung, bóng đổ, khoảng trắng, bo góc và phân cấp chữ.

### 2) Nâng cấp cảm giác “game”
- Thêm **màn chuyển cảnh** (transition curtain) giữa các chặng để trải nghiệm liền mạch hơn.
- Chỉnh lại phần giới thiệu của hai hành trình để nhấn mạnh đây là **giải đố + thao tác**, không phải trắc nghiệm.
- Cập nhật trạng thái tiến độ game bánh theo logic dễ hiểu hơn.

### 3) Vẫn giữ gameplay cốt lõi đã tốt ở V4
#### Hành trình I — Theo bước Lý Nam Đế
- Tìm vật phẩm trong tranh.
- Mở ấn ký bằng thứ tự đúng.
- Ghép/trượt tranh 3×3.
- Xoay đường để nối lối đi.
- Mở cuộn sớ về Vạn Xuân năm 544.

#### Hành trình II — Tự tay làm Bánh Bác
- Kéo **hình** nguyên liệu vào giỏ (chuột / chạm ngón tay).
- Giữ nhiệt để “bác” bột.
- Xếp đúng các lớp bánh.
- Vuốt để cuộn bánh.
- Mang bánh lên ngự án để vua nếm và nhận phán quyết thắng / thua.

## Những lỗi / điểm yếu đã được xử lý trong V5

1. **Progress của game bánh chưa rõ** → đã sửa cách hiển thị chặng.
2. **Điều hướng ở đầu trang chưa đúng trải nghiệm** → nav giờ có logic rõ hơn.
3. **Thiếu cảm giác chuyển cảnh** → thêm overlay chuyển chương.
4. **Trang nhìn còn “poster ghép”** → tinh chỉnh lại hệ card, phân cấp chữ, layout và nền.
5. **Nguồn phần Giang Xá còn hơi mỏng ở phần giới thiệu** → bổ sung thêm nguồn về lễ hội Giang Xá cấp huyện trong `SOURCES.md`.

## Cấu trúc thư mục khi upload GitHub Pages

Sau khi giải nén, upload **toàn bộ nội dung bên trong** thư mục này lên **thư mục gốc** repository:

```text
index.html
styles.css
game.js
.nojekyll
README.md
SOURCES.md
assets/
```

## Đăng lên GitHub Pages

1. Giải nén file ZIP.
2. Chọn toàn bộ nội dung bên trong thư mục đã giải nén.
3. Upload lên **root** của repository GitHub Pages đang dùng.
4. Vào **Settings → Pages**.
5. Chọn **Deploy from a branch** → `main` → `/(root)`.
6. Sau khi deploy xong, mở bằng tab ẩn danh hoặc `Ctrl + F5` để tránh cache CSS/JS cũ.

## Thay liên kết Beacons (nếu cần)

Trong `game.js`, tìm:

```js
const SETTINGS={beaconsUrl:''};
```

Điền link thật của nhóm:

```js
const SETTINGS={beaconsUrl:'https://beacons.ai/ten-trang-cua-nhom'};
```

## Lưu ý lịch sử

- **Có nguồn**: khởi nghĩa năm 542, dựng nước Vạn Xuân năm 544, tư liệu văn hóa – lễ hội – di tích Giang Xá, bài báo về Bánh Bác.
- **Truyền thuyết / ký ức địa phương**: câu chuyện Bánh Bác dâng vua, một số chi tiết gắn với Giang Xá và tuổi trẻ Lý Bí.
- **Hư cấu gameplay**: tín vật, mật thư, lời thoại, mini-game, ngự điện, cảnh vua trực tiếp nếm bánh của người chơi.

Chi tiết nguồn nằm trong `SOURCES.md`.
