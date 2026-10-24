# Bác Trà Ký — Mở Bánh, Mở Chuyện · V4.7 Hành Quân

**Bản này đã sẵn sàng để tải lên GitHub Pages.** Giữ nguyên bối cảnh làng Giang Xá và hai tuyến game ổn định của V4.6, nhưng làm lại hoàn toàn câu đố **Mở đường hành quân**.

## 1. Những gì đã nâng cấp

- Sa bàn 3×3 được vẽ lại theo tông **giấy cổ / bản đồ quân cơ**, giữ nguyên cảnh doanh trại mưa và nền tối của bản V4.
- Các mảnh đường có nét vẽ nhiều lớp, đường đất, vết mực giấy cũ. Chạm/click để xoay 90°.
- Một **nhóm lính mang cờ** di chuyển từ mảnh này sang mảnh khác theo tuyến nối khít; cờ động đậy, quân có bước chân và hiệu ứng bụi.
- Sau khi **Xuất quân**, quân tự tiến; người chơi vẫn được xoay những mảnh chưa đi qua để cứu đường.
- Nếu quân sắp gặp đường cụt, có cảnh báo khẩn trong 2,8 giây (chế độ khó 1,9 giây). Không cứu kịp sẽ mất 1 mạng/ Game Over.
- Chế độ **3 mạng** mặc định; chế độ **Một sai lầm** (chỉ 1 mạng) cho người chơi muốn khó hơn.
- Có màn thắng, thua, nút chơi lại và nút tiếp tục sang chương Vạn Xuân; có âm thanh theo nút **Âm** trên đầu trang.
- Các phần khác như khám phá Giang Xá, tìm tín vật, ghép tranh, mini-game làm Bánh Bác và dâng vua vẫn được giữ lại.

## 2. Cách đăng lên GitHub Pages

1. Giải nén **file ZIP**.
2. Mở thư mục vừa giải nén. Chọn **toàn bộ file và thư mục bên trong**, đặc biệt là `index.html`, `styles.css`, `march.css`, `game.js`, `march.js`, `assets/` và `.nojekyll`.
3. Vào repository GitHub đang chạy website BTK, chọn **Add file → Upload files** và tải lên **thư mục gốc** của repository. Nếu GitHub hiển thị các file cũ trùng tên, hãy đảm bảo phiên bản mới đã được commit thay thế.
4. GitHub → **Settings → Pages** → Source: `Deploy from a branch`; Branch: `main`; Folder: `/(root)`.
5. Kiểm tra **Actions** đã build thành công. Mở website ở chế độ ẩn danh hoặc dùng `Ctrl + Shift + R` để tránh dùng mã CSS/JS cũ.

Mã QR đã in → Beacons → link thứ hai → GitHub Pages **không cần thay đổi** nếu vẫn dùng repository và URL hiện tại.

## 3. Link Beacons

Mở `game.js` tìm:

```js
const SETTINGS={beaconsUrl:''};
```

Điền URL Beacons đang sử dụng (dùng liên kết thật, không phải ví dụ):

```js
const SETTINGS={beaconsUrl:'https://beacons.ai/DUONG-DAN-THAT'};
```

Nếu bỏ trống, nút quay về Beacons được ẩn để tránh dẫn tới link `#` vô nghĩa.

## 4. Luật chơi màn hành quân

- Xoay bản đồ tùy ý trước khi **Xuất quân**.
- **Quân tiến tự động** trên những đoạn đường đã khớp, mỗi bước có chuyển động.
- Quân **khóa mảnh đã đi qua**. Bạn chỉ có thể xoay mảnh phía trước.
- Tắc đường trong thời gian cảnh báo mà chưa cứu được → mất 1 mạng, quân lui về xuất phát; có thể chỉnh lại bản đồ và xuất quân tiếp.
- Hết mạng → Game Over, dùng **Chơi lại màn này**.
- Tới cờ đích → WIN, nhấn **Tiếp tục câu chuyện** để sang chương cuối về Vạn Xuân.

**Mẹo cho nhóm test:** có một đường đúng đi qua các ô **1 → 2 → 5 → 8 → 9** (đánh số từ trái qua phải, trên xuống dưới). Đường đúng vẫn phải xoay các góc cho khớp cả hai đầu.

## 5. Phân biệt lịch sử với trò chơi

Các sự kiện cuộc khởi nghĩa năm 542, việc Lý Bí xưng đế, thành lập nước Vạn Xuân năm 544 có tài liệu tham khảo trong `SOURCES.md`. **Địa đồ 3×3, tuyến hành quân, binh sĩ, cờ, lời thoại và cảnh dâng bánh lên vua là minh họa và hư cấu gameplay**, không phải bản đồ trận đánh hay bản ghi lịch sử.

## 6. Kiểm thử và giới hạn

Xem `QA-V4-7.md` để biết các bài kiểm thử đã chạy. Chúng tôi đã kiểm tra chương hành quân trong Chromium mô phỏng cả desktop và màn hình nhỏ; trước khi dùng tại sự kiện, nhóm nên thử thực tế trên điện thoại Android và iPhone, kiểm tra độ trễ âm thanh và thao tác cảm ứng.

## 7. Cấu trúc file

```text
index.html           # Trang chính
styles.css           # Giao diện chung của V4.6
march.css            # Thiết kế sa bàn và lính mới
game.js              # Các mini-game và tuyến lịch sử
march.js             # Cơ chế hành quân V4.7
assets/              # Ảnh, tranh, âm thanh, thành phần game
.nojekyll
README.md
SOURCES.md
QA-CHECKLIST.md
QA-V4-7.md
```
