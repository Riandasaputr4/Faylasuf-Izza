document.addEventListener("DOMContentLoaded", function() {
  const kategoriRadios = document.querySelectorAll('input[name="kategori"]');
  const subButtons = document.querySelectorAll('.filter-btn');
  const ebooks = document.querySelectorAll('.ebook-item');

  let selectedCategory = 'semua';
  let selectedSub = 'all';

  // 🔹 Filter kategori dari sidebar kiri
  kategoriRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      selectedCategory = radio.value.toLowerCase();
      filterEbooks();
    });
  });

  // 🔹 Filter subkategori dari tombol atas
  subButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // ubah tampilan tombol aktif
      subButtons.forEach(b => b.classList.remove('active', 'btn-success'));
      subButtons.forEach(b => b.classList.add('btn-outline-success'));
      btn.classList.add('active', 'btn-success');
      btn.classList.remove('btn-outline-success');

      selectedSub = btn.dataset.filter.toLowerCase();
      filterEbooks();
    });
  });

  // 🔹 Fungsi utama filter
  function filterEbooks() {
    ebooks.forEach(ebook => {
      const ebookCategory = (ebook.dataset.category || '').toLowerCase();
      const ebookSub = (ebook.dataset.sub || '').toLowerCase();

      const matchCategory = (selectedCategory === 'semua' || ebookCategory === selectedCategory);
      const matchSub = (selectedSub === 'all' || ebookSub === selectedSub);

      if (matchCategory && matchSub) {
        ebook.classList.remove('d-none');
      } else {
        ebook.classList.add('d-none');
      }
    });
  }

  // 🔹 Jalankan pertama kali
  filterEbooks();
});
