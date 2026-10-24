# Bác Trà Ký — Mở Bánh · Mở Chuyện — Game V4

Website tĩnh tương tác phục vụ khách hàng quét mã QR trên bao bì → Beacons → **thanh liên kết số 2**. Dùng HTML/CSS/JS, không cần backend hoặc tài khoản.

## Điểm mới của V4

**Mini-game làm Bánh Bác đã chuyển thành 5 phân đoạn có quyết định và thao tác vật lý:**

1. **Kéo HÌNH nguyên liệu vào giỏ** (không kéo chữ): 10 hình bát nguyên liệu khác nhau, 6 chỗ chứa. Dùng Pointer Events: chuột và ngón tay đều di chuyển hình theo con trỏ. Giỏ đặt phía trên và cố định khi cuộn để dễ thả. Có thể chạm món trong giỏ để lấy ra; chạm hình để chọn nếu khó kéo.
2. **Giữ lửa để “bác” bột:** điều khiển mức nhiệt và nhấn giữ. Nhiệt giảm theo thời gian; nhiệt sai làm giảm chất lượng bánh.
3. **Kéo các hình lớp bánh vào vị trí:** lớp đỏ gấc, lớp nếp trắng và nhân đậu xanh (theo thứ tự từ ngoài vào trong).
4. **Vuốt cuộn bánh:** vuốt từ trái sang phải ba lần, có kiểm tra độ dài, hướng và thời gian.
5. **Kéo hình bánh lên ngự án để dâng cho Lý Nam Đế (hoặc bấm nút hỗ trợ):** vua nhận bánh, “nếm” và đưa ra phán quyết **WIN** nếu các thao tác đúng, **LOSE** nếu chọn sai nguyên liệu, giữ nhiệt hỏng, xếp lớp sai hoặc cuộn quá vụng. Kết thúc có hoạt ảnh, tiếng chiêng hoặc âm thanh thất bại, lời nhận xét và lựa chọn chơi lại.

Có các tệp âm thanh `.wav` tổng hợp riêng, được bật qua nút **Âm** trên thanh đầu trang. Trò chơi sẽ không tự phát âm khi chưa có thao tác bật của người dùng.

**Tuyến lịch sử Giang Xá – Lý Nam Đế của V3** vẫn giữ nguyên: nhặt vật phẩm, giải ấn ký, trượt tranh 3×3, nối đường 3×3, mở sớ Vạn Xuân. Các cảnh câu đố và lời thoại là hư cấu, lấy cảm hứng từ lịch sử và văn hóa địa phương.

## Đăng lên GitHub Pages

1. **Giải nén** file ZIP trước.
2. Chọn **toàn bộ nội dung bên trong** thư mục đã giải nén để upload vào **thư mục gốc** của repository đang dùng. Không upload riêng ZIP hoặc đặt toàn bộ vào thư mục con `btk-v4-royal`.
3. Trong repository phải thấy các mục này ở cấp đầu tiên:

```text
index.html
styles.css
game.js
.nojekyll
README.md
SOURCES.md
assets/
  official-logo.png
  ingredients/ (10 ảnh PNG)
  layers/ (3 ảnh PNG)
  sfx/ (7 hiệu ứng âm thanh .wav)
  ... tranh game .webp
```

4. Settings → Pages → **Deploy from a branch**, `main`, `/(root)`.
5. Khi Actions triển khai thành công, mở trang bằng `Ctrl + F5` hoặc tab ẩn danh để tránh nạp CSS/JS cũ từ bộ nhớ cache.
6. Thử **trên điện thoại thật**: vào Beacons bằng mã QR, nhấn thanh số 2 rồi kéo ảnh nguyên liệu vào giỏ; bật âm; thử cả một lần chọn sai để thấy nhánh LOSE.

## Thay liên kết Beacons

Mở `game.js`, tìm:

```js
const SETTINGS={beaconsUrl:''};
```

Điền đường dẫn của nhóm (không dùng đường dẫn ví dụ dưới đây nếu chưa phải link thật):

```js
const SETTINGS={beaconsUrl:'https://beacons.ai/ten-trang-cua-nhom'};
```

## Nguyên liệu và luật game

Bộ nguyên liệu được báo Quân đội nhân dân (2025) mô tả gồm gạo nếp, gấc, đậu xanh, mỡ lợn, đường, vừng. Trong game có thêm các món gây nhiễu. Game chỉ **mô phỏng thử thách**, không xác nhận tỷ lệ nguyên liệu, công thức định lượng, nhiệt độ thực, cách bác bột thực tế hoặc hướng dẫn an toàn trong bếp.

Điều kiện để thắng khi dâng vua: đúng 6 nguyên liệu, hoàn thành bác bột không cháy quá 3 lần, xếp đúng lớp và cuộn 3 lần với thao tác đủ chính xác. Chỉ cần có lỗi đáng kể thì vua “chê” và thông báo lý do.

## Lưu ý lịch sử rất quan trọng

**Sự kiện lịch sử có nguồn**: Lý Bí khởi nghĩa năm 542; năm 544 xưng đế, lập nước Vạn Xuân. **Truyền thống địa phương**: các câu chuyện Giang Xá – chùa Linh Bảo và bánh dâng vua. **Hư cấu của trò chơi**: vua ngồi chấm chiếc bánh cụ thể của người chơi, lời thoại khen/chê, đĩa bánh dâng, cửa khóa, mật thư, ấn ký, cảnh kiến trúc minh họa. Tuyệt đối không giới thiệu cảnh dâng bánh là việc đã được sử liệu xác minh.

Chi tiết nguồn trong `SOURCES.md`. Để xuất bản thương mại, nhóm nên kiểm tra lại ảnh, cách gọi tên nhân vật, nội dung truyền thuyết với người làm bánh và tư liệu địa phương.

## Cách đo hiệu quả trong đồ án

Thử người dùng với hai kịch bản: làm bánh đúng và làm bánh lỗi, quan sát thời gian hoàn thành, độ thành công khi kéo bằng điện thoại, số lần bật âm, khả năng nhớ tên nguyên liệu và câu chuyện Giang Xá. Website không mặc định thu thập dữ liệu cá nhân hoặc gửi hành vi người chơi lên máy chủ.
