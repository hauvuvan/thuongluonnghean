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

## 2026-11-12 09:34 — Asia/Ho_Chi_Minh

- Yêu cầu: viết lại lời văn theo cách nói tự nhiên, thân thiện với khách.
- Thay đổi: làm gọn trang chủ, tra cứu, giới thiệu, danh mục, chi tiết, hướng dẫn và liên hệ. Bỏ khẩu hiệu và mô tả chung chung, nói rõ cách tìm thẻ và khi nào nên hỏi nha khoa. Giữ ảnh, logo và trạng thái bảo trì của cửa hàng. Xem [Các trang công khai](features/public-pages.md).
- Kiểm thử độc lập: `npm test`, build, validate và kiểm tra diff đều đạt. Đã kiểm tra API tra cứu mã và số điện thoại, 39 URL, 12 ảnh, logo và trạng thái bảo trì. Thử nút Xem kết quả mẫu trên trình duyệt và xác nhận dữ liệu minh họa hiện đúng. Đã nạp lại bản xem thử trên cổng 4173.
- GitHub: chưa đối chiếu nhánh từ xa sau lần fetch bị từ chối trước đó, chưa push. Sites vẫn báo không tìm thấy dự án đã cấu hình. Chưa có đích VPS và chưa triển khai production.

## 2026-11-12 09:41 — Asia/Ho_Chi_Minh

- Yêu cầu: tối ưu dữ liệu bảo hành trên Supabase và triển khai website trên Vercel.
- Thay đổi: thêm migration Postgres có index mã, số điện thoại và thời điểm cập nhật, hàm tra cứu giới hạn trường công khai, quyền truy cập theo vai trò và phiên quản trị thu hồi được. Vercel dùng Supabase Auth và PostgREST. Bản xem thử trên máy vẫn dùng SQLite. Đã kiểm tra bản SQLite hiện tại có 0 thẻ, chưa có thẻ cần chuyển.
- Kiểm thử độc lập: `npm test` (API, xác thực và 39 URL), build Worker, validate và diff đều đạt. PostgreSQL nhúng kiểm tra migration, quyền và index. Dữ liệu giả kiểm tra xuất/nhập, bảo toàn dữ liệu, rollback khi trùng. Mô phỏng Supabase kiểm tra đăng nhập/đăng xuất, tra cứu, ghi thẻ, lỗi và giới hạn kích thước. Vercel CLI 65.14.0 build cục bộ đạt, sinh một Node.js Function và đúng 13 ảnh công khai.
- Tài liệu: [Triển khai Supabase và Vercel](deployment/supabase-vercel.md).
- GitHub: mã nguồn gốc trên `origin/main` trùng bản trước các thay đổi cục bộ nhưng lịch sử commit khác. Đã đẩy nhánh `codex/supabase-vercel` dựa trên `origin/main`, commit tính năng `d8ace5e`.
- Cloud: Vercel yêu cầu xác nhận quyền truy cập nhóm. Kết nối Supabase chưa liệt kê được project, chưa chạy migration trên cloud. Chưa triển khai production, chưa kiểm thử sau triển khai. VPS không áp dụng.

### Kiểm thử sau triển khai Preview — 2026-11-12 09:47 Asia/Ho_Chi_Minh

- Môi trường: [Vercel Preview](https://thuongluonnghean-jormyt2yn-hauvuhdvn-8559s-projects.vercel.app), project `thuongluonnghean`, deployment `dpl_ADAnG3Zzgcw7HzThDjLvcPgF9Zoa`, commit `9ec9a36`. Vercel xác nhận READY. Bản Preview giữ quyền bảo vệ của project.
- Kiểm thử viên: agent `qa_cloud` và Codex. Trang chủ, cửa hàng đang bảo trì, chi tiết Katana, trang tra cứu và trang quản trị đều HTTP 200. Logo PNG và ảnh Katana WebP trả đúng định dạng. Trang chủ đúng tên FIVE-T và đủ 12 đường dẫn ảnh. Đường dẫn migration trả 404. API trạng thái đăng nhập HTTP 503 có thông báo chưa kết nối. Log Vercel không có lỗi mức error/fatal trong cửa sổ 15 phút đã kiểm tra.
- Chưa xác nhận project Supabase đích, chưa chạy migration hoặc cấu hình biến môi trường. Luồng tra cứu dữ liệu, đăng nhập và ghi thẻ chưa nghiệm thu trên Preview. Production chưa triển khai.

### Cấu hình Supabase trên Vercel — 2026-11-12 Asia/Ho_Chi_Minh

- Đã xác nhận Vercel lưu `SUPABASE_URL` và `SUPABASE_PUBLISHABLE_KEY` cho Preview và Production. Chưa có `SUPABASE_SECRET_KEY` hoặc `SUPABASE_ADMIN_USER_ID`.
- Kết nối quản trị Supabase không truy cập được project đã cung cấp. Chưa áp dụng migration, chưa triển khai bản mới hoặc nghiệm thu dữ liệu thật.
