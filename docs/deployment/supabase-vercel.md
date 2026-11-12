# Triển khai FIVE-T Dental Lab trên Vercel và Supabase

[← Tổng quan](../README.md)

Vercel chạy website và API trong một Node.js Function. Supabase Postgres lưu thẻ và phiên quản trị. Supabase Auth xác minh email và mật khẩu khi đăng nhập. Bản xem thử bằng `npm start` vẫn dùng SQLite và tài khoản cục bộ.

## 1. Chuẩn bị Supabase

1. Chọn project Supabase thuộc tài khoản vận hành FIVE-T. Với project mới, áp dụng hai migration theo thứ tự [tạo bảng bảo hành](../../supabase/migrations/20261112025922_warranties.sql), rồi [giới hạn quyền máy chủ](../../supabase/migrations/20261112030013_restrict_warranty_service_role.sql) qua Supabase CLI hoặc SQL Editor của đúng project. Migration tạo bảng, index, hàm tra cứu và quyền truy cập. Bật Data API và giữ schema `public` trong danh sách schema của Data API. Nếu đích đã có bảng cùng tên, kiểm tra cấu trúc và dữ liệu trước khi áp dụng.
2. Trong Authentication, tạo tài khoản email/mật khẩu cho người quản trị. Bắt buộc tắt Allow new users to sign up và Allow anonymous sign-ins tại Sign In / Providers. Mỗi tài khoản email đã xác minh được bạn tạo hoặc mời vào project đều có quyền quản trị; không cần cấu hình UUID riêng. Tài khoản và phiên SQLite cũ không chuyển lên cloud.
3. Nếu cần chuyển thẻ có sẵn, dừng ghi ở nguồn, sao lưu toàn bộ thư mục `data`, rồi xuất từ bản sao SQLite. Tệp SQL chứa dữ liệu cá nhân, đặt ngoài repo, giữ quyền chỉ chủ tệp đọc và chuyển thẳng đến PostgreSQL bằng kết nối TLS. Không đưa tệp vào chat, Git hoặc gói triển khai.

```sh
node scripts/export-sqlite-to-supabase.mjs /duong-dan-ban-sao/warranties.sqlite /duong-dan-rieng/five-t-import.sql
psql -X -v ON_ERROR_STOP=1 -f /duong-dan-rieng/five-t-import.sql
```

Cấu hình kết nối đích cho `psql` qua cấu hình kết nối và mật khẩu cục bộ của PostgreSQL. Bản xuất giữ mã, ID, thông tin thẻ và thời điểm cập nhật. Nhập trong một giao dịch, gặp mã hoặc ID trùng sẽ hủy cả lượt. Đối chiếu tổng số thẻ và một vài mã đã chọn trước khi chuyển sang ghi trên cloud.

## 2. Cấu hình Vercel

Dùng Framework Preset **Other**, Root Directory là thư mục chứa `vercel.json` và giữ cấu hình Node.js tương thích với `engines.node` trong `package.json`. Các tuyến công khai và API được chuyển tới `api/site.mjs`. Thư mục tĩnh chỉ có logo và ảnh sản phẩm.

| Biến | Giá trị |
| --- | --- |
| `SUPABASE_URL` | Project URL của Supabase |
| `SUPABASE_PUBLISHABLE_KEY` | Publishable key dùng cho Supabase Auth |
| `SUPABASE_SECRET_KEY` | Secret key của project, lưu dạng Sensitive trong Vercel |

Đặt biến đúng môi trường. Dùng cơ sở dữ liệu thử riêng nếu bật Preview để kiểm tra thao tác ghi. Triển khai từ Git hoặc CLI đã liên kết đúng project. Khi chưa cấu hình Supabase, các API trên Vercel trả HTTP 503 và các trang công khai vẫn có thể mở.

## 3. Kiểm tra và vận hành

- Chạy `npm test`, `npm run build`, `npm run validate` trước khi triển khai. Hai lệnh build và validate này kiểm tra gói Worker cũ. Vercel có lệnh build riêng trong cấu hình.
- Sau triển khai, kiểm tra trang chủ, logo và ảnh, trang Sản phẩm, tra cứu bằng mã và số điện thoại thử, đăng nhập, tạo/sửa thẻ thử và đăng xuất. Kiểm tra truy cập quản trị khi thiếu phiên, việc che số điện thoại ở kết quả công khai và log lỗi Vercel/Supabase nếu có quyền.
- Tra cứu dùng index mã và số điện thoại, trả tối đa 20 thẻ, không lấy ghi chú nội bộ. Trang quản trị tải tối đa 1.000 thẻ mới cập nhật. PostgreSQL chặn mã thẻ trùng và không cấp quyền đọc trực tiếp cho vai trò khách hoặc người dùng đăng nhập.
- Đăng nhập kiểm tra đăng ký công khai đã tắt; nếu mở lại, đăng nhập mới bị chặn với HTTP 503. Không dùng project này cho tài khoản khách hàng. Biến SUPABASE_ADMIN_USER_ID cũ không còn được sử dụng.
- Phiên quản trị lưu theo từng UUID và hết hạn sau tối đa 8 giờ. Mỗi yêu cầu quản trị kiểm tra tài khoản còn tồn tại, đã xác minh email và không bị khóa. Đăng xuất thu hồi phiên trên cơ sở dữ liệu. Khi cần chặn ngay tài khoản hiện có, thu hồi phiên của người đó trong `warranty_admin_sessions` và khóa tài khoản trong Supabase Auth.
- Nếu lỗi sau khi chuyển, có thể quay về phiên bản Vercel trước đó nếu tương thích schema. Giữ bản sao SQLite và bản sao lưu Supabase. Sau khi phát sinh dữ liệu mới trên cloud, đối chiếu các bản ghi mới trước khi chuyển luồng ghi trở lại SQLite.

Tài liệu nền tảng: [Vercel Functions](https://vercel.com/docs/functions/runtimes/node-js), [Vercel Rewrites](https://vercel.com/docs/routing/rewrites), [Supabase API keys](https://supabase.com/docs/guides/getting-started/api-keys), [Supabase Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security).
