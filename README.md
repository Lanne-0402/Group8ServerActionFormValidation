# Nexus Social Network

Ứng dụng mạng xã hội nhỏ dùng Next.js App Router, TypeScript, PostgreSQL và Server Actions. Phạm vi hiện tại gồm đăng ký, đăng nhập, session bằng cookie, xem feed, đăng bài, xóa bài của chính mình và đăng xuất.

## Cấu trúc thư mục

```text
web/
├── app/
│   ├── (auth)/              # Trang đăng nhập, đăng ký và layout xác thực
│   ├── actions/             # Server Actions cho auth và bài viết
│   ├── feed/                # Trang feed được bảo vệ bởi session
│   ├── globals.css          # Toàn bộ style dùng chung
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Chuyển / sang /login
├── components/
│   ├── feed/                # Header, danh sách và thẻ bài viết
│   ├── forms/               # Form đăng ký, đăng nhập, đăng/xóa bài, đăng xuất
│   └── ui/                  # Nút submit và thông báo dùng lại
├── lib/
│   ├── auth/                # Hash mật khẩu và quản lý session
│   ├── data/                # Query users, sessions và posts
│   ├── demo/                # Cờ bật/tắt demo SQL injection local
│   ├── server/              # Kết nối PostgreSQL
│   ├── types/               # Kiểu dữ liệu dùng chung
│   └── validations/         # Schema Zod
├── public/                  # icon.png và background.png
├── sql/schema.sql           # Schema PostgreSQL
├── scripts/setup-login-demo.cjs # Tạo tài khoản giả cho demo Login
├── docker-compose.yml       # PostgreSQL local
├── .env.example             # Mẫu biến môi trường
└── package.json             # Dependency và npm scripts
```

