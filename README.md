# Web tra cứu bảo hành Zirconia

Website gồm các trang giới thiệu, danh mục và chi tiết sản phẩm, kiến thức, liên hệ cùng hai khu vực bảo hành. Xem [tổng quan tài liệu](docs/README.md) và [bản đồ trang công khai](docs/features/public-pages.md).

Hai khu vực bảo hành:

- **Khách hàng:** `/tra-cuu-the-bao-hanh/`. Tra cứu chính xác bằng mã thẻ hoặc số điện thoại, xem khách hàng, nha khoa, sản phẩm, số lượng/vị trí răng và thời hạn bảo hành. Số điện thoại được che một phần; ghi chú nội bộ không công khai.
- **Quản trị:** `/admin`. Đăng nhập, thêm và chỉnh sửa thẻ, thu hồi/khôi phục thẻ, tìm kiếm và lọc theo trạng thái. Mã thẻ không trùng; trạng thái còn hạn/hết hạn/chưa đến ngày được tính tự động theo giờ Việt Nam.

Nút **Xem kết quả minh họa** hiển thị dữ liệu mẫu có nhãn riêng, không tạo dữ liệu trong cơ sở dữ liệu.

## Chạy trên máy

Cần Node.js 22.13 trở lên, khuyến nghị Node.js 24 hoặc mới hơn. Không cần cài thêm thư viện.

1. Mở `Xem_Web.command` trên macOS, hoặc mở Terminal tại thư mục dự án và chạy `npm start`.
2. Truy cập `http://127.0.0.1:4173` để xem trang chủ; chọn **Tra cứu bảo hành** để kiểm tra thẻ.
3. Truy cập `http://127.0.0.1:4173/admin` lần đầu để tạo tên đăng nhập và mật khẩu quản trị. Mật khẩu tối thiểu 12 ký tự.
4. Đăng nhập, bấm **Thêm thẻ bảo hành**, điền thông tin và lưu. Dùng mã vừa tạo để tra cứu ở trang khách hàng.
5. Những lần chạy sau sử dụng lại tài khoản đã tạo. Dừng máy chủ bằng Control+C.

Dữ liệu và tài khoản nằm trong `data/warranties.sqlite`, được giữ lại khi đóng/mở chương trình. Khi sao lưu, dừng máy chủ rồi sao chép toàn bộ thư mục `data`. Không đưa thư mục này vào Git hoặc gói mã nguồn công khai.

Bản chạy trên máy dùng mật khẩu băm scrypt, phiên đăng nhập 8 giờ qua cookie HttpOnly/SameSite, giới hạn thử đăng nhập và kiểm tra nguồn yêu cầu. Khách tra cứu không cần đăng nhập. Không có mật khẩu quản trị mặc định.

## Triển khai máy chủ Node.js

`npm start` mặc định chỉ lắng nghe trên `127.0.0.1:4173`.

Có thể cấu hình:

| Biến | Giá trị mặc định | Ý nghĩa |
| --- | --- | --- |
| `PORT` | `4173` | Cổng HTTP |
| `HOST` | `127.0.0.1` | Địa chỉ lắng nghe |
| `PUBLIC_ORIGIN` | `http://127.0.0.1:4173` | URL gốc mà trình duyệt sử dụng; đặt thành URL HTTPS thực khi có reverse proxy |
| `WARRANTY_DATA_DIR` | `data` trong dự án | Thư mục dữ liệu lâu dài |

Khi triển khai cho khách hàng, đặt máy chủ sau reverse proxy HTTPS và cấu hình `PUBLIC_ORIGIN` tương ứng. Tạo tài khoản quản trị trước khi cho khách truy cập lần đầu. Khi `PUBLIC_ORIGIN` là HTTPS, cookie phiên có thêm cờ Secure.

## Triển khai Sites

- `worker/index.js` là Worker triển khai với cơ sở dữ liệu D1, theo `.openai/hosting.json`.
- `drizzle/0000_warranties.sql` là migration cấu trúc dữ liệu. Không có dữ liệu khách hàng kèm trong migration.
- Sites xác thực đăng nhập ChatGPT. Chỉ người dùng khớp `ADMIN_EMAIL` hoặc `ADMIN_USER_ID` đã cấu hình ở phía máy chủ mới có quyền quản trị. Không tự cấp quyền cho người đăng nhập đầu tiên.
- Ngày 11/11/2026, truy vấn Site theo ID trong cấu hình trả `project_not_found`; chưa có bản xuất bản được xác minh. Cần xác nhận lại dự án/quyền truy cập.
- Kho cục bộ chưa có remote GitHub. Không tự tạo Site khác hoặc thay đổi quyền truy cập.

## Kiểm tra và đóng gói

- `npm test`: kiểm thử API và đăng nhập, bao gồm dữ liệu tồn tại sau khi đóng/mở cơ sở dữ liệu.
- `npm run build`: gộp các module thành Worker độc lập tại `dist/server/index.js`, đồng bộ bản HTML tra cứu trong `preview/` từ nguồn chính.
- `npm run validate`: kiểm tra Worker hợp lệ.
- `npm run package`: tạo gói mã nguồn sạch tại `outputs/Zirconia_Warranty_Source.zip`; không kèm tài khoản, phiên đăng nhập hay dữ liệu khách hàng.

Đã kiểm tra: phân quyền, thêm/sửa thẻ, tra cứu mã/số điện thoại, mã trùng, ngày tháng, ghi chú riêng tư, yêu cầu khác nguồn, thiết lập quản trị, đăng nhập/đăng xuất, phiên giả mạo, giới hạn thử mật khẩu, lưu dữ liệu sau khi khởi động lại và cú pháp JavaScript phía trình duyệt.

Đã kiểm tra trực tiếp trang tra cứu trên máy tính và màn hình điện thoại 375×812: bố cục, dữ liệu minh họa, tra cứu không có kết quả và màn hình thiết lập quản trị. Ô tra cứu cao 50px, không tràn ngang ở kích thước đã kiểm tra. Chưa kiểm tra trực tiếp bảng và hộp thoại quản trị sau đăng nhập; các luồng API được kiểm tra tự động.

Giao diện điện thoại thu gọn phần giới thiệu, ẩn hình thẻ trang trí dưới 420px, dùng chữ nhập liệu 16px và vùng bấm lớn hơn. Bảng quản trị hỗ trợ tập trung bằng bàn phím để cuộn ngang; thông báo phân biệt chưa có dữ liệu và không khớp bộ lọc.

Nhật ký: [docs/activity-log.md](docs/activity-log.md).

Trang tham khảo: https://baohanhzirconia.com/tra-cuu-the-bao-hanh/. Bản dựng tái hiện chức năng tra cứu và nhận diện Zirconia với giao diện điều chỉnh cho điện thoại; không sao chép cơ sở dữ liệu hoặc mã WordPress của trang gốc.
