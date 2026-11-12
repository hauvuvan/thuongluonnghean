# Đăng nhập và tải quản trị

[← Tổng quan](../README.md)

Trang `/admin` kiểm tra chế độ đăng nhập lần đầu, rồi lấy danh sách thẻ qua `/api/cards`. API danh sách tự xác minh phiên; không cần gọi thêm `/api/me`. Sau đăng nhập và lưu thẻ, trang dùng lại chế độ xác thực đã biết.

Mỗi yêu cầu từ giao diện giới hạn 15 giây, gồm cả thời gian đọc phản hồi, không dùng bộ nhớ đệm. Khi mất mạng, phản hồi không hợp lệ hoặc máy chủ lỗi, trang hiển thị thông báo và nút **Thử lại**. Không tự gửi lại thao tác ghi để tránh tạo trùng sau phản hồi không rõ ràng. Khi thao tác lưu báo lỗi kết nối, kiểm tra danh sách trước khi lưu lại.

Phiên hết hạn đưa người dùng về form đăng nhập. Khi tải thất bại sau đăng nhập, lỗi được giữ trong khu vực quản trị và có thể thử lại. Chặn tải danh sách đồng thời; tính ngày Việt Nam một lần mỗi lượt dựng bảng, dùng lại khi lọc trạng thái và thống kê, xử lý trường tìm kiếm null.

Kiểm tra bằng `npm test`: API/phân quyền, đăng nhập, trang công khai và kiểm thử JavaScript giao diện trong môi trường DOM mô phỏng. Các tình huống hồi quy gồm phiên hợp lệ/hết hạn, lỗi tải sau đăng nhập, phản hồi sai, thử lại và hết thời gian chờ. Kiểm thử mô phỏng không thay thế nghiệm thu trình duyệt với phiên Supabase thật.

Vercel phát hành từ GitHub main theo cấu hình hiện có. Nếu cần khôi phục, dùng bản triển khai trước trên Vercel hoặc revert commit; thay đổi này không sửa schema hay dữ liệu.
