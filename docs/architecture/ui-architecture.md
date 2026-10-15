# Kiến Trúc Giao Diện (Feature-Sliced Design) cho Nexus Web

Dự án này áp dụng phương pháp luận **Feature-Sliced Design (FSD)** thích ứng trên **Next.js 15 App Router**.

## Cấu trúc các tầng (Layers)

1. **app/**: Tầng trên cùng, chịu trách nhiệm cho Next.js Routing, Root Layout và Providers. Code ở đây giữ mỏng nhất có thể.
2. **views/**: Đại diện cho tầng Pages của FSD. Mỗi thư mục con là một màn hình/trang hoàn chỉnh (ví dụ: home, login, dashboard).
3. **widgets/**: Các khối UI tự trị độc lập lớn (Header, Sidebar, UserProfileWidget).
4. **features/**: Chứa các use case và tương tác của người dùng (ví dụ: uth/login-by-email, slots/filter-available-slots).
5. **entities/**: Các mô hình thực thể domain (User, Product,ShoppingCart, Auction, bids).
6. **shared/**: Tầng dùng chung tái sử dụng cho toàn dự án:
   - shared/ui/: Bộ UI atoms (Button, Card, Input, Modal...).
   - shared/api/: Typed API client kết nối tới Backend.
   - shared/lib/: Tiện ích hàm (utils, helpers).
   - shared/config/: Biến môi trường.
   - shared/types/: Types chung.
