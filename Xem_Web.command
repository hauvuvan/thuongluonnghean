#!/bin/zsh
export PATH="/opt/homebrew/bin:/usr/local/bin:$PATH"
cd "$(dirname "$0")"
if ! command -v node >/dev/null 2>&1; then
  echo "Cần cài Node.js 22.13 trở lên để chạy web này."
  read "reply?Nhấn Enter để đóng."
  exit 1
fi
node --input-type=module -e 'import "node:sqlite"' >/dev/null 2>&1
if [ $? -ne 0 ]; then
  echo "Node.js hiện tại chưa hỗ trợ SQLite. Vui lòng dùng Node.js 22.13 trở lên."
  read "reply?Nhấn Enter để đóng."
  exit 1
fi
echo "Trang chủ: http://127.0.0.1:4173"
echo "Tra cứu: http://127.0.0.1:4173/tra-cuu-the-bao-hanh/"
echo "Quản trị: http://127.0.0.1:4173/admin"
echo "Lần đầu vào quản trị: tạo tên đăng nhập và mật khẩu của bạn."
node scripts/preview.mjs &
server_pid=$!
trap 'kill "$server_pid" 2>/dev/null' EXIT INT TERM
for attempt in {1..30}; do
  if ! kill -0 "$server_pid" 2>/dev/null; then
    break
  fi
  if curl --silent --fail http://127.0.0.1:4173/ >/dev/null; then
    open http://127.0.0.1:4173/
    break
  fi
  sleep 0.2
done
wait "$server_pid"
if [ $? -ne 0 ]; then
  read "reply?Nhấn Enter để đóng."
fi
