# BÁC TRÀ KÝ — V4.5 STABLE

Đây là bản **phục hồi nền và mỹ thuật V4**, không sử dụng thiết kế sáng màu của V5. Mục đích của bản này là trở về phiên bản người dùng thích và sửa lỗi có chọn lọc.

## Giữ nguyên từ V4

- Nền toàn màn hình làng Giang Xá xưa (`assets/village.webp`), tông màu nâu trầm và chữ vàng ngà.
- Hai lựa chọn: **Theo bước Lý Nam Đế** và **Tự tay làm Bánh Bác**.
- Game lịch sử: nhặt tín vật, ấn ký, trượt tranh 3×3, xoay đường 3×3 và mở sớ Vạn Xuân.
- Game bánh: kéo hình nguyên liệu vào giỏ, giữ nhiệt, xếp lớp, cuộn bánh, dâng lên vua để thắng/thua.
- Logo bảng trắng đúng file cũ (`assets/official-logo.png`).

## Các điểm sửa có chọn lọc

1. Sửa đếm chặng game bánh từ **1/4 → 1/5**, khớp 5 chặng thật.
2. Không làm mất vị trí lời thoại Lý Bí mỗi khi nhặt tín vật trong tranh.
3. Thêm phần tử liên kết **Beacons** vào header, mặc định ẩn nếu chưa cấu hình; không làm lỗi khi có link.
4. Chỉ bổ sung CSS nhỏ cho ẩn/hiện link, thao tác chạm và thứ tự hiển thị; **không ghi đè nền, màu hoặc layout của V4 bằng CSS V5**.
5. Tăng phiên bản CSS/JS thành `v=4.5.1` để giảm trường hợp trình duyệt giữ mã cũ.

## Kiểm thử tự động trong trình duyệt Chromium

- Vào game lịch sử, nhặt đủ 3 tín vật, nhập ấn ký, chuyển từ chương 1 sang 2.
- Mở/đóng sổ tư liệu, xác nhận có liên kết nguồn.
- Đưa một màn ghép hình gần hoàn thành về đúng trạng thái, kiểm tra chuyển sang chương tiếp theo.
- Hoàn thành cơ chế nối đường, kiểm tra tới chương 4.
- Kéo ảnh nguyên liệu bằng chuột vào giỏ: vật phẩm đi theo con trỏ và giỏ nhận đúng 1 vật phẩm.
- Đưa đúng nguyên liệu, hoàn thành quy trình thử nghiệm và dâng bánh: **WIN**.
- Thay một nguyên liệu bằng phô mai rồi dâng bánh: **LOSE**, có giải thích nguyên liệu sai.
- Sau khi kết thúc, bấm thử lại: game trở về 0/6 nguyên liệu.
- Mô phỏng viewport 390 px cho trang chủ và game bánh: không có tràn ngang.
- Các kịch bản trên không xuất hiện lỗi JavaScript (`pageerror`).

**Giới hạn kiểm thử:** Trình duyệt được kiểm tra bằng bản dựng HTML/CSS/JS nội tuyến trong Chromium do môi trường kiểm thử không cho mở URL cục bộ. Kéo-thả trên điện thoại vật lý và toàn bộ hành trình giữ nhiệt theo thời gian thực vẫn cần nhóm kiểm tra trước khi công khai.

## Đăng lên GitHub Pages (đúng thư mục ROOT)

Giải nén `BTK-V4-5-STABLE-GitHub-ROOT.zip` rồi upload **các file bên trong** (không upload nguyên ZIP, không đặt thêm một thư mục bọc ngoài) vào repository đang dùng:

```
index.html
styles.css
game.js
.nojekyll
README.md
SOURCES.md
QA-CHECKLIST.md
assets/
```

Trong GitHub: **Settings → Pages → Deploy from a branch → main → /(root)**. Sau khi **Actions** báo thành công, kiểm tra bằng tab ẩn danh hoặc `Ctrl + F5`.

## Kết nối Beacons

Trong `game.js` ở đầu file:

```js
const SETTINGS={beaconsUrl:''};
```

Đổi sang link Beacons **thật** của BTK, ví dụ theo cấu trúc:

```js
const SETTINGS={beaconsUrl:'https://beacons.ai/ten-trang-thuc-te'};
```

Khi cấu hình đúng URL bắt đầu bằng `https://`, header sẽ hiển thị nút mở Beacons.

## Giới hạn lịch sử

Sự kiện 542 và 544 có tư liệu; chuyện Bánh Bác dâng vua và một số tình tiết Giang Xá là truyền tụng địa phương. Cảnh vua nếm/chấm bánh, vật phẩm, mật thư, lời thoại và giải đố là hư cấu cho game. Xem `SOURCES.md`.
