# BÁC TRÀ KÝ — THEO BƯỚC LÝ NAM ĐẾ · MỞ BÁNH – MỞ CHUYỆN

**Phiên bản game giải đố thực sự**, được thiết kế cho khách quét mã QR trên Beacons rồi nhấn đường dẫn số 2 để khám phá. Đây là một website tĩnh (HTML/CSS/JavaScript), có thể đăng bằng GitHub Pages.

## Có gì trong game?

### I. THEO BƯỚC LÝ NAM ĐẾ (chơi khoảng 5–12 phút)
1. **Giang Xá – Linh Bảo:** tìm **3 tín vật phát sáng** trên tranh, quan sát gợi ý và mở khóa ấn ký theo thứ tự.
2. **Mật thư khởi nghĩa:** chơi **sliding puzzle 8 mảnh + 1 ô trống**, ghép lại hình minh họa. Có nút xem tranh gốc.
3. **Đường đi qua màn sương:** **xoay 9 ống nối đường** để tạo lối từ góc xuất phát đến đích. Đây là bản đồ giải đố tượng trưng, không phải đường hành quân có thật.
4. **Vạn Xuân 544:** mở cuộn sớ về mốc lịch sử, dẫn sang game Bánh Bác.

Các tranh, tín vật, mật thư và đối thoại được sáng tạo để phục vụ trò chơi. Sự kiện cuộc khởi nghĩa năm 542 và việc lập nước Vạn Xuân năm 544 dựa trên nguồn lịch sử chính thống. Tuyến Giang Xá – Linh Bảo dựa trên tư liệu di sản và truyền tụng địa phương, có thuyết minh giới hạn chứng cứ.

### II. THỬ TÀI LÀM BÁNH BÁC (chơi khoảng 2–4 phút)
1. **Chọn nguyên liệu:** chọn đúng 4 nguyên liệu tiêu biểu trên mâm, tránh lựa chọn nhiễu.
2. **Giữ nhiệt & bác bột:** nhấn + / − để điều khiển nhiệt, giữ kim trong vùng xanh 42–68, **nhấn và giữ** để bác bột. Giữ sai nhiệt quá 3 lần sẽ phải thử lại chặng.
3. **Xếp lớp bánh:** chạm chọn rồi chạm vị trí đặt, hoặc kéo thả các lớp đỏ – trắng – nhân đậu xanh. Sau khi đúng sẽ mở thành phẩm và cuộn sớ về truyền thuyết Bánh Bác.

**Lưu ý:** Mini-game không phải công thức, hướng dẫn sản xuất hay cách xử lý chảo thật. Không thử thao tác trên chảo mỡ nóng bằng tay. Kỹ thuật và trình tự thực tế phải tham khảo người làm bánh tại Giang Xá.

## Upload lên GitHub Pages (tránh 404)

1. Giải nén file ZIP, **không** tải nguyên ZIP lên repository.
2. Đưa **tất cả các file ngay ở thư mục gốc** lên repository GitHub; nhất là `index.html`, `styles.css`, `game.js` và thư mục `assets/`.
3. GitHub → **Settings → Pages** → Deploy from a branch → `main` → `/(root)` → Save.
4. Mở link GitHub Pages ở Settings → Pages → Visit site. Trong Beacons, dùng URL này làm link thứ hai: **✦ MỞ BÁNH – MỞ CHUYỆN**.
5. Quét mã QR đã in → Beacons → link thứ hai để kiểm thử trên iPhone/Android trước khi chia sẻ rộng.

## Chỉnh nội dung / ảnh

- `index.html`: trang, các màn, khối nội dung, cách trình bày.
- `styles.css`: bảng màu, animation, responsive.
- `game.js`: các chương chơi, luật giải đố, lời thoại và game làm bánh.
- `assets/`: ảnh do công cụ tạo minh họa, hình nhận diện và ảnh sản phẩm.
- Trong `game.js`, `SETTINGS.beaconsUrl` hiện để trống vì chưa có URL chính thức. Khi bạn thay bằng đường dẫn Beacons hợp lệ dạng `https://beacons.ai/...`, nút **↗ Beacons** sẽ tự xuất hiện trên thanh đầu trang.

### Cấu trúc

```
index.html
styles.css
game.js
.nojekyll
README.md
SOURCES.md
assets/
  official-logo.png
  village.webp
  temple.webp
  warcamp.webp
  river.webp
  lybi-face.webp
  products.png
  ...
```

## Quy định về tính chính xác

- Lý Bí và Lý Nam Đế là cùng một nhân vật trong hai giai đoạn: trước và sau khi xưng đế năm 544.
- **Sự kiện xác thực**: cuộc khởi nghĩa do Lý Bí lãnh đạo năm 542; xưng đế, lập nước Vạn Xuân năm 544.
- **Tư liệu địa phương/truyền thuyết**: mối liên hệ tuổi trẻ của Lý Bí với chùa Linh Bảo, Giang Xá, câu chuyện bánh dâng vua.
- **Hư cấu gameplay**: ấn ký, mật thư chia mảnh, bản đồ nối ống, lời thoại nhân vật, bối cảnh tranh gợi cảm hứng. Không trình bày là mô hình tái dựng chính xác làng Giang Xá thế kỷ VI.
- Có nút **Sổ tư liệu** ở từng chương và một trang tư liệu riêng trong game; xem nguồn trong `SOURCES.md`.

## Về hình ảnh

Các minh họa bối cảnh được tạo riêng phục vụ game và mang tính nghệ thuật, không phải ảnh di tích hiện tại hay hình phục dựng khảo cổ. Logo FPT x Bác Trà Ký là hình ảnh nhóm cung cấp; ảnh Bánh Bác cũng lấy từ tư liệu nhóm đã cung cấp trước đó. Không sử dụng ảnh minh họa để chứng minh sự kiện lịch sử.

## Kiểm thử

Đã kiểm tra luồng cơ bản và kết thúc của cả hai game trong Chromium tự động, không phát sinh lỗi JavaScript trong các bước đó. Đã kiểm tra giao diện với viewport di động 390px không tràn ngang. Nhóm vẫn nên kiểm tra trên điện thoại thật, đặc biệt phần nhấn giữ khi bác bột và âm thanh.
