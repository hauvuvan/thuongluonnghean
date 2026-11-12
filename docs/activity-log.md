# Nhật ký hoạt động

## 2026-11-11 15:27 — Asia/Ho_Chi_Minh

- Yêu cầu: hoàn thiện và kiểm tra giao diện Zirconia.
- Thay đổi: bố cục điện thoại gọn hơn; input 16px và ô tra cứu tối thiểu 50px; vùng bấm; nhãn dialog và vùng bảng cuộn; thông báo rỗng theo dữ liệu/bộ lọc. Đồng bộ Worker và bản HTML xem thử.
- Kiểm tra: agent verify chạy npm test, build, validate đạt. Kiểm tra trình duyệt trang khách hàng desktop và 375×812, minh họa, tra cứu không tìm thấy, thiết lập quản trị; không tràn ngang, ô tra cứu đo được 50px. Chưa kiểm tra UI bảng/dialog sau đăng nhập.
- Tài liệu: [README](../README.md).
- GitHub: không có remote, chưa push. Kho chưa có commit trước task; chỉ đưa các tệp được sửa trong task vào commit, giữ nguyên các tệp chưa theo dõi khác.
- VPS: không có cấu hình/đích triển khai; chưa triển khai. Bản xem thử chỉ chạy cục bộ, không phải nghiệm thu production.

## 2026-11-11 15:43 — Asia/Ho_Chi_Minh

- Yêu cầu: làm đủ trang theo website mẫu baohanhzirconia.com.
- Đã thêm 37 route công khai: 16 chi tiết sản phẩm, 3 nhóm, 9 danh mục thương hiệu, phân trang, tìm sản phẩm, giới thiệu, liên hệ, kiến thức và 3 hướng dẫn mới. Menu điện thoại; chuyển tra cứu từ trang chủ qua sessionStorage rồi xóa, không đưa dữ liệu vào URL khi JavaScript hoạt động.
- Tài liệu: [tổng quan](README.md), [các trang](features/public-pages.md), [cách chạy](../README.md). Đã ghi giới hạn ảnh minh họa và thiếu thông tin liên hệ.
- Agent verify kiểm tra độc lập: npm test đạt API/auth và crawl 39 URL, liên kết nội bộ, H1, trailing slash, script và404. Build/validate và import artifact đạt. Đã sửa category có segment thừa và kiểm tra lại đạt.
- Trình duyệt: desktop trang chủ/danh mục, tìm Katana còn1 kết quả, tìm không khớp hiện rỗng; tra cứu từ trang chủ tự điền và gửi đúng. Điện thoại375x812: trang chủ, Katana, mở menu và đi liên hệ đạt; trang đã đo không tràn ngang. Chưa kiểm tra UI quản trị sau đăng nhập; hồi quy API/auth đạt. Môi trường http://127.0.0.1:4180 dùng dữ liệu thử riêng trong /tmp, không dữ liệu thật.
- Git: đưa các tệp chạy/build/test/cấu hình cần thiết đã tồn tại nhưng chưa được theo dõi vào kho để commit chạy lại đầy đủ; không kèm data/outputs/bí mật. GitHub chưa có remote nên chưa push.
- Sites: ID trong cấu hình trả project_not_found, chưa xuất bản. Không tự tạo Site khác hoặc đổi quyền. VPS chưa có cấu hình/đích, chưa triển khai; không có nghiệm thu production.

## 2026-11-12 09:24 — Asia/Ho_Chi_Minh

- Yêu cầu: làm lưới trang chủ giống mẫu, mỗi ô chỉ có ảnh, bỏ phần Dòng toàn sứ và Đối tác.
- Thay đổi: dùng 12 ảnh từ trang mẫu đã tối ưu WebP, chia 8 ảnh cao cấp và 4 ảnh kim loại. Mỗi ảnh dẫn tới chi tiết sản phẩm. Giữ trang danh mục toàn sứ riêng và luồng tra cứu. Xem [Các trang công khai](features/public-pages.md).
- Kiểm thử độc lập: `npm test` (API, xác thực và 39 URL), build, validate, 12 ảnh và liên kết sản phẩm HTTP 200; gói Worker trả đủ ảnh. Bản xem thử cổng 4173 đã khởi động lại. Trình duyệt xác nhận đủ 12 ảnh, bốn cột ở 1033 px, hai cột ở 375 px và không tràn ngang.
- GitHub: nhánh main từ xa có commit khác với HEAD cục bộ. Yêu cầu lấy lịch sử nhánh từ xa bị từ chối nên chưa đối chiếu lịch sử hoặc push.
- Sites báo không tìm thấy dự án đã cấu hình. Chưa có đích VPS và chưa triển khai production.

## 2026-11-12 09:28 — Asia/Ho_Chi_Minh

- Yêu cầu: giữ mục Sản phẩm và báo đang bảo trì; cập nhật nhận diện theo logo FIVE-T Dental Lab được cung cấp.
- Thay đổi: dùng logo và tên công ty trên các trang công khai, tra cứu và quản trị. Hai trang cửa hàng hiển thị bảo trì; giữ dữ liệu và các trang nhóm, chi tiết. Xem [Các trang công khai](features/public-pages.md) để mở lại cửa hàng.
- Kiểm thử độc lập: `npm test` (API, xác thực và 39 URL), build, validate, kiểm tra logo và trạng thái bảo trì trên máy chủ cục bộ và Worker build đều đạt. Sau khi khởi động lại bản xem thử, trình duyệt xác nhận trang Sản phẩm hiện logo, tên và thông báo ở khung mặc định và 375 px, không tràn ngang.
- GitHub: chưa push vì lịch sử nhánh từ xa chưa được đối chiếu sau khi thao tác fetch bị từ chối ở đợt trước. Sites vẫn báo không tìm thấy dự án đã cấu hình; chưa có đích VPS.
