# Flow Hệ Thống — Project Nexus (bản cuối)

> **Tài liệu flow hệ thống chính thức** — bản mới, sạch, không tham chiếu số mục SRS.
> Nguồn: [[hieu-biet-he-thong]] (tầng 2 — câu trả lời của chủ dự án).
> Chỉ mô tả **nghiệp vụ thật**. Nơi nào chủ dự án chốt **khác** docx thì file này **theo chủ dự án**.

---

## 1. Hệ thống là gì

Nền tảng **TMĐT + đấu giá online**:

- **Seller** đăng bán / đưa đấu giá, tự giữ hàng, rút tiền.
- **Buyer** mua thường / đấu giá, nạp ví, thanh toán.
- **Admin** duyệt seller, cấu hình hệ thống, quản lý user.
- **Support Staff** xử lý khiếu nại / tranh chấp.

Thanh toán **chỉ chuyển khoản ngân hàng** — hệ thống **tự check tiền vào qua webhook** cổng thanh toán.

---

## 2. Actor

| Actor | Vai trò |
|---|---|
| **Buyer** | Tìm hàng, mua thường / đấu giá, nạp ví, thanh toán, đánh giá |
| **Seller** | Đăng SP (hiển thị ngay), quản lý kho, nhận + chấp nhận đơn, rút tiền |
| **Admin** | Duyệt seller, cấu hình hệ thống (chiết khấu, uy tín), ban/xoá user, xem dashboard |
| **Support Staff** | Xử lý khiếu nại / tranh chấp |
| **External System** | Ngân hàng / cổng thanh toán (webhook), **GHN** (vận chuyển) |

---

## 3. Kiến trúc (tóm)

- **6 service, 6 DB riêng:** User · Catalog · Commerce · Auction · Fulfillment · Notification.
- Mỗi service 1 bounded context, **không share DB**, giao tiếp qua **API + event**.

---

## 4. Các flow chính (F1–F4)

> **Chỉ 4 luồng chính** (bắt buộc 2 tháng — `Q28`): Mua thường, Mua đấu giá, Bán thường, Bán đấu giá.
> Tất cả flow còn lại (F5–F12) là **phụ trợ**.

| # | Flow | Ai | Bản chất |
|---|---|---|---|
| **F1** | Mua hàng thường | Buyer | Tìm → giỏ → checkout → chuyển khoản → nhận hàng |
| **F2** | Mua hàng đấu giá | Buyer | Xem → bid → thắng → chuyển khoản 24h → nhận hàng |
| **F3** | Bán hàng thường | Seller | Tạo SP → nhập kho → nhận đơn → giao → rút tiền |
| **F4** | Đưa hàng đấu giá | Seller | Tạo phiên → giữ kho → chốt winner → giao |

---

### F1 — Mua hàng thường (Buyer)

```
1. Buyer tìm sản phẩm → xem chi tiết
2. Thêm vào giỏ hàng (phải đăng nhập) → tính tổng tiền (giá + phí ship GHN, bỏ thuế)
3. Checkout: điền SĐT, địa chỉ nhận
4. Bấm "hiện QR thanh toán" → hệ thống TẠO ORDER (chờ thanh toán) + kho ảo GIỮ 1 sản phẩm
5. Buyer chuyển khoản (ngoài hệ thống)
6. Webhook cổng thanh toán tự check (đúng nội dung + đúng số tiền)
     ├─ khớp     → order PAID → kho trừ thẳng
     └─ quá hạn  → huỷ order + nhả kho
7. Seller nhận thông báo → bấm "chấp nhận đơn"
     ├─ chấp nhận      → GHN tạo vận đơn → giao hàng
     └─ không chấp nhận → refund về ví buyer
8. GHN tự cập nhật DELIVERED → buyer nhận hàng
9. Đơn hoàn tất → tiền vào ví seller (trừ % chiết khấu nền tảng)
10. Buyer đánh giá sản phẩm (→ rank shop + sản phẩm) + đánh giá seller; seller đánh giá ngược lại buyer
```

---

### F2 — Mua hàng đấu giá (Buyer)

```
1. Buyer xem phiên đấu giá (đang diễn ra)
2. Đặt giá (cần uy tín ≥ ngưỡng admin cấu hình — mặc định 40)
3. Bị vượt giá → nhận thông báo → đặt tiếp
4. Bid sát giờ kết thúc → hệ thống gia hạn thêm 5 phút
5. Kết thúc → hệ thống xác định người thắng (giá cao nhất)
6. Thắng → nhận mail → chuyển khoản trong 24 giờ → webhook tự check
     ├─ khớp     → tạo đơn → seller chấp nhận → giao hàng
     └─ quá 24h  → huỷ order đấu giá + phạt (mức admin cấu hình)
7. Không thắng → kết thúc
```

---

### F3 — Bán hàng thường (Seller)

```
1. Seller đăng SP → hiển thị ngay (không cần duyệt)
2. Nhập / điều chỉnh kho ảo (chủng loại + số lượng, bổ sung thêm được)
3. Buyer mua (F1) → seller nhận thông báo đơn đã thanh toán
4. Seller bấm "chấp nhận đơn" → GHN tạo vận đơn (không chấp nhận → refund buyer)
5. Lấy hàng → đóng gói → giao
6. Đơn hoàn tất → tiền vào ví seller (trừ % chiết khấu nền tảng)
7. Seller tạo lệnh rút tiền → admin/staff duyệt → chuyển thủ công
```

---

### F4 — Đưa hàng đấu giá (Seller)

```
1. Seller tạo phiên đấu giá (uy tín ≥ ngưỡng admin cấu hình — mặc định 50)
2. Chọn thời gian (đặt lịch tối đa trước 30 ngày) + giá khởi điểm
3. Hệ thống giữ kho cho phiên (chống bán trùng)
4. Chỉ sửa phiên trước khi bắt đầu
5. Phiên bắt đầu → nhận bid từ buyer (F2)
6. Kết thúc → xác định người thắng → tạo đơn → thanh toán → giao
7. Không ai bid → phiên thất bại, nhả kho
8. Huỷ phiên chỉ khi chưa có bid (đã có bid → chỉ admin huỷ)
```

---

## 5. Flow phụ trợ (F5–F12)

### F5 — Đăng ký & đăng nhập (User)

```
1. Đăng ký tài khoản → mặc định Buyer → xác thực email
   (đăng ký seller riêng → admin duyệt + giấy tờ)
2. Đăng nhập (sai quá 5 lần → khoá tạm)
3. Quên mật khẩu → đặt lại
4. Đăng xuất
```

---

### F6 — Quản lý user & phân quyền (Admin)

```
1. Admin tạo / sửa / xoá user (xoá mềm, không khôi phục)
2. Ban user vi phạm → xem danh sách bị ban → unban được
3. Tạo / gán role + quyền (4 role cố định: Buyer, Seller, Admin, Support Staff)
4. Quản lý danh mục; ẩn/xoá sản phẩm vi phạm (moderation)
5. Cấu hình hệ thống (% chiết khấu, ngưỡng uy tín)
```

---

### F7 — Thanh toán & xác nhận tiền vào

1. Mọi giao dịch **1 phương thức**: chuyển khoản ngân hàng.
2. Checkout → **bấm hiện QR** → hệ thống **tạo order (chờ thanh toán)** + **giữ kho ảo**.
3. Buyer chuyển khoản → **webhook cổng thanh toán tự check** (đúng nội dung + số tiền).
   - Khớp → **PAID**, kho trừ thẳng.
   - Quá hạn chưa chuyển → **huỷ order + nhả kho** (mua thường) / **huỷ + phạt** (đấu giá).
4. **Refund** khi seller chưa giao → **về ví buyer** (không rút, chỉ tiêu).

### F8 — Ví tiền & rút tiền

1. Hệ thống ví nội bộ cho **cả buyer và seller**.
2. **Buyer:** nạp tiền vào ví → dùng để thanh toán; nhận **refund** vào ví; **không rút**.
3. **Seller:** tiền vào ví khi **đơn hoàn tất** (giao xong).
4. Cả 2 xem **số dư + lịch sử biến động** ví.
5. Seller **tạo lệnh rút tiền** → **admin/staff duyệt** → **chuyển khoản thủ công** về ngân hàng seller.

### F9 — Mã giảm giá (Khuyến mãi)

1. **Toàn hệ thống** — Admin tạo.
2. **Theo cửa hàng** — Seller tạo (giảm cho đơn trong shop).
3. **Theo sản phẩm** — Seller tạo (giảm cho từng SP trong shop).
4. Buyer **áp mã khi checkout** → trừ vào tổng tiền.

### F10 — Đánh giá & uy tín (các khái niệm riêng)

1. **Đánh giá giao dịch (rating & review)** — sau giao dịch, **buyer đánh giá seller** và **seller đánh giá ngược lại buyer** (2 chiều).
2. **Rank** — từ **đánh giá sản phẩm** → tính rank cho **cửa hàng (= seller) + sản phẩm**, dùng để **hiển thị + lọc** (không có rank cho buyer).
3. **Uy tín (reputation)** — dùng để **chặn bid/bán** (ngưỡng admin cấu hình) + **hiển thị**.
   - Buyer mua thành công → cộng uy tín.
   - Seller bán xong + không bị khiếu nại → cộng uy tín.
   - Trần / mức hạn chế do hệ thống tự định nghĩa (chốt sau).
4. Vi phạm → phạt / đình chỉ (admin).

### F11 — Vận chuyển (GHN)

1. Checkout → hệ thống **báo phí ship** (gọi API GHN theo địa chỉ seller + buyer).
2. Order **PAID** → seller **bấm chấp nhận đơn** → hệ thống **tạo vận đơn** GHN.
3. GHN tự cập nhật trạng thái → hệ thống **đồng bộ**.
4. Buyer/seller **theo dõi** trạng thái (GHN tự cập nhật là đủ).

### F12 — Báo cáo & Dashboard

1. **Admin** xem dashboard tổng quan, biểu đồ **dòng tiền**, thống kê **lợi nhuận** (hướng: hệ thống, tiền, lợi nhuận, người dùng).
2. **Seller** xem thống kê **số đơn, số tiền thu, lợi nhuận, doanh thu** theo **ngày / tháng / năm**.

---

## 6. Quy tắc nghiệp vụ cốt lõi

| Chủ đề | Quy tắc đã chốt |
|---|---|
| **Thanh toán** | Chỉ chuyển khoản. Webhook tự check tiền vào. Order tạo **trước** thanh toán (lúc hiện QR) + giữ kho. Bỏ thuế. |
| **Refund** | Có — khi seller chưa giao cho vận chuyển; về **ví buyer**. Đấu giá refund vẫn **bị phạt**. |
| **Ví** | Cả buyer + seller. Buyer không rút, seller rút thủ công (lệnh → duyệt → chuyển). |
| **Giá** | Giá buyer thấy = giá seller đặt + **% chiết khấu** (admin cấu hình). Seller nhận đúng giá mình đặt. |
| **Đấu giá** | Không cọc. Thắng → mail → 24h. Quá hạn → huỷ order + phạt. Đặt lịch tối đa 30 ngày. Anti-sniping 5 phút. |
| **Uy tín** | Ngưỡng bid/bán **admin cấu hình** (mặc định 40/50). Uy tín ≠ rank. |
| **Kho** | Seller tự giữ hàng, tự khai kho ảo, bổ sung thêm được. |
| **Sản phẩm** | Seller đăng là **hiển thị ngay** (không cần duyệt); admin ẩn/xoá khi vi phạm. |
| **Vận chuyển** | 1 hãng (GHN). Vận đơn tạo **sau khi seller chấp nhận đơn**. |
| **User** | Tự đăng ký → Buyer; seller đăng ký riêng cần duyệt + giấy tờ. 4 role cố định. Xoá mềm, ban unban được. |
| **Guest** | Khách chưa đăng nhập **không** thêm giỏ hàng. |

**Bộ trạng thái order:** `PENDING_PAYMENT → PAID → SHIPPING → DELIVERED → COMPLETED`.

---

## 7. Điểm còn mở (chưa chốt — hỏi user khi cần)

1. **Logout** — vô hiệu refresh token hay chỉ clear access token.
2. **Quên mật khẩu** — token qua email hay cách khác.
3. **Đánh giá** — một giao dịch đánh giá được mấy lần.
4. **Event log** — lưu bao lâu.
5. **Cổng thanh toán cụ thể** — SePay / Stripe / bên khác.
6. **Cơ chế cộng + trần uy tín** — hệ thống tự định nghĩa, chưa có con số.
7. **Giấy tờ đăng ký seller** — chi tiết do team DB đảm nhận.

---

## Liên hệ

- [[hieu-biet-he-thong]] — tầng 2: nguồn nghiệp vụ chính thức (52 câu trả lời).
- [[main _flow]] · [[SCOPE]] · [[scope-he-thong]] — các bản flow/scope cũ (để đối chiếu).
