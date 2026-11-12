# Form thẻ bảo hành

[← Tổng quan](../README.md)

Form tạo thẻ cho Five-T có mã bảo hành nhập tay (1–80 ký tự, cho phép tên có dấu), chất liệu Zirconia/Kim loại/Titan, số răng từ 1–32, một mốc 5/7/10 năm, ngày bắt đầu chọn bằng lịch, Lab cố định Five-T và nha khoa nhập tay.

Ngày hết hạn được tính cả ở trình duyệt và máy chủ từ ngày bắt đầu cộng số năm. Ngày 29/2 được đổi sang 28/2 nếu năm kết thúc không nhuận. Chọn lại ngày hoặc mốc sẽ cập nhật ngày hết hạn. Tên khách hàng, số điện thoại, vị trí răng, trạng thái và ghi chú nằm trong phần mở rộng. Số điện thoại không bắt buộc, nếu nhập phải hợp lệ. Ghi chú chỉ dùng trong quản trị.

API vẫn nhận các trường cũ. Form mới gửi thêm `termYears`; máy chủ chấp nhận 5, 7, 10 và tính lại `end` để tránh ngày hết hạn bị sửa từ phía trình duyệt. Thẻ cũ có chất liệu hoặc thời hạn khác được giữ khi chỉnh sửa nếu chưa chọn mốc mới. Lab là thông tin cố định khi hiển thị, không thêm cột vào dữ liệu. Mã được viết hoa khi lưu và tìm, mã trùng bị từ chối. Tra cứu số điện thoại chỉ áp dụng khi chuỗi tìm kiếm đúng dạng số điện thoại.

Kiểm thử hồi quy gồm tạo/sửa thẻ cũ, tên có dấu, các mốc 5/7/10 năm, ngày nhuận, không nhập số điện thoại, mã trùng và giới hạn dữ liệu công khai. Khi triển khai, kiểm tra form và kết quả tra cứu trên Vercel; dùng thẻ thử có nhãn và dọn sau kiểm tra.
