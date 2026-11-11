# Các trang công khai

[← Tổng quan](../README.md)

## Mục đích và phạm vi

Mở rộng website từ tra cứu/quản trị thành bộ trang giới thiệu theo cấu trúc menu của [website tham khảo](https://baohanhzirconia.com/). Khảo sát ngày 11/11/2026 bằng trình duyệt: trang chủ, giới thiệu, cửa hàng, kiến thức, liên hệ và chi tiết Katana; tên và URL 16 sản phẩm được lấy từ các liên kết công khai.

Bản dựng giữ các đường dẫn chính và tổ chức thông tin; giao diện tiếp tục dùng bộ nhận diện xanh navy/cyan của bản hiện có. Nội dung biên soạn mới, không sao chép nguyên văn toàn bộ bài viết hay hình ảnh có bản quyền từ nguồn mẫu. Hình sản phẩm là minh họa; không dùng làm bằng chứng nhận diện sản phẩm thực tế.

## Bản đồ trang

| Nhóm | Đường dẫn |
| --- | --- |
| Trang chủ | `/` |
| Giới thiệu | `/ve-chung-toi/` |
| Danh mục | `/shop/`, `/shop/page/2/` |
| Nhóm sản phẩm | `/rang-su-cao-cap/`, `/rang-su-kim-loai/`, `/dong-toan-su/` |
| Chi tiết sản phẩm | 16 đường dẫn theo danh mục trên trang chủ và cửa hàng |
| Danh mục thương hiệu | `/product-category/<ten-thuong-hieu>/` theo liên kết chân trang |
| Tra cứu | `/tra-cuu-the-bao-hanh/` |
| Kiến thức | `/chuyen-muc/tu-van-kien-thuc/` và các bài hướng dẫn |
| Liên hệ | `/lien-he/` |
| Quản trị | `/admin` |

## Hành vi

Menu điều hướng dùng liên kết thật, có thể mở trực tiếp từng trang. Danh mục có tìm kiếm/lọc; chi tiết sản phẩm có thông tin riêng, liên kết nhóm và sản phẩm liên quan. Danh mục thương hiệu chưa có sản phẩm hiển thị trạng thái rỗng rõ ràng.

Tra cứu bảo hành tiếp tục gọi API hiện có. Khách không xem được ghi chú nội bộ hoặc số điện thoại đầy đủ. Quyền quản trị không thay đổi.

## Nội dung và giới hạn

Trang mẫu có 16 sản phẩm, chưa có bài viết trong mục kiến thức và để trống điện thoại/email/bản đồ. Bản dựng bổ sung hướng dẫn vận hành bảo hành bằng nội dung mới. Không tự đặt thông tin doanh nghiệp, giá, thời hạn bảo hành chung hoặc thông số y khoa chưa xác minh. Liên hệ hướng khách đến nha khoa trên thẻ, không hiển thị thông báo gửi thành công khi chưa có hệ thống nhận yêu cầu.

Danh mục được quản lý trong mã nguồn, chưa có CMS để biên tập sản phẩm/bài viết. Trước khi đưa vào sử dụng chính thức cần chủ website cung cấp ảnh, mô tả đã duyệt và thông tin liên hệ. Không thay đổi dữ liệu thật để kiểm tra giao diện.

## Kiểm tra và vận hành

Kiểm tra đường dẫn, liên kết nội bộ, lỗi 404, cú pháp JavaScript trình duyệt, gói Worker và hồi quy xác thực/tra cứu. Kiểm tra trình duyệt trên desktop và điện thoại; ghi kết quả thực tế trong nhật ký.

Máy chủ cục bộ dùng `npm start`. Build gộp hai module thành `dist/server/index.js`. Nếu cần khôi phục giao diện, dùng phiên bản mã nguồn trước thay đổi và build lại; không xóa thư mục dữ liệu. GitHub/VPS/Sites chỉ báo triển khai khi có bằng chứng từ môi trường thực tế.
