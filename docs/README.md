# Website bảo hành FIVE-T Dental Lab

Website giới thiệu sản phẩm phục hình và quản lý, tra cứu thẻ bảo hành. Khách truy cập đọc danh mục, xem sản phẩm và tra cứu; quản trị viên tạo, sửa, thu hồi hoặc khôi phục thẻ.

## Tài liệu

- [Đăng nhập và tải quản trị](features/admin-loading.md)
- [Form thẻ bảo hành](features/warranty-form.md)
- [Các trang công khai và bản đồ trang](features/public-pages.md)
- [Thiết lập, API vận hành, kiểm thử và triển khai](../README.md)
- [Triển khai Supabase và Vercel](deployment/supabase-vercel.md)
- [Nhật ký hoạt động](activity-log.md)

## Thành phần

- `worker/pages.js`: dữ liệu danh mục và dựng HTML các trang giới thiệu.
- `worker/index.js`: định tuyến, trang tra cứu/quản trị và API thẻ; dùng D1 khi triển khai Sites.
- `api/site.mjs` và `scripts/supabase.mjs`: Node.js Function trên Vercel, đăng nhập Supabase Auth và lưu dữ liệu trong Postgres.
- `scripts/app.mjs`, `local-db.mjs`, `preview.mjs`: máy chủ Node.js, tài khoản quản trị cục bộ và SQLite.
- `scripts/build-worker.mjs`: gộp trang công khai vào một Worker ESM độc lập, không cần cài thư viện.

Chạy bằng `npm start`; kiểm tra bằng `npm test`, `npm run build`, `npm run validate`. Tệp dữ liệu và thông tin đăng nhập không thuộc mã nguồn. Vercel dùng migration PostgreSQL riêng. SQLite tiếp tục phục vụ bản xem thử trên máy.
