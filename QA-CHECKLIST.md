# V4 – Các kịch bản kiểm thử trước khi public

Đã kiểm tra bằng công cụ cú pháp/tệp và các quy tắc WIN/LOSE (kiểm tra chức năng đánh giá thuần JS), nhưng **chưa xác nhận thao tác cầm-kéo trên điện thoại thật**. Nhóm nên thử trên ít nhất một iPhone và một máy Android.

## Kịch bản 1 — WIN
1. Vào **Tự tay làm Bánh Bác**.
2. Kéo 6 **hình bát nguyên liệu** vào giỏ: Gạo nếp, Gấc nếp, Đậu xanh, Vừng, Đường kính, Mỡ lợn.
3. Mang giỏ đi tiếp. Giữ nhiệt trong vùng 42–68 để hoàn thiện bột, không để nhiệt lỗi quá 2 lần.
4. Kéo ảnh ba lớp theo thứ tự đỏ → trắng → đậu xanh.
5. Vuốt dải bột từ trái qua phải ba lần, không quá vội.
6. Kéo **hình thành phẩm** vào khung sáng **NGỰ ÁN** (hoặc dùng nút hỗ trợ) → phải được lời vua khen, hiển thị **WIN**, có hiệu ứng giấy màu.

## Kịch bản 2 — Sai một nguyên liệu → LOSE
- Đổi Đường kính thành Phô mai hoặc Ca cao, giữ mọi thao tác còn lại đúng. Sau khi dâng bánh, vua phải **chê**, hiển thị lý do nguyên liệu chưa đúng.

## Kịch bản 3 — Sai thứ tự xếp lớp → LOSE
- Chọn nguyên liệu và giữ lửa đúng. Xếp lớp trắng → đỏ → nhân. Đến cuối, vua chê vì lớp bánh chưa đúng.

## Kịch bản 4 — Giữ lửa lỗi → LOSE
- Giữ nhiệt ngoài vùng cho tới ba lần lỗi. Game đưa tới cảnh dâng bánh lỗi; vua chê.

## Kịch bản 5 — Động tác vuốt kém → LOSE
- Giữ các bước trước chính xác nhưng vuốt sai quá nhiều lần (>=3), rồi hoàn tất 3 lượt hợp lệ. Kết thúc vua chê vì thao tác cuộn chưa đạt.

## Kiểm tra UX trên thiết bị
- [ ] Chuột kéo **ảnh** đi theo con trỏ, nhả vào giỏ đúng chỗ.
- [ ] Ngón tay kéo ảnh đi theo vị trí chạm (Chrome Android / Safari iPhone).
- [ ] Có thể cuộn trang để lấy nguyên liệu cuối; giỏ vẫn nằm trong tầm kéo.
- [ ] Có thể chạm để cho vào giỏ khi không kéo được; chạm món trong giỏ để bỏ ra.
- [ ] Kéo ảnh layer đúng vào ô; thay đổi thứ tự được.
- [ ] Nút giữ nhiệt đáp ứng press-and-hold.
- [ ] Âm thanh chỉ phát khi bật ở thanh trên, không tự chạy.
- [ ] Kéo bánh lên ngự án; màn vua nếm có animation.
- [ ] Chơi lại sau WIN hoặc LOSE hoạt động.
- [ ] Quét QR đã in → Beacons → liên kết thứ hai → vào web bình thường.
- [ ] Nút nguồn và disclaimer lịch sử hiển thị rõ.

## Kết quả kiểm tra tự động tĩnh
- `node --check game.js`: hợp lệ.
- HTML parse: hợp lệ.
- CSS parse: không báo syntax error.
- Asset references: không thiếu file.
- 5 kịch bản WIN/LOSE ở hàm tính phán quyết: đạt.

**Không xem kiểm tra tĩnh là tương đương kiểm thử kéo-thả trên điện thoại thực.**
