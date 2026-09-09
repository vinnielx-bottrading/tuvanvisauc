# TƯ VẤN VISA AUSTRALIA Visa 482–186 – GitHub + Vercel

## 1) Cấu trúc

- `index.html`: website + form kê khai + tạo PDF phía trình duyệt.
- `api/submit.js`: Vercel Serverless Function gửi email có PDF đính kèm.
- `package.json`: cấu hình tối thiểu.

## 2) Cấu hình Vercel Environment Variables

Tạo các biến sau trong Vercel → Project → Settings → Environment Variables:

- `RESEND_API_KEY` = API key của Resend.
- `RECIPIENT_EMAIL` = `vinnielx@gmail.com`
- `MAIL_FROM` = email sender đã được xác minh trên Resend, ví dụ `TƯ VẤN VISA AUSTRALIA <noreply@yourdomain.com>`.

Nếu chưa có `MAIL_FROM`, API sẽ dùng sender thử nghiệm `TƯ VẤN VISA AUSTRALIA Website <onboarding@resend.dev>`; để dùng domain riêng, hãy xác minh domain trên Resend trước.

## 3) Deploy

1. Tạo repository GitHub.
2. Upload toàn bộ thư mục này.
3. Import repository vào Vercel.
4. Khai báo Environment Variables ở trên.
5. Redeploy.

## 4) Luồng hoạt động

Khách bấm `✉️ Gửi hồ sơ tư vấn` → trình duyệt tạo PDF từ toàn bộ bảng kê khai hiện tại → gửi PDF lên `/api/submit` → Vercel gọi Resend → email được gửi tới `vinnielx@gmail.com` với PDF đính kèm.

## 5) Lưu ý

Không đặt `RESEND_API_KEY` trực tiếp trong `index.html`. Key phải nằm trong Vercel Environment Variables.
