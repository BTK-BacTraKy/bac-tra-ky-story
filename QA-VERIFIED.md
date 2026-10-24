# QA — V4.5 STABLE (24/10/2026)

## Đã xác minh với trình duyệt Chromium mô phỏng

| Trường hợp | Kết quả |
|---|---|
| Trang chủ và hai lối vào | PASS |
| Lịch sử: thu thập ba vật phẩm, ấn ký, sang chương 2 | PASS |
| Sổ tư liệu: mở, hiện link nguồn, đóng | PASS |
| Trượt tranh: một bước cuối chuyển chương | PASS |
| Nối đường: xoay về cấu hình đúng và chuyển chương 4 | PASS |
| Kéo hình nguyên liệu bằng chuột và thả vào giỏ | PASS |
| Chọn 6 nguyên liệu chuẩn, tiến tới phán quyết WIN | PASS |
| Thay mỡ lợn bằng phô mai, tiến tới phán quyết LOSE | PASS |
| RESET game và trả giỏ về 0/6 | PASS |
| Viewport 390 px: không tràn ngang ở trang chủ và game bánh | PASS |
| Lỗi JS không xử lý ở các luồng trên | 0 |

Các phép kiểm tra chuyển chặng nấu bánh sử dụng thiết lập trạng thái trong mã kiểm thử để rút ngắn thời gian; không phải kết quả từ việc giữ nút đủ thời lượng trên điện thoại thật.

## Chưa kiểm tra trực tiếp

- Safari iPhone thật và Chrome Android thật khi giữ hình kéo thả nhiều lần.
- Độ trễ hoặc lỗi khi tải từ URL GitHub Pages của nhóm; chưa biết URL repository.
- Audio trên thiết bị thực, đặc biệt khi bật chế độ im lặng.
- Link Beacons của nhóm (để trống theo mặc định).

Nếu nhóm phát hiện lỗi mới: ghi bước tái hiện, thiết bị/trình duyệt, URL cụ thể và ảnh/video ngắn.
