# Website bảo hành Zirconia

Website giới thiệu sản phẩm phục hình và quản lý, tra cứu thẻ bảo hành. Khách truy cập đọc danh mục, xem sản phẩm và tra cứu; quản trị viên tạo, sửa, thu hồi hoặc khôi phục thẻ.

## Tài liệu

- [Các trang công khai và bản đồ trang](features/public-pages.md)
- [Thiết lập, API vận hành, kiểm thử và triển khai](../README.md)
- [Nhật ký hoạt động](activity-log.md)

## Thành phần

- `worker/pages.js`: dữ liệu danh mục và dựng HTML các trang giới thiệu.
- `worker/index.js`: định tuyến, trang tra cứu/quản trị và API thẻ; dùng D1 khi triển khai Sites.
- `scripts/app.mjs`, `local-db.mjs`, `preview.mjs`: máy chủ Node.js, tài khoản quản trị cục bộ và SQLite.
- `scripts/build-worker.mjs`: gộp trang công khai vào một Worker ESM độc lập, không cần cài thư viện.

Chạy bằng `npm start`; kiểm tra bằng `npm test`, `npm run build`, `npm run validate`. Tệp dữ liệu và thông tin đăng nhập không thuộc mã nguồn. Không thay đổi schema dữ liệu bảo hành trong đợt mở rộng trang công khai.
