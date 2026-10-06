# Use Case Specification — Flow 1: Mua hàng thường (Buyer)

> Nguồn: `flow-he-thong.md` (mục F1, đối chiếu F3, F7, F8, F10, F11).
> Đối chiếu: `project-nexus-main-SRS.md` (Catalog Service, Commerce Service, User Service, Auction Service).
> Chỉ ghi những gì flow đã nêu hoặc suy ra trực tiếp từ flow. Mục nào không có cơ sở thì **bỏ trống/không ghi**.

---

## Tổng quan Flow F1

```
Buyer tìm SP → xem chi tiết → thêm giỏ hàng → checkout (SĐT, địa chỉ)
→ hiện QR → chuyển khoản (hoặc Buyer huỷ đơn)
→ cổng TT xác nhận thanh toán → PAID → seller chấp nhận
→ GHN tạo vận đơn → giao hàng → DELIVERED
→ 3 ngày chờ Buyer kiểm tra (Buyer có thể xác nhận sớm hoặc khiếu nại)
→ COMPLETED → tiền vào ví seller → đánh giá
```

**Bộ trạng thái order:** `PENDING_PAYMENT → PAID → SHIPPING → DELIVERED → COMPLETED`

> Khi Buyer khiếu nại (ở trạng thái `DELIVERED`), order được **đánh dấu tranh chấp** (dispute flag) — tạm dừng chuyển `COMPLETED` cho đến khi Support Staff xử lý xong.

---

## Danh sách Use Case

| ID | Tên use case | Actor chính | Liên quan Flow |
|---|---|---|---|
| UC-F1-01 | Search & Browse Products | Buyer (hoặc Guest) | F1 bước 1 |
| UC-F1-02 | View Product Detail | Buyer (hoặc Guest) | F1 bước 1 |
| UC-F1-03 | Add Product to Cart | Buyer | F1 bước 2 |
| UC-F1-04 | View & Manage Cart | Buyer | F1 bước 2 |
| UC-F1-05 | Checkout & Generate Payment QR | Buyer | F1 bước 3–4 |
| UC-F1-06 | Make Bank Transfer Payment | Buyer | F1 bước 5 |
| UC-F1-07 | Verify Payment / Cancel / Timeout | External System / Buyer | F1 bước 6, F7 |
| UC-F1-08 | Accept or Reject Order | Seller | F1 bước 7, F3 |
| UC-F1-09 | Create Shipping Order (GHN) | System / Seller | F1 bước 7, F11 |
| UC-F1-10 | Track & Confirm Delivery | Buyer / GHN | F1 bước 8 |
| UC-F1-11 | Complete Order & Settle Payment | System / Buyer | F1 bước 9, F8 |
| UC-F1-12 | Rate & Review After Transaction | Buyer / Seller | F1 bước 10, F10 |
| UC-F1-13 | Raise Dispute | Buyer / Support Staff | F1 bước 8–9 |
| UC-F1-14 | View Order History | Buyer | F1 tất cả bước |

---

## UC-F1-01: Search & Browse Products

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Search & Browse Products |
| **Use Case ID** | UC-F1-01 |
| **Actor(s)** | Buyer, Guest (khách chưa đăng nhập) |
| **Description** | Buyer/Guest tìm kiếm, lọc và duyệt danh sách sản phẩm theo từ khoá, danh mục, giá để tìm sản phẩm mong muốn. |
| **Preconditions** | Hệ thống đang hoạt động. Có sản phẩm trong Catalog. |
| **Post conditions** | Danh sách sản phẩm được hiển thị theo điều kiện tìm kiếm / lọc / phân trang. |
| **Main Flow (Basic Path)** | 1. Buyer/Guest truy cập trang danh sách sản phẩm.<br>2. Hệ thống hiển thị danh sách sản phẩm (phân trang).<br>3. Buyer/Guest nhập từ khoá tìm kiếm hoặc chọn bộ lọc (danh mục, giá, …).<br>4. Hệ thống trả về kết quả phù hợp, phân trang.<br>5. Buyer/Guest duyệt danh sách, chọn sản phẩm để xem chi tiết (→ UC-F1-02). |
| **Alternative Flow** | **A1 — Không có kết quả** (bước 4): Hệ thống thông báo "Không tìm thấy sản phẩm phù hợp". Buyer có thể thay đổi điều kiện tìm kiếm. |
| **Exception Flow** | **E1 — Catalog Service không phản hồi** (bước 2): Hệ thống hiển thị lỗi "Không thể tải danh sách sản phẩm", mời Buyer thử lại sau.<br>**E2 — Lỗi kết nối mạng** (bước 3): Yêu cầu tìm kiếm thất bại, hệ thống hiển thị thông báo lỗi kết nối. |
| **Business Rules** | - Giá Buyer nhìn thấy = giá Seller đặt + % chiết khấu nền tảng (admin cấu hình).<br>- Guest có thể xem danh sách sản phẩm.<br>- Guest **không** thêm giỏ hàng — phải đăng nhập trước (F5).<br>- Sản phẩm seller đăng hiển thị ngay (không cần duyệt); admin có thể ẩn/xoá SP vi phạm. |
| **Đối chiếu SRS** | SRS mô tả API: `GET /api/products` (query: page, pageSize, categoryId, search) → Catalog Service. `GET /api/categories` → trả về danh mục. Frontend component: `ProductList.tsx`, `ProductCard.tsx`. |

---

## UC-F1-02: View Product Detail

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | View Product Detail |
| **Use Case ID** | UC-F1-02 |
| **Actor(s)** | Buyer, Guest |
| **Description** | Buyer/Guest xem chi tiết sản phẩm: tên, mô tả, giá, hình ảnh, danh mục, thông tin shop, rank sản phẩm, rank cửa hàng và **uy tín seller**. |
| **Preconditions** | Sản phẩm tồn tại và đang hiển thị (chưa bị ẩn/xoá). |
| **Post conditions** | Buyer/Guest xem được thông tin chi tiết sản phẩm (tên, mô tả, giá, hình ảnh, danh mục, thông tin shop, rank sản phẩm, rank cửa hàng, uy tín seller). |
| **Main Flow (Basic Path)** | 1. Buyer/Guest chọn một sản phẩm từ danh sách (UC-F1-01).<br>2. Hệ thống hiển thị trang chi tiết sản phẩm: tên, mô tả, giá (đã cộng chiết khấu), hình ảnh, danh mục, thông tin seller/shop, rank sản phẩm, rank cửa hàng, **uy tín seller**.<br>3. Buyer có thể bấm "Thêm vào giỏ hàng" (→ UC-F1-03). |
| **Alternative Flow** | **A1 — Sản phẩm hết hàng** (bước 2): Hệ thống hiển thị trạng thái hết hàng, nút "Thêm giỏ hàng" bị vô hiệu hoá. |
| **Exception Flow** | **E1 — Sản phẩm không tồn tại / đã bị ẩn** (bước 1): Hệ thống trả về lỗi 404 hoặc thông báo sản phẩm không còn tồn tại. |
| **Business Rules** | - Giá hiển thị = giá seller đặt + % chiết khấu nền tảng.<br>- Rank sản phẩm và rank cửa hàng được tính từ đánh giá sản phẩm (F10).<br>- **Uy tín seller ≠ Rank** — uy tín dùng để chặn bid/bán (ngưỡng admin cấu hình); rank dùng để hiển thị/lọc (F10).<br>- Guest xem được chi tiết nhưng phải đăng nhập mới thêm giỏ hàng. |
| **Đối chiếu SRS** | SRS mô tả API: `GET /api/products/{productId}` → Catalog Service. Frontend: product detail page. |

---

## UC-F1-03: Add Product to Cart

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Add Product to Cart |
| **Use Case ID** | UC-F1-03 |
| **Actor(s)** | Buyer |
| **Description** | Buyer thêm sản phẩm vào giỏ hàng. Hệ thống kiểm tra kho ảo trước khi thêm, tạm tính tiền hàng (phí ship chốt ở checkout). |
| **Preconditions** | Buyer đã đăng nhập (Guest **không** được thêm giỏ hàng).<br>Sản phẩm tồn tại và còn hàng trong kho ảo. |
| **Post conditions** | Sản phẩm được thêm vào giỏ hàng của Buyer. Tạm tính tiền hàng được cập nhật. |
| **Main Flow (Basic Path)** | 1. Buyer bấm "Thêm vào giỏ hàng" trên trang chi tiết sản phẩm (UC-F1-02).<br>2. Buyer chọn số lượng (mặc định = 1).<br>3. Hệ thống kiểm tra kho ảo: sản phẩm còn đủ số lượng.<br>4. Hệ thống thêm sản phẩm vào giỏ hàng.<br>5. Hệ thống tạm tính tiền hàng (phí ship chốt ở bước checkout, **bỏ thuế**).<br>6. Hệ thống hiển thị thông báo thêm thành công. |
| **Alternative Flow** | **A1 — Sản phẩm đã có trong giỏ** (bước 4): Hệ thống cập nhật số lượng (cộng thêm) thay vì tạo dòng mới. |
| **Exception Flow** | **E1 — Chưa đăng nhập** (bước 1): Hệ thống chuyển hướng Buyer đến trang đăng nhập.<br>**E2 — Hết hàng / không đủ số lượng** (bước 3): Hệ thống thông báo "Sản phẩm không đủ số lượng trong kho". Không thêm vào giỏ. |
| **Business Rules** | - Khách chưa đăng nhập (Guest) **không** thêm giỏ hàng → phải đăng nhập trước (F5).<br>- Tạm tính tiền hàng = giá sản phẩm (đã cộng chiết khấu). Phí ship tính ở checkout khi có địa chỉ. **Bỏ thuế**.<br>- Kho ảo do seller tự khai, tự quản lý (F3). |
| **Đối chiếu SRS** | SRS mô tả API: `POST /api/carts/{userId}/items` → Commerce Service. Frontend: `CartSummary.tsx`. |

---

## UC-F1-04: View & Manage Cart

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | View & Manage Cart |
| **Use Case ID** | UC-F1-04 |
| **Actor(s)** | Buyer |
| **Description** | Buyer xem giỏ hàng, chỉnh số lượng, xoá sản phẩm và tiến hành checkout. Tạm tính tiền hàng tự động cập nhật khi thay đổi. |
| **Preconditions** | Buyer đã đăng nhập. |
| **Post conditions** | Buyer xem được giỏ hàng hiện tại, có thể chỉnh số lượng hoặc xoá sản phẩm. |
| **Main Flow (Basic Path)** | 1. Buyer truy cập trang giỏ hàng.<br>2. Hệ thống hiển thị danh sách sản phẩm trong giỏ: tên, hình, giá, số lượng, thành tiền.<br>3. Hệ thống hiển thị tạm tính tiền hàng (**bỏ thuế**, phí ship tính ở checkout).<br>4. Buyer có thể:<br>&nbsp;&nbsp;a. Thay đổi số lượng → hệ thống tính lại tạm tính.<br>&nbsp;&nbsp;b. Xoá sản phẩm khỏi giỏ.<br>&nbsp;&nbsp;c. Bấm "Tiến hành thanh toán" → UC-F1-05. |
| **Alternative Flow** | **A1 — Giỏ hàng trống** (bước 2): Hệ thống hiển thị thông báo "Giỏ hàng trống", nút checkout bị vô hiệu hoá. |
| **Exception Flow** | **E1 — Sản phẩm trong giỏ đã bị ẩn/xoá bởi admin** (bước 2): Hệ thống hiển thị cảnh báo "Sản phẩm X không còn khả dụng", tự động loại khỏi giỏ, tính lại tạm tính.<br>**E2 — Sản phẩm trong giỏ hết hàng** (bước 4a): Buyer tăng số lượng vượt quá kho. Hệ thống báo lỗi "Kho chỉ còn N sản phẩm", không cho tăng thêm. |
| **Business Rules** | - Tạm tính tiền hàng = Σ(giá SP × số lượng). **Bỏ thuế**.<br>- Phí ship tính ở bước checkout khi có địa chỉ giao hàng (gọi API GHN — F11).<br>- Mã giảm giá có thể áp dụng ở bước checkout (F9, UC-F9-04). |
| **Đối chiếu SRS** | SRS mô tả API: `GET /api/carts/{userId}` → Commerce Service. Frontend: `CartPage.tsx`, `CartSummary.tsx`. |

---

## UC-F1-05: Checkout & Generate Payment QR

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Checkout & Generate Payment QR |
| **Use Case ID** | UC-F1-05 |
| **Actor(s)** | Buyer |
| **Description** | Buyer điền SĐT + địa chỉ, áp mã giảm giá (nếu có), bấm hiện QR thanh toán. Hệ thống tạo order (PENDING_PAYMENT), giữ kho ảo chống bán trùng, sinh mã QR chuyển khoản có thời hạn. |
| **Preconditions** | Buyer đã đăng nhập.<br>Giỏ hàng có ít nhất 1 sản phẩm.<br>Sản phẩm trong giỏ còn hàng. |
| **Post conditions** | Order được tạo với trạng thái `PENDING_PAYMENT`.<br>Kho ảo **giữ** số lượng sản phẩm tương ứng (chống bán trùng).<br>Mã QR chuyển khoản được hiển thị cho Buyer. |
| **Main Flow (Basic Path)** | 1. Buyer bấm "Tiến hành thanh toán" từ giỏ hàng (UC-F1-04).<br>2. Hệ thống hiển thị form checkout: Buyer điền SĐT nhận hàng, địa chỉ nhận hàng.<br>3. Hệ thống tính phí ship (gọi API GHN theo địa chỉ seller → buyer — F11).<br>4. *(Tuỳ chọn)* Buyer áp mã giảm giá (→ UC-F9-04).<br>5. Hệ thống hiển thị tổng tiền cuối cùng (tiền hàng + phí ship − mã giảm giá nếu có).<br>6. Buyer bấm **"Hiện QR thanh toán"**.<br>7. Hệ thống thực hiện:<br>&nbsp;&nbsp;a. Tạo ORDER với trạng thái `PENDING_PAYMENT`.<br>&nbsp;&nbsp;b. Kho ảo **giữ** (reserve) số lượng sản phẩm đã mua.<br>&nbsp;&nbsp;c. Sinh mã QR chuyển khoản (với nội dung chuyển khoản duy nhất + số tiền).<br>8. Hệ thống hiển thị mã QR cho Buyer (kèm hướng dẫn chuyển khoản: số tài khoản, nội dung, số tiền). |
| **Alternative Flow** | *(Không có)* |
| **Exception Flow** | **E1 — Sản phẩm hết hàng giữa chừng** (bước 7b): Trong khoảng thời gian từ lúc thêm giỏ đến lúc checkout, sản phẩm đã hết. Hệ thống thông báo lỗi, không tạo order.<br>**E2 — Thiếu thông tin bắt buộc** (bước 2): Buyer không điền SĐT hoặc địa chỉ. Hệ thống báo lỗi validation, không cho tiếp tục.<br>**E3 — GHN API không phản hồi** (bước 3): Không tính được phí ship. Hệ thống hiển thị "Chưa tính được phí vận chuyển, vui lòng thử lại". |
| **Business Rules** | - Order được tạo **trước** khi thanh toán (tại thời điểm bấm hiện QR).<br>- Kho ảo giữ hàng ngay khi tạo order (chống bán trùng / overselling).<br>- Thanh toán **chỉ** qua chuyển khoản ngân hàng.<br>- Mỗi order có nội dung chuyển khoản duy nhất để webhook nhận diện.<br>- **Thời hạn QR** = thời gian chờ chuyển khoản (do hệ thống cấu hình). Quá hạn → huỷ order + nhả kho (UC-F1-07). |
| **Đối chiếu SRS** | SRS mô tả API: `POST /api/orders` (tạo order từ cart), `POST /api/orders/{orderId}/checkout` (bắt đầu checkout) → Commerce Service. Frontend: `CheckoutFlow.tsx`. Cổng thanh toán **chốt sử dụng Stripe** (tích hợp Stripe Webhook tự động nhận diện thanh toán, đồng bộ với SRS gốc). |

---

## UC-F1-06: Make Bank Transfer Payment

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Make Bank Transfer Payment |
| **Use Case ID** | UC-F1-06 |
| **Actor(s)** | Buyer |
| **Description** | Buyer chuyển khoản qua app ngân hàng (quét QR hoặc nhập thủ công). Cổng thanh toán gửi webhook xác nhận khi tiền vào (→ UC-F1-07). |
| **Preconditions** | Order ở trạng thái `PENDING_PAYMENT`. Mã QR đã hiển thị (UC-F1-05). |
| **Post conditions** | Buyer đã chuyển khoản (bên ngoài hệ thống). Hệ thống chờ webhook xác nhận. |
| **Main Flow (Basic Path)** | 1. Buyer mở app ngân hàng.<br>2. Buyer quét mã QR hoặc nhập thủ công: số tài khoản, nội dung chuyển khoản, số tiền.<br>3. Buyer xác nhận chuyển khoản.<br>4. Ngân hàng xử lý giao dịch.<br>5. Cổng thanh toán nhận tiền → gửi webhook đến hệ thống (→ UC-F1-07). |
| **Exception Flow** | **E1 — Sai nội dung / sai số tiền** (bước 2): Webhook không khớp → hệ thống ghi log, order giữ `PENDING_PAYMENT`. Buyer liên hệ hỗ trợ nếu cần.<br>**E2 — Không chuyển khoản (quá hạn)** (bước 1–3): Hết thời hạn → hệ thống tự huỷ order + nhả kho (UC-F1-07 A2). |
| **Business Rules** | - Toàn bộ hành động chuyển khoản diễn ra **ngoài hệ thống**.<br>- Nội dung + số tiền phải **đúng** để webhook đối soát tự động.<br>- Buyer cần chuyển khoản trước thời hạn QR (quá hạn → huỷ order). |
| **Đối chiếu SRS** | Cổng thanh toán **chốt sử dụng Stripe** (sử dụng Stripe webhook tự động đối soát và xác nhận thanh toán). |

---

## UC-F1-07: Verify Payment / Cancel / Timeout

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Verify Payment / Cancel / Timeout |
| **Use Case ID** | UC-F1-07 |
| **Actor(s)** | External System (Cổng thanh toán Stripe), Buyer |
| **Description** | Xử lý 3 tình huống khi order ở `PENDING_PAYMENT`: (a) Stripe Webhook nhận tiền → đối soát → PAID. (b) Buyer chủ động huỷ đơn → huỷ ngay + nhả kho. (c) Quá hạn → hệ thống tự huỷ + nhả kho. |
| **Preconditions** | Order tồn tại với trạng thái `PENDING_PAYMENT`.<br>Cổng thanh toán Stripe đã được cấu hình webhook đến hệ thống. |
| **Post conditions** | **Thanh toán thành công:** Order → `PAID`, kho trừ thẳng, Seller nhận thông báo.<br>**Huỷ (Buyer hoặc quá hạn):** Order bị huỷ, kho ảo nhả hàng. |
| **Main Flow (Basic Path)** | 1. Cổng thanh toán Stripe nhận thanh toán vào tài khoản.<br>2. Stripe gửi webhook: thông tin giao dịch, số tiền, thời gian.<br>3. Hệ thống **kiểm tra trùng** (idempotency): nếu đã xử lý → bỏ qua.<br>4. Hệ thống đối soát: nội dung/orderId **khớp** mã order + số tiền **đúng**.<br>5. Hệ thống cập nhật order → `PAID`.<br>6. Kho trừ thẳng (xác nhận reserve).<br>7. Gửi thông báo cho Seller: "Đơn đã thanh toán, chờ chấp nhận" (→ UC-F1-08). |
| **Alternative Flow** | **A1 — Buyer chủ động huỷ đơn** (trước khi thanh toán):<br>&nbsp;&nbsp;1. Buyer bấm "Huỷ đơn hàng" trên trang chờ thanh toán.<br>&nbsp;&nbsp;2. Hệ thống huỷ order ngay lập tức.<br>&nbsp;&nbsp;3. Kho ảo nhả hàng.<br>&nbsp;&nbsp;4. Buyer nhận xác nhận "Đơn hàng đã được huỷ".<br><br>**A2 — Quá hạn chưa nhận tiền** *(hệ thống tự xử lý)*:<br>&nbsp;&nbsp;1. Hết thời hạn thanh toán mà chưa có webhook khớp.<br>&nbsp;&nbsp;2. Hệ thống tự động huỷ order.<br>&nbsp;&nbsp;3. Kho ảo nhả hàng.<br>&nbsp;&nbsp;4. Buyer nhận thông báo "Đơn đã bị huỷ do quá hạn thanh toán". |
| **Exception Flow** | **E1 — Webhook không khớp** (bước 4): Nội dung hoặc số tiền sai → hệ thống ghi log, order giữ `PENDING_PAYMENT` (chờ quá hạn hoặc Buyer liên hệ hỗ trợ). |
| **Business Rules** | - Mọi giao dịch qua cổng thanh toán **Stripe**.<br>- **Chống xử lý trùng** — webhook có thể gửi lại, hệ thống kiểm tra idempotency.<br>- Khớp → `PAID`, kho trừ thẳng.<br>- **Buyer chủ động huỷ** → huỷ ngay + nhả kho (không trừ uy tín).<br>- Quá hạn mua thường → huỷ + nhả kho. Đấu giá quá hạn → huỷ + **trừ uy tín** (F2, khác F1).<br>- **Refund** khi seller chưa giao → về ví buyer (ví nội bộ, không rút được — F8). |
| **Đối chiếu SRS** | SRS mô tả Commerce Service xử lý payment qua Stripe. Chốt Stripe webhook. Event `OrderCreated` / `OrderPaid` → publish qua RabbitMQ. |

---

## UC-F1-08: Accept or Reject Order

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Accept or Reject Order |
| **Use Case ID** | UC-F1-08 |
| **Actor(s)** | Seller |
| **Description** | Seller chấp nhận hoặc từ chối đơn đã thanh toán. Chấp nhận → tạo vận đơn GHN. Từ chối → huỷ order, refund về ví Buyer, **trừ uy tín seller**. |
| **Preconditions** | Order có trạng thái `PAID`.<br>Seller đã đăng nhập và là chủ shop của sản phẩm trong order. |
| **Post conditions** | **Chấp nhận:** Order chuyển sang `SHIPPING`, vận đơn GHN được tạo.<br>**Không chấp nhận:** Order bị huỷ, tiền refund về ví Buyer, seller bị trừ uy tín. |
| **Main Flow (Basic Path)** | 1. Seller nhận thông báo: "Đơn hàng mới đã thanh toán, chờ bạn chấp nhận".<br>2. Seller xem chi tiết đơn hàng: sản phẩm, số lượng, tổng tiền, thông tin Buyer (SĐT, địa chỉ).<br>3. Seller bấm **"Chấp nhận đơn"**.<br>4. Hệ thống gọi API GHN tạo vận đơn (→ UC-F1-09).<br>5. Order chuyển sang trạng thái `SHIPPING`.<br>6. Buyer nhận thông báo: "Đơn hàng đã được seller xác nhận, đang chuẩn bị giao". |
| **Alternative Flow** | **A1 — Seller không chấp nhận đơn** (bước 3):<br>&nbsp;&nbsp;1. Seller bấm "Từ chối đơn".<br>&nbsp;&nbsp;2. Hệ thống huỷ order.<br>&nbsp;&nbsp;3. Hệ thống thực hiện **refund** → tiền trả về **ví Buyer** (ví nội bộ).<br>&nbsp;&nbsp;4. Kho ảo nhả hàng.<br>&nbsp;&nbsp;5. Hệ thống **trừ uy tín seller** (mức do Admin cấu hình).<br>&nbsp;&nbsp;6. Buyer nhận thông báo: "Seller đã từ chối đơn, tiền đã hoàn về ví". |
| **Exception Flow** | **E1 — GHN API lỗi khi tạo vận đơn** (bước 4): Seller đã chấp nhận nhưng GHN không phản hồi. Order giữ trạng thái `PAID`, hệ thống retry tạo vận đơn. Nếu thất bại liên tục → thông báo admin/support xử lý thủ công.<br>**E2 — Seller không phản hồi quá lâu** (bước 3): Nếu seller không chấp nhận/từ chối trong thời gian quy định (chưa chốt cụ thể — điểm mở), hệ thống có thể tự huỷ order + refund buyer. |
| **Business Rules** | - Seller tự giữ hàng, tự quyết định chấp nhận hay không.<br>- Seller **từ chối đơn → bị trừ uy tín** (mức do Admin cấu hình).<br>- Refund khi seller chưa giao → về **ví buyer** (ví nội bộ — buyer không rút được, chỉ tiêu — F8).<br>- Vận đơn tạo **sau khi** seller chấp nhận đơn (F11).<br>- Seller chấp nhận → GHN tạo vận đơn tự động (F3 bước 4). |
| **Đối chiếu SRS** | SRS không mô tả chi tiết API chấp nhận đơn, nhưng Commerce Service quản lý order lifecycle. Event `OrderCreated` được publish qua RabbitMQ. Flow chính thức bổ sung bước seller chấp nhận mà SRS gốc không nhắc rõ. |

---

## UC-F1-09: Create Shipping Order (GHN)

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Create Shipping Order (GHN) |
| **Use Case ID** | UC-F1-09 |
| **Actor(s)** | System (tự động sau khi Seller chấp nhận) |
| **Description** | Hệ thống nghe **event Seller chấp nhận đơn** → tự động gọi API GHN tạo vận đơn (event-driven, không phải cron). Vận đơn chứa thông tin lấy hàng (seller) và giao hàng (buyer). |
| **Preconditions** | Seller đã bấm "Chấp nhận đơn" (UC-F1-08).<br>Order ở trạng thái `PAID` → chuyển `SHIPPING`. |
| **Post conditions** | Vận đơn GHN được tạo. Mã vận đơn được gắn vào order. Buyer và Seller có thể theo dõi trạng thái. |
| **Main Flow (Basic Path)** | 1. Hệ thống gọi API GHN tạo vận đơn với thông tin:<br>&nbsp;&nbsp;- Địa chỉ lấy hàng (seller).<br>&nbsp;&nbsp;- Địa chỉ giao hàng (buyer — SĐT + địa chỉ từ checkout).<br>&nbsp;&nbsp;- Thông tin kiện hàng (trọng lượng, kích thước, …).<br>2. GHN trả về mã vận đơn.<br>3. Hệ thống lưu mã vận đơn vào order.<br>4. Buyer và Seller nhận thông báo có mã vận đơn để theo dõi. |
| **Exception Flow** | **E1 — GHN API lỗi** (bước 1): Hệ thống ghi log lỗi, thử lại (retry). Nếu thất bại liên tục, thông báo cho admin/support xử lý thủ công. |
| **Business Rules** | - Chỉ **1 hãng vận chuyển**: GHN (F11).<br>- Vận đơn tạo **sau khi** seller chấp nhận đơn — **không phải** ngay khi order `PAID`.<br>- Phí ship đã được tính và hiển thị cho buyer lúc checkout (gọi API GHN báo phí — F11 bước 1). |
| **Đối chiếu SRS** | SRS không mô tả chi tiết GHN integration, nhưng flow chính thức chốt dùng GHN. Fulfillment Service (1 trong 6 service theo kiến trúc flow) sẽ xử lý tích hợp GHN. |

---

## UC-F1-10: Track & Confirm Delivery

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Track & Confirm Delivery |
| **Use Case ID** | UC-F1-10 |
| **Actor(s)** | Buyer, Seller, External System (GHN) |
| **Description** | GHN vận chuyển hàng, tự cập nhật trạng thái. Hệ thống đồng bộ để Buyer/Seller theo dõi. Giao thành công → DELIVERED → bắt đầu 3 ngày chờ Buyer kiểm tra. |
| **Preconditions** | Vận đơn GHN đã được tạo (UC-F1-09).<br>Order ở trạng thái `SHIPPING`. |
| **Post conditions** | Khi GHN xác nhận giao thành công, order chuyển sang `DELIVERED`. Bắt đầu **3 ngày chờ** Buyer kiểm tra hàng (→ UC-F1-11). |
| **Main Flow (Basic Path)** | 1. GHN vận chuyển hàng từ seller đến buyer.<br>2. GHN tự động cập nhật trạng thái vận chuyển (đang lấy hàng, đang giao, …) → hệ thống đồng bộ qua API/webhook GHN.<br>3. Buyer/Seller truy cập hệ thống → xem trạng thái vận chuyển real-time.<br>4. GHN xác nhận đã giao thành công → cập nhật trạng thái `DELIVERED`.<br>5. Hệ thống cập nhật order sang `DELIVERED`.<br>6. Buyer nhận thông báo: "Đơn hàng đã được giao. Bạn có 3 ngày để kiểm tra hàng trước khi đơn tự động hoàn tất". |
| **Alternative Flow** | **A1 — Giao thất bại do lỗi Buyer** (bước 4): GHN báo giao không thành công vì **Buyer không nhận hàng** hoặc **địa chỉ Buyer nhập sai**:<br>&nbsp;&nbsp;1. Hệ thống **trừ uy tín Buyer** (lỗi do Buyer gây ra).<br>&nbsp;&nbsp;2. Hàng **hoàn về Seller**.<br>&nbsp;&nbsp;3. Hệ thống **cộng lại kho** (nhả reserve).<br>&nbsp;&nbsp;4. Thông báo Seller để xử lý (giao lại hoặc huỷ + refund).<br><br>**A2 — Giao thất bại do lỗi vận chuyển** (bước 4): GHN báo giao không thành công vì **GHN giao sai giờ / không liên hệ được / lỗi vận chuyển**:<br>&nbsp;&nbsp;1. **Không trừ uy tín Buyer** (lỗi không phải do Buyer).<br>&nbsp;&nbsp;2. Hệ thống ghi nhận, thông báo Seller.<br>&nbsp;&nbsp;3. GHN tự sắp xếp giao lại hoặc Seller liên hệ GHN xử lý. |
| **Exception Flow** | **E1 — GHN webhook không phản hồi / mất kết nối** (bước 2): Hệ thống chủ động polling API GHN để lấy trạng thái mới nhất. Nếu polling cũng thất bại → ghi log, thông báo admin/support.<br>**E2 — Hàng bị mất / hư hỏng trong vận chuyển** (bước 4): GHN báo kiện hàng gặp sự cố. Hệ thống ghi nhận, thông báo Seller và Buyer. Chuyển sang quy trình khiếu nại (→ UC-F1-13). |
| **Business Rules** | - GHN tự cập nhật trạng thái → hệ thống chỉ cần **đồng bộ** (F11 bước 3).<br>- Buyer/Seller chỉ **theo dõi** (không can thiệp vận chuyển qua hệ thống).<br>- **Trừ uy tín Buyer chỉ khi lỗi do Buyer** (không nhận hàng, địa chỉ sai). Lỗi do GHN → **không trừ** uy tín Buyer. |
| **Đối chiếu SRS** | SRS không mô tả chi tiết tracking, nhưng flow chốt hệ thống đồng bộ trạng thái từ GHN. Fulfillment Service đảm nhận. |

---

## UC-F1-11: Complete Order & Settle Payment

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Complete Order & Settle Payment |
| **Use Case ID** | UC-F1-11 |
| **Actor(s)** | System (tự động), Buyer |
| **Description** | Sau khi DELIVERED, hệ thống chờ **3 ngày** để Buyer kiểm tra hàng. Buyer có thể xác nhận sớm hoặc mở khiếu nại. Hết 3 ngày không có khiếu nại → tự động COMPLETED → tiền vào ví seller, cộng uy tín. Sau COMPLETED, đơn **kết thúc vĩnh viễn**. |
| **Preconditions** | Order ở trạng thái `DELIVERED` (GHN xác nhận giao thành công). |
| **Post conditions** | Order chuyển sang `COMPLETED`.<br>Tiền vào ví Seller (= giá seller đặt, nền tảng giữ chiết khấu).<br>Uy tín cả hai bên được cộng.<br>Đơn **kết thúc** — không thể chuyển trạng thái nào nữa, được lưu trữ. |
| **Main Flow (Basic Path)** | 1. Hệ thống nhận xác nhận `DELIVERED` từ GHN (UC-F1-10).<br>2. Hệ thống bắt đầu đếm **3 ngày** chờ Buyer kiểm tra hàng.<br>3. Sau 3 ngày, nếu **không có khiếu nại** (UC-F1-13) → hệ thống tự động chuyển order sang `COMPLETED`.<br>4. Hệ thống tính tiền cho Seller:<br>&nbsp;&nbsp;- Tiền seller nhận = giá seller đặt (trước chiết khấu).<br>&nbsp;&nbsp;- Nền tảng giữ lại % chiết khấu (admin cấu hình).<br>5. Hệ thống cộng tiền vào **ví Seller** (ví nội bộ).<br>6. Hệ thống cộng uy tín cho cả Buyer và Seller (F10).<br>7. Seller nhận thông báo: "Đơn hàng hoàn tất, tiền đã vào ví".<br>8. Buyer nhận thông báo: "Đơn hàng hoàn tất, bạn có thể đánh giá" (→ UC-F1-12).<br>9. Đơn hàng **kết thúc vĩnh viễn** — không thể chuyển trạng thái nào nữa, được **lưu trữ**. |
| **Alternative Flow** | **A1 — Buyer xác nhận sớm** (bước 2, trong 3 ngày):<br>&nbsp;&nbsp;1. Buyer bấm **"Đã nhận hàng, xác nhận hoàn tất"**.<br>&nbsp;&nbsp;2. Hệ thống kiểm tra: đơn hàng **không có khiếu nại** đang mở.<br>&nbsp;&nbsp;3. Order chuyển `COMPLETED` ngay (không chờ hết 3 ngày).<br>&nbsp;&nbsp;4. Tiếp tục từ bước 4 của Main Flow.<br><br>**A2 — Buyer mở khiếu nại trong 3 ngày** (bước 2):<br>&nbsp;&nbsp;1. Buyer mở khiếu nại (→ UC-F1-13).<br>&nbsp;&nbsp;2. Hệ thống **tạm dừng** đếm 3 ngày, **chưa chuyển** `COMPLETED`.<br>&nbsp;&nbsp;3. Tiền **tạm giữ**, chưa chuyển cho Seller.<br>&nbsp;&nbsp;4. Chờ Support Staff xử lý xong khiếu nại → tuỳ kết quả mà COMPLETED hoặc refund. |
| **Exception Flow** | **E1 — Lỗi cộng tiền ví Seller** (bước 5): Hệ thống gặp lỗi (DB, timeout, …). Ghi log, retry. Order vẫn `COMPLETED` nhưng tiền chưa vào ví → admin/support xử lý. |
| **Business Rules** | - **Tiền vào ví Seller = đúng giá Seller đặt.** Phần chênh lệch (% chiết khấu nền tảng) → nền tảng giữ.<br>- Tiền vào ví seller khi đơn **hoàn tất** (hết 3 ngày hoặc Buyer xác nhận sớm — F8 bước 3).<br>- Seller muốn rút tiền → tạo lệnh rút → admin/staff duyệt → chuyển thủ công (F8 bước 5).<br>- **Chỉ Buyer** được phép xác nhận sớm (Seller không thể tự chuyển COMPLETED).<br>- **Buyer không thể xác nhận sớm nếu đang có khiếu nại** mở.<br>- Uy tín buyer: mua thành công → cộng uy tín (F10). Uy tín seller: bán xong + không bị khiếu nại → cộng uy tín (F10).<br>- Sau `COMPLETED` → đơn **kết thúc vĩnh viễn**, không thể chuyển trạng thái nào nữa, được **lưu trữ**. |
| **Đối chiếu SRS** | SRS mô tả Commerce Service xử lý order lifecycle. Event-driven: `OrderCompleted` event có thể được publish để các service khác cập nhật (ví, reputation, notification). |

---

## UC-F1-12: Rate & Review After Transaction

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Rate & Review After Transaction |
| **Use Case ID** | UC-F1-12 |
| **Actor(s)** | Buyer, Seller |
| **Description** | Đơn hoàn tất → Buyer đánh giá sản phẩm + seller, Seller đánh giá ngược Buyer (2 chiều). Đánh giá ảnh hưởng rank SP + rank shop. Uy tín cộng từ giao dịch thành công. |
| **Preconditions** | Order ở trạng thái `COMPLETED`. |
| **Post conditions** | Đánh giá được lưu.<br>Rank sản phẩm và rank cửa hàng được cập nhật.<br>Uy tín buyer/seller có thể được cập nhật. |
| **Main Flow (Basic Path)** | 1. Buyer truy cập order đã hoàn tất.<br>2. Buyer đánh giá **sản phẩm** (rating + review) → ảnh hưởng rank sản phẩm + rank cửa hàng.<br>3. Buyer đánh giá **seller** (rating + review).<br>4. Seller nhận thông báo có đánh giá mới.<br>5. Seller đánh giá ngược lại **buyer** (rating + review) — **2 chiều**.<br>6. Hệ thống cập nhật:<br>&nbsp;&nbsp;a. **Rank** sản phẩm và cửa hàng (từ đánh giá sản phẩm — dùng để hiển thị + lọc).<br>&nbsp;&nbsp;b. **Uy tín** (reputation) buyer: mua thành công → cộng uy tín.<br>&nbsp;&nbsp;c. **Uy tín** seller: bán xong + không bị khiếu nại → cộng uy tín. |
| **Alternative Flow** | **A1 — Buyer/Seller không đánh giá** (bước 2–5): Đánh giá là tuỳ chọn. Order vẫn ở trạng thái `COMPLETED`. Uy tín vẫn được cộng từ việc hoàn tất giao dịch (không phụ thuộc vào việc có đánh giá hay không). |
| **Exception Flow** | **E1 — Đánh giá chứa nội dung vi phạm** (bước 2–5): Hệ thống phát hiện nội dung không phù hợp (spam, ngôn từ xúc phạm, …). Đánh giá bị từ chối hoặc ẩn, thông báo cho người đánh giá.<br>**E2 — Sản phẩm đã bị ẩn/xoá bởi admin** (bước 2): Sản phẩm vi phạm đã bị admin moderation. Buyer vẫn có thể đánh giá seller nhưng không thể đánh giá sản phẩm đã bị xoá. |
| **Business Rules** | - Đánh giá giao dịch (rating & review): **2 chiều** — buyer đánh giá seller VÀ seller đánh giá buyer (F10 bước 1).<br>- **Rank** (từ đánh giá sản phẩm) → tính cho **cửa hàng + sản phẩm**, dùng để hiển thị + lọc. **Không có** rank cho buyer (F10 bước 2).<br>- **Uy tín ≠ Rank**: Uy tín dùng để chặn bid/bán (ngưỡng admin cấu hình). Rank dùng để hiển thị/lọc (F10 bước 3).<br>- **Cơ chế cộng điểm & trần uy tín**: **Tùy vào Admin hoặc Seller quyết định** (hệ thống cung cấp cơ chế cấu hình linh hoạt cho từng cấp độ/chính sách).<br>- **Đánh giá người dùng**: 1 lần mỗi bên mỗi đơn.<br>- **Đánh giá sản phẩm**: 1 lần mỗi SP mỗi lần mua; mua lại thì đánh giá lại được, **cộng dồn**. |
| **Đối chiếu SRS** | SRS mô tả User Service: `GET /api/users/{userId}/reputation` → trả reputation score. Flow bổ sung hệ thống rank riêng (rank ≠ reputation). Cơ chế cộng và trần điểm uy tín được thiết lập theo quyết định của Admin hoặc Seller qua cấu hình hệ thống. |

---

## UC-F1-13: Raise Dispute (Khiếu nại / Tranh chấp)

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | Raise Dispute |
| **Use Case ID** | UC-F1-13 |
| **Actor(s)** | Buyer, Support Staff |
| **Description** | Buyer mở khiếu nại khi nhận hàng sai/hỏng/không đúng mô tả (trong 3 ngày sau DELIVERED). Hệ thống tạm giữ tiền, chuyển Support Staff xử lý. Kết quả: refund Buyer hoặc chuyển tiền Seller. |
| **Preconditions** | Order ở trạng thái `DELIVERED`.<br>Còn trong thời hạn **3 ngày** kiểm tra hàng (chưa chuyển `COMPLETED`).<br>Buyer đã đăng nhập. |
| **Post conditions** | Order được đánh dấu **đang tranh chấp** (dispute flag).<br>Tiền **tạm giữ**, chưa chuyển cho Seller.<br>Hệ thống tạm dừng đếm 3 ngày, **không tự chuyển** `COMPLETED`.<br>Support Staff nhận thông báo để xử lý. |
| **Main Flow (Basic Path)** | 1. Buyer truy cập đơn hàng đã nhận (`DELIVERED`).<br>2. Buyer bấm **"Khiếu nại"**.<br>3. Buyer chọn lý do khiếu nại:<br>&nbsp;&nbsp;a. Hàng sai mô tả.<br>&nbsp;&nbsp;b. Hàng bị hỏng / lỗi.<br>&nbsp;&nbsp;c. Thiếu sản phẩm trong kiện hàng.<br>&nbsp;&nbsp;d. Không nhận được hàng (dù GHN báo đã giao).<br>4. Buyer mô tả chi tiết + đính kèm hình ảnh/bằng chứng (tuỳ chọn).<br>5. Buyer bấm **"Gửi khiếu nại"**.<br>6. Hệ thống đánh dấu order **đang tranh chấp**:<br>&nbsp;&nbsp;a. Tạm dừng đếm 3 ngày (không tự chuyển `COMPLETED`).<br>&nbsp;&nbsp;b. Tạm giữ tiền chưa chuyển cho Seller.<br>7. Seller nhận thông báo: "Buyer đã mở khiếu nại cho đơn hàng X".<br>8. Support Staff nhận thông báo để tiếp nhận xử lý. |
| **Alternative Flow** | **A1 — Support Staff xử lý — Buyer thắng** (sau bước 8):<br>&nbsp;&nbsp;1. Staff xem xét bằng chứng, xác nhận khiếu nại hợp lệ.<br>&nbsp;&nbsp;2. Hệ thống thực hiện **refund** → tiền trả về **ví Buyer**.<br>&nbsp;&nbsp;3. Order bị huỷ (không chuyển `COMPLETED`).<br>&nbsp;&nbsp;4. Seller bị **trừ uy tín** (nếu lỗi do Seller).<br>&nbsp;&nbsp;5. Buyer và Seller nhận thông báo kết quả.<br><br>**A2 — Support Staff xử lý — Seller thắng** (sau bước 8):<br>&nbsp;&nbsp;1. Staff xem xét bằng chứng, xác nhận khiếu nại không hợp lệ.<br>&nbsp;&nbsp;2. Hệ thống gỡ dispute flag, tiếp tục chuyển `COMPLETED`.<br>&nbsp;&nbsp;3. Tiền vào ví Seller (theo flow UC-F1-11 bước 4–9).<br>&nbsp;&nbsp;4. Buyer và Seller nhận thông báo kết quả.<br><br>**A3 — Support Staff đề xuất thoả thuận** (sau bước 8):<br>&nbsp;&nbsp;1. Staff liên hệ cả hai bên, đề xuất phương án (refund 1 phần, gửi lại hàng, …).<br>&nbsp;&nbsp;2. Cả hai bên đồng ý → hệ thống thực hiện theo phương án.<br>&nbsp;&nbsp;3. Order chuyển `COMPLETED` hoặc huỷ tuỳ thoả thuận. |
| **Exception Flow** | **E1 — Quá hạn 3 ngày mà Buyer chưa gửi khiếu nại** (bước 2): Order tự động chuyển `COMPLETED` (→ UC-F1-11). Buyer không thể mở khiếu nại nữa.<br>**E2 — Buyer gửi khiếu nại thiếu thông tin** (bước 3–4): Hệ thống yêu cầu Buyer bổ sung lý do / mô tả trước khi gửi. |
| **Business Rules** | - Khiếu nại chỉ mở được khi order ở `DELIVERED` và **trong 3 ngày** kiểm tra hàng.<br>- Khi có khiếu nại → **tạm dừng** chuyển `COMPLETED`, **tạm giữ tiền**.<br>- **Chỉ Support Staff** có quyền xử lý và đóng khiếu nại (Buyer/Seller không tự đóng).<br>- Refund (nếu có) về **ví Buyer** (ví nội bộ — F8).<br>- Seller bị trừ uy tín nếu khiếu nại hợp lệ do lỗi Seller (F10). |
| **Đối chiếu SRS** | SRS không mô tả chi tiết dispute flow. Flow hệ thống ghi "Support Staff xử lý khiếu nại / tranh chấp" (Actor). Commerce Service cần thêm API quản lý dispute. |

---

## UC-F1-14: View Order History

| UC SPECIFICATION TEMPLATE | |
|---|---|
| **Use Case Name** | View Order History |
| **Use Case ID** | UC-F1-14 |
| **Actor(s)** | Buyer |
| **Description** | Buyer xem danh sách tất cả đơn hàng của mình, lọc theo trạng thái và thời gian, xem chi tiết từng đơn. |
| **Preconditions** | Buyer đã đăng nhập. |
| **Post conditions** | Buyer xem được danh sách đơn hàng, có thể lọc và xem chi tiết. |
| **Main Flow (Basic Path)** | 1. Buyer truy cập trang **"Đơn hàng của tôi"**.<br>2. Hệ thống hiển thị danh sách đơn hàng (phân trang), mỗi đơn gồm: mã đơn, ngày tạo, trạng thái, tổng tiền, tên sản phẩm.<br>3. Buyer có thể lọc theo:<br>&nbsp;&nbsp;a. **Trạng thái**: Chờ thanh toán / Đã thanh toán / Đang giao / Đã giao / Hoàn tất / Đã huỷ.<br>&nbsp;&nbsp;b. **Thời gian**: Tuần này / Tháng này / Tuỳ chọn khoảng ngày.<br>4. Buyer chọn 1 đơn → hệ thống hiển thị **chi tiết đơn hàng**:<br>&nbsp;&nbsp;a. Danh sách sản phẩm (tên, số lượng, giá, hình).<br>&nbsp;&nbsp;b. Thông tin giao hàng (SĐT, địa chỉ).<br>&nbsp;&nbsp;c. Tổng tiền (tiền hàng + phí ship − giảm giá).<br>&nbsp;&nbsp;d. Lịch sử trạng thái (timeline: tạo đơn → thanh toán → giao → nhận → hoàn tất).<br>&nbsp;&nbsp;e. Mã vận đơn GHN (nếu có — bấm để theo dõi).<br>5. Từ chi tiết đơn, Buyer có thể thực hiện hành động tuỳ trạng thái:<br>&nbsp;&nbsp;- `PENDING_PAYMENT`: Huỷ đơn (→ UC-F1-07 A1) hoặc xem QR thanh toán.<br>&nbsp;&nbsp;- `DELIVERED`: Xác nhận nhận hàng (→ UC-F1-11 A1) hoặc Khiếu nại (→ UC-F1-13).<br>&nbsp;&nbsp;- `COMPLETED`: Đánh giá (→ UC-F1-12). |
| **Alternative Flow** | **A1 — Không có đơn hàng** (bước 2): Hệ thống hiển thị "Bạn chưa có đơn hàng nào". |
| **Exception Flow** | **E1 — Commerce Service không phản hồi** (bước 2): Hệ thống hiển thị lỗi "Không thể tải danh sách đơn hàng", mời Buyer thử lại sau. |
| **Business Rules** | - Buyer chỉ xem được đơn hàng **của mình** (không xem đơn người khác).<br>- Đơn đã huỷ vẫn hiển thị trong lịch sử (đánh dấu "Đã huỷ").<br>- Đơn `COMPLETED` là đơn kết thúc — chỉ xem, không thao tác thêm (trừ đánh giá nếu chưa đánh giá). |
| **Đối chiếu SRS** | SRS Demo Scenario 3 nhắc "View order history". API cần: `GET /api/orders?userId={userId}&status={status}&from={date}&to={date}` → Commerce Service. |

---

## Bảng đối chiếu F1 (Flow) vs SRS gốc

| Chủ đề | Flow chính thức (flow-he-thong.md) | SRS gốc (project-nexus-main-SRS.md) | Ghi chú |
|---|---|---|---|
| **Thanh toán** | Cổng thanh toán Stripe + Stripe webhook tự check | Nhắc Stripe test payment integration | ✅ **Thống nhất**: Chốt cổng thanh toán là **Stripe** (kèm Stripe webhook tự động đối soát), đồng bộ hoàn toàn với SRS gốc. |
| **Order lifecycle** | `PENDING_PAYMENT → PAID → SHIPPING → DELIVERED → COMPLETED` | Không mô tả rõ trạng thái | Flow bổ sung chi tiết hơn. |
| **DELIVERED → COMPLETED** | Chờ **3 ngày** Buyer kiểm tra hàng. Buyer có thể xác nhận sớm. Có khiếu nại → tạm dừng. | Không mô tả | Flow bổ sung — chốt 3 ngày. |
| **Seller chấp nhận đơn** | Bắt buộc — seller bấm chấp nhận mới tạo vận đơn | Không nhắc rõ bước này | Flow bổ sung. |
| **Kho ảo giữ hàng** | Giữ kho ngay khi tạo order (bấm hiện QR) | Không mô tả | Flow bổ sung. |
| **Phí ship** | Tính qua API GHN (địa chỉ seller → buyer) **ở bước checkout**. Bỏ thuế. | Không nhắc GHN | Flow bổ sung. GHN là hãng vận chuyển duy nhất. |
| **Giá hiển thị** | Giá buyer = giá seller + % chiết khấu (admin cấu hình) | Không mô tả cách tính giá | Flow bổ sung quy tắc giá. |
| **Refund** | Khi seller chưa giao → refund về **ví buyer** (không rút, chỉ tiêu) | Không mô tả chi tiết refund | Flow bổ sung. |
| **Huỷ đơn** | Buyer chủ động huỷ trước thanh toán → huỷ ngay + nhả kho | Không mô tả | Flow bổ sung (gộp vào UC-F1-07). |
| **Khiếu nại** | Buyer mở khiếu nại trong 3 ngày sau DELIVERED → Support Staff xử lý | Không mô tả | Flow bổ sung (UC-F1-13 mới). |
| **Đánh giá** | 2 chiều: buyer ↔ seller. Rank (SP + shop) ≠ Uy tín (reputation) | Nhắc reputation score | Flow chi tiết hơn, phân biệt rank vs uy tín. |
| **Guest** | Không thêm giỏ hàng (phải đăng nhập) | Không nhắc guest | Flow bổ sung. |
| **Lịch sử đơn hàng** | Buyer xem danh sách đơn, lọc theo trạng thái/thời gian | Demo Scenario 3 nhắc "View order history" | UC-F1-14 mới. |
| **API Products** | Seller đăng → hiển thị ngay (không duyệt) | `GET /api/products`, `GET /api/products/{id}`, `GET /api/categories` | Tương thích. |
| **API Cart** | Thêm giỏ → checkout → QR | `POST /api/carts/{userId}/items`, `GET /api/carts/{userId}` | Tương thích. |
| **API Order** | Tạo order → payment → accept → ship → deliver → 3 ngày → complete | `POST /api/orders`, `POST /api/orders/{orderId}/checkout` | Tương thích nhưng flow bổ sung nhiều bước hơn SRS. |

---

## Các điểm mở & Quyết định thiết kế liên quan đến F1

| # | Điểm / Quyết định thiết kế | Trạng thái / Phương án chốt | Ảnh hưởng UC |
|---|---|---|---|
| 5 | Cổng thanh toán cụ thể | **ĐÃ CHỐT: Dùng Stripe** (tích hợp Stripe Webhook tự động đối soát, đồng bộ với SRS) | UC-F1-05, UC-F1-06, UC-F1-07 |
| 6 | Cơ chế cộng + trần uy tín | **ĐÃ CHỐT: Tùy vào Admin hoặc Seller quyết định** (hệ thống cung cấp cơ chế cấu hình linh hoạt) | UC-F1-12 |
| — | Thời hạn thanh toán / QR (bao lâu thì quá hạn huỷ order) | Chưa có con số cụ thể (Admin cấu hình hệ thống) | UC-F1-05, UC-F1-07 |
| — | Seller có thời hạn bao lâu để chấp nhận/từ chối đơn | Chưa nêu rõ (Admin cấu hình hệ thống) | UC-F1-08 |
