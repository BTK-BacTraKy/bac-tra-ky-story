# QA — Bác Trà Ký V4.7 · Mở đường hành quân

**Phương pháp:** Playwright điều khiển Chromium, nhập trực tiếp các nội dung HTML/CSS/JavaScript vào trang vì môi trường kiểm thử hiện tại chặn các điều hướng tới localhost/file URL. Các ảnh hiển thị được nạp từ tệp trong quá trình chụp ảnh mô phỏng. Mô phỏng không thay thế kiểm thử trên thiết bị thực.

| Ca kiểm thử | Kết quả |
|---|---|
| Nạp HTML, CSS và `game.js` + `march.js`, không có lỗi JavaScript | PASS |
| Mở tuyến lịch sử, vào chương 3, dựng bảng sa bàn 9 mảnh | PASS |
| Chế độ Một sai lầm: xuất quân với cổng chưa thông → cảnh báo → Game Over | PASS |
| Nút Chơi lại màn: đưa địa đồ về trạng thái chuẩn bị | PASS |
| Xoay một tuyến hợp lệ và xuất quân: nhóm lính đi tới ô 9, xuất hiện WIN | PASS |
| Từ popup WIN, nút Tiếp tục chuyển sang chương 4 (Vạn Xuân) | PASS |
| Sau khi bắt đầu hành quân, xoay kịp ô xuất phát để giải tỏa ùn tắc → WIN | PASS |
| Chế độ thường: lần 1 bị chặn còn 2 mạng, lần 2 còn 1, lần 3 Game Over | PASS |
| Màn hình giả lập 390px: không tràn ngang | PASS |
| Chạm mảnh địa đồ trên giả lập cảm ứng: tăng lượt xoay | PASS |
| Có thể thoát về trang chủ rồi mở tuyến Bánh Bác | PASS |

**Chưa được xác minh trong lượt này:** hành vi mạng thực từ GitHub Pages; thực tế thao tác trên iPhone/Android; mọi thiết bị, trình duyệt và kích thước màn hình; các mini-game Bánh Bác từ đầu đến cuối (chỉ kiểm tra vào được màn và không có lỗi JavaScript). Các chức năng Bánh Bác không bị thay đổi trong patch V4.7 và các bài test cho chúng nằm trong hồ sơ QA của bản trước.
