# Các trang công khai

[← Tổng quan](../README.md)

## Mục đích và phạm vi

Mở rộng website từ tra cứu/quản trị thành bộ trang giới thiệu theo cấu trúc menu của [website tham khảo](https://baohanhzirconia.com/). Khảo sát ngày 11/11/2026 bằng trình duyệt: trang chủ, giới thiệu, cửa hàng, kiến thức, liên hệ và chi tiết Katana; tên và URL 16 sản phẩm được lấy từ các liên kết công khai.

Bản dựng giữ các đường dẫn chính và tổ chức thông tin; giao diện tiếp tục dùng bộ nhận diện xanh navy/cyan của bản hiện có. Nội dung khách hàng dùng lời văn ngắn, nêu rõ thao tác tra cứu và hướng dẫn liên hệ nha khoa. Trang sản phẩm dùng tên và nhóm, cùng thông tin cần kiểm tra trên thẻ. 12 ảnh trên lưới trang chủ lấy từ website tham khảo theo yêu cầu và được lưu dưới dạng WebP trong `worker/product-images/`. Hình ảnh phục vụ minh họa, không dùng làm bằng chứng nhận diện sản phẩm thực tế.

## Bản đồ trang

| Nhóm | Đường dẫn |
| --- | --- |
| Trang chủ | `/` |
| Giới thiệu | `/ve-chung-toi/` |
| Danh mục | `/shop/`, `/shop/page/2/` |
| Nhóm sản phẩm | `/rang-su-cao-cap/`, `/rang-su-kim-loai/`, `/dong-toan-su/` |
| Chi tiết sản phẩm | 16 đường dẫn theo danh mục cửa hàng |
| Danh mục thương hiệu | `/product-category/<ten-thuong-hieu>/` theo liên kết chân trang |
| Tra cứu | `/tra-cuu-the-bao-hanh/` |
| Kiến thức | `/chuyen-muc/tu-van-kien-thuc/` và các bài hướng dẫn |
| Liên hệ | `/lien-he/` |
| Quản trị | `/admin` |

## Hành vi

FIVE-T Dental Lab là thương hiệu hiển thị trên đầu trang, chân trang và tiêu đề trình duyệt. Logo gốc nằm ở `worker/brand/five-t.png`.

Header dùng chung giữa các trang công khai, tra cứu và quản trị. Menu và trang chủ đã bỏ mục kiến thức/hướng dẫn.

Trang Sản phẩm mở danh mục 16 sản phẩm với ảnh thật, 12 sản phẩm ở trang đầu và 4 ở trang hai. Lưới bốn cột trên máy tính và hai trên điện thoại. Mục Sản phẩm vẫn có trong menu. Khi `shopUnderMaintenance` trong `worker/pages.js` là `true` (mặc định hiện tại là `false`), `/shop/` và `/shop/page/2/` hiển thị “Đang bảo trì” cùng liên kết tra cứu và về trang chủ. Đặt lại thành `false` và build để mở lại lưới cửa hàng. Trang nhóm và chi tiết sản phẩm vẫn hoạt động.

Menu điều hướng dùng liên kết thật, có thể mở trực tiếp từng trang. Danh mục có tìm kiếm/lọc; chi tiết sản phẩm có thông tin riêng, liên kết nhóm và sản phẩm liên quan. Danh mục thương hiệu chưa có sản phẩm hiển thị trạng thái rỗng rõ ràng.

Trang chủ hiển thị 8 ảnh Răng sứ cao cấp và 4 ảnh Răng sứ kim loại, mỗi ảnh mở trang chi tiết tương ứng. Lưới có bốn cột trên máy tính, hai cột ở chiều rộng tối đa 650 px. Cụm Dòng toàn sứ và Đối tác không xuất hiện trong nội dung chính của trang chủ. Danh mục Dòng toàn sứ vẫn truy cập được qua cửa hàng và chân trang.

Tra cứu bảo hành tiếp tục gọi API hiện có. Khách không xem được ghi chú nội bộ hoặc số điện thoại đầy đủ. Quyền quản trị không thay đổi.

## Nội dung và giới hạn

Trang mẫu có 16 sản phẩm, chưa có bài viết trong mục kiến thức và để trống điện thoại/email/bản đồ. Bản dựng bổ sung hướng dẫn vận hành bảo hành bằng nội dung mới. Không tự đặt thông tin doanh nghiệp, giá, thời hạn bảo hành chung hoặc thông số y khoa chưa xác minh. Liên hệ hướng khách đến nha khoa trên thẻ, không hiển thị thông báo gửi thành công khi chưa có hệ thống nhận yêu cầu.

Danh mục được quản lý trong mã nguồn, chưa có CMS để biên tập sản phẩm/bài viết. Trước khi đưa vào sử dụng chính thức cần chủ website cung cấp ảnh, mô tả đã duyệt và thông tin liên hệ. Không thay đổi dữ liệu thật để kiểm tra giao diện.

## Kiểm tra và vận hành

Kiểm tra đường dẫn, liên kết nội bộ, lỗi 404, cú pháp JavaScript trình duyệt, gói Worker và hồi quy xác thực/tra cứu. Kiểm tra trình duyệt trên desktop và điện thoại; ghi kết quả thực tế trong nhật ký.

Máy chủ cục bộ dùng `npm start`. Build đóng gói các module và ảnh vào `dist/server/index.js`. Cả bản cục bộ và Worker phục vụ ảnh qua `/product-images/`. Nếu cần khôi phục giao diện, dùng phiên bản mã nguồn trước thay đổi và build lại; không xóa thư mục dữ liệu. GitHub/VPS/Sites chỉ báo triển khai khi có bằng chứng từ môi trường thực tế.

## Chi tiết răng sứ cao cấp

Tám ảnh trên trang chủ dẫn tới trang HT Smile, Lava, Nacera, Cercon, Ceramill, Katana, Venus và Zirconia. Mỗi trang có ảnh thật, phần giới thiệu riêng, các mục mô tả và liên kết nguồn tham khảo từ baohanhzirconia.com. Nội dung được tóm lược, thời hạn Five-T theo từng thẻ bảo hành. Dữ liệu bài nằm trong productDetails của worker/pages.js.
