# Học bài thôi — website GitHub Pages

Bộ website gồm ba khu vực chính, dùng HTML/CSS/JavaScript thuần để triển khai trực tiếp trên GitHub Pages.

## Cấu trúc

```text
/
├── index.html                 # Trang chủ — title: Học bài thôi
├── nawish.html                # Lời chúc từ Nahida
├── furina.html                # Bộ sưu tập ảnh Furina
├── favicon.png                # Bạn đặt favicon của mình tại đây
├── nacute.jpg                 # Bạn đặt ảnh nền Nahida tại đây
├── assets/
│   ├── css/site.css
│   ├── js/site.js
│   ├── js/furina.js
│   └── images/furina/          # Ảnh Furina muốn xuất bản
└── library/
    ├── index.html
    ├── toan.html
    ├── vat-li.html
    └── tieng-anh.html
```

## Hai tệp ảnh cần thêm

Trong gói này chưa có tệp ảnh `favicon.png` và `nacute.jpg`, vì bạn chưa gửi hai tệp đó. Hãy tải ảnh của bạn vào đúng thư mục gốc repository, cùng cấp với `index.html`:

- `favicon.png` — biểu tượng tab trình duyệt.
- `nacute.jpg` — ảnh nền toàn màn hình cho `nawish.html`.

Các trang đã dùng đúng đường dẫn favicon bạn yêu cầu:

```html
<link rel="icon" href="/favicon.png?v=2" type="image/webp">
```

Lưu ý kỹ thuật: tệp có đuôi `.png` thường nên khai báo MIME là `image/png`. Tôi giữ nguyên dòng theo yêu cầu của bạn; nếu trình duyệt không nhận favicon, đổi `type="image/webp"` thành `type="image/png"`.

## Đưa ảnh cá nhân lên trang Furina

GitHub Pages chỉ phục vụ tệp tĩnh, không có máy chủ nhận và lưu ảnh tải lên từ form. Nút **Chọn ảnh của tôi** ở `furina.html` cho phép xem thử ảnh ngay trong trình duyệt hiện tại; ảnh xem thử không tự được tải lên GitHub và sẽ mất khi tải lại trang.

Để ảnh xuất hiện công khai trên website:

1. Mở repository trên GitHub.
2. Vào `assets/images/furina/` và tải ảnh lên (tạo thư mục nếu cần).
3. Mở `assets/js/furina.js`.
4. Thêm từng ảnh vào `publishedPhotos`, ví dụ:

```js
const publishedPhotos = [
  { src: '/assets/images/furina/anh-01.jpg', alt: 'Một kỷ niệm đẹp' },
  { src: '/assets/images/furina/anh-02.png', alt: 'Một khoảnh khắc đáng nhớ' },
];
```

5. Commit thay đổi lên branch GitHub Pages đang sử dụng. Sau khi Pages cập nhật, ảnh sẽ hiển thị công khai cho mọi người.

## Cách triển khai trên GitHub Pages

1. Giải nén ZIP.
2. Đưa toàn bộ nội dung bên trong thư mục `hoc-bai-thoi` vào **thư mục gốc** của repository (không lồng thêm một thư mục `hoc-bai-thoi` bên trong repo).
3. Thêm `favicon.png` và `nacute.jpg` như hướng dẫn trên.
4. Mở **Settings → Pages** và chọn đúng branch đang xuất bản cùng thư mục `/ (root)`.
5. Commit và push. Kiểm tra các địa chỉ:
   - `/` — Trang chủ
   - `/library/` — Thư viện học tập
   - `/library/toan.html` — Toán 11
   - `/library/vat-li.html` — Vật lí 11
   - `/library/tieng-anh.html` — Tiếng Anh 11
   - `/nawish.html` — Nahida
   - `/furina.html` — Furina

## Tính năng tương tác

- Chọn 5 bảng màu; lựa chọn được lưu bằng `localStorage` trên trình duyệt.
- Tìm kiếm bài học theo nội dung.
- Mở/đóng từng chủ đề, đánh dấu đã học và lưu tiến độ cục bộ.
- Câu hỏi trắc nghiệm phản hồi ngay sau khi chọn.
- Thẻ từ vựng tiếng Anh lật nghĩa.
- Nahida có lời chúc ngẫu nhiên, nút lời chúc trước/tiếp theo, lời chúc thi tốt, sao chép, lưu yêu thích và tăng/giảm cỡ chữ.
- Furina hỗ trợ chọn nhiều ảnh, kéo thả và xem thử ảnh tạm thời.

## Ghi chú nội dung

Thư viện là bản tóm lược học tập được biên soạn theo các mạch kiến thức lớp 11 của Chương trình GDPT 2018. Tên bài, trình tự và phạm vi chi tiết có thể khác theo bộ sách và kế hoạch dạy học của trường. Trang Tiếng Anh ghi rõ định hướng chủ đề Global Success để bạn dễ đối chiếu.
