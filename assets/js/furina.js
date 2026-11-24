// Ảnh muốn hiển thị công khai trên website: thêm file vào assets/images/furina/
// rồi khai báo đường dẫn tương ứng trong danh sách bên dưới.
  // { src: '/assets/images/furina/ten-anh-cua-ban.jpg', alt: 'Mô tả ngắn về bức ảnh' },

const publishedPhotos = [
    {
        src: "/assets/images/furina/BirthDay.jpg",
        alt: "Furina Birthday"
    },
    {
        src: "/assets/images/furina/cake.jpg",
        alt: "Furina Birthday Cake"
    },
    {
        src: "/assets/images/furina/Cooking.jpg",
        alt: "Furina Cooking"
    },
    {
        src: "/assets/images/furina/dance.jpg",
        alt: "Furina Dance"
    },
    {
        src: "/assets/images/furina/download%20(1).jpg",
        alt: "Furina Collection 1"
    },
    {
        src: "/assets/images/furina/download%20(2).jpg",
        alt: "Furina Collection 2"
    },
    {
        src: "/assets/images/furina/download%20(3).jpg",
        alt: "Furina Collection 3"
    },
    {
        src: "/assets/images/furina/download%20(4).jpg",
        alt: "Furina Collection 4"
    },
    {
        src: "/assets/images/furina/download.jpg",
        alt: "Furina Collection"
    },
    {
        src: "/assets/images/furina/EsFocalor.png",
        alt: "Es Focalors"
    }
];

(() => {
  const input = document.getElementById('photo-input');
  const choose = document.getElementById('choose-photos');
  const zone = document.getElementById('drop-zone');
  const grid = document.getElementById('gallery-grid');
  const count = document.getElementById('gallery-count');
  const temporaryUrls = [];

  const makeCard = (src, alt, temporary = false, filename = '') => {
    const figure = document.createElement('figure');
    figure.className = 'photo-card';
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt || 'Ảnh trong bộ sưu tập';
    img.loading = 'lazy';
    const caption = document.createElement('figcaption');
    caption.textContent = filename || alt || 'Furina';
    figure.append(img, caption);
    if (temporary) {
      const remove = document.createElement('button');
      remove.className = 'photo-remove';
      remove.type = 'button';
      remove.textContent = 'Bỏ ảnh';
      remove.addEventListener('click', () => {
        URL.revokeObjectURL(src);
        figure.remove();
        updateCount();
        if (!grid.querySelector('.photo-card')) showEmpty();
      });
      figure.appendChild(remove);
    }
    grid.appendChild(figure);
  };

  const showEmpty = () => {
    if (grid.querySelector('.photo-empty')) return;
    const empty = document.createElement('div');
    empty.className = 'photo-empty';
    empty.style.gridColumn = '1/-1';
    empty.innerHTML = '<div><strong>Không gian dành cho những bức ảnh của bạn</strong>Chọn ảnh ở phía trên để xem thử, hoặc thêm ảnh vào thư mục website để xuất bản lâu dài.</div>';
    grid.appendChild(empty);
  };
  const updateCount = () => {
    const total = grid.querySelectorAll('.photo-card').length;
    count.textContent = total ? `${total} ảnh trong bộ sưu tập · Ảnh xem thử sẽ mất khi tải lại trang.` : 'Chưa có ảnh được thêm vào.';
  };
  const acceptFiles = files => {
    const selected = [...files].filter(file => file.type.startsWith('image/'));
    if (!selected.length) return;
    grid.querySelector('.photo-empty')?.remove();
    selected.forEach(file => {
      const url = URL.createObjectURL(file);
      temporaryUrls.push(url);
      makeCard(url, file.name, true, file.name);
    });
    updateCount();
  };
  choose.addEventListener('click', () => input.click());
  input.addEventListener('change', event => { acceptFiles(event.target.files); input.value = ''; });
  ['dragenter', 'dragover'].forEach(name => zone.addEventListener(name, event => {
    event.preventDefault(); zone.classList.add('dragover');
  }));
  ['dragleave', 'drop'].forEach(name => zone.addEventListener(name, event => {
    event.preventDefault(); zone.classList.remove('dragover');
  }));
  zone.addEventListener('drop', event => acceptFiles(event.dataTransfer.files));

  publishedPhotos.forEach(photo => makeCard(photo.src, photo.alt, false));
  if (!publishedPhotos.length) showEmpty();
  updateCount();
  window.addEventListener('beforeunload', () => temporaryUrls.forEach(URL.revokeObjectURL));
})();
