<template>
  <div>
    <!-- Tutorial Panel -->
    <div v-if="isTutorialVisible" class="tutorial-overlay animate__animated animate__fadeIn">
      <div class="tutorial-box animate__animated animate__bounceIn">
        <!-- Character Image -->
        <div class="character-image">
          <img src="../assets/anime.gif" alt="Character" />
        </div>

        <!-- Chatbox -->
        <div class="chat-box">
          <div class="chat-message">
            <p>Chào mừng bạn đến với thư viện sách ! Đây là nơi bạn có thể xem và mượn nhiều loại sách hay.</p>
            <p>Nhấn vào nút dưới để bắt đầu.</p>
          </div>
        </div>

        <!-- Close Button -->
        <button @click="startUsingApp" class="btn-start animate__animated animate__pulse">Bắt đầu</button>
      </div>
    </div>

    <!-- Main Content -->
    <Header />
    <button class="toggle-sidebar-btn" @click="toggleSidebar">
      <i :class="isSidebarVisible ? 'fas fa-times' : 'fas fa-bars'"></i>
      {{ isSidebarVisible ? 'Đóng Sidebar' : 'Mở Sidebar' }}
    </button>
    <Sidebar v-if="isSidebarVisible" @addBook="showAddBookPanel" @editBook="editBook" @deleteBook="deleteBook"
      @borrowBook="borrowBook" @filterBooks="filterBooks" />
    <div v-if="!isSidebarVisible" class="sidebar-placeholder"></div>

    <!-- No Books Message -->
    <div v-if="books.length === 0" class="no-books">
      <p>Hiện không có sách trong danh sách.</p>
      <img src="https://i.pinimg.com/originals/fb/77/1c/fb771c77975d0914afd5c382595d6ea6.gif " width="300px">
    </div>

    <!-- Book List -->
    <BookList v-else :books="books" @selectBook="selectBook" />

    <!-- Add Book Panel -->
    <div v-if="isAddBookPanelVisible" class="overlay animate__animated animate__fadeIn">
      <AddBook @addBook="addBook" @closePanel="closeAddBookPanel" />
    </div>

    <!-- Edit Book Panel -->
    <div v-if="isEditBookPanelVisible" class="overlay animate__animated animate__fadeIn">
      <EditBook :book="selectedBook" @saveEdit="saveEditBook" @closeEdit="closeEditBookPanel" />
    </div>

    <Footer />

    <!-- Modal Confirm -->
    <div v-if="showModal" class="modal-overlay animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <div
          v-if="modalMessage === 'Vui lòng chọn sách để sửa.' || modalMessage === 'Vui lòng chọn sách để xóa.' || modalMessage === 'Vui lòng chọn sách để mượn.'"
          class="modal-image">
          <img src="../assets/noti.gif" alt="Alert Image" />
        </div>
        <h3>{{ modalMessage }}</h3>
        <div class="modal-buttons">
          <button @click="confirmAction">OK</button>
        </div>
      </div>
    </div>

    <!-- Success Panel -->
    <div v-if="showSuccessPanel" class="modal-overlay animate__animated animate__fadeIn">
      <div class="modal-content animate__animated animate__zoomIn">
        <h3>{{ successMessage }}</h3>
        <div class="modal-buttons">
          <button @click="closeSuccessPanel">OK</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../components/HeaderQuanlySach.vue";
import Footer from "../components/FooterQuanlySach.vue";
import Sidebar from "../components/Sidebar.vue";
import BookList from "../components/Booklist.vue";
import AddBook from "../components/AddBook.vue";
import EditBook from "../components/Editbook.vue";

export default {
  name: "MainView",
  components: { Header, Footer, Sidebar, BookList, AddBook, EditBook },
  data() {
    return {
      isSidebarVisible: true,
      books: [],
      allBooks: [],
      selectedBookId: null,
      showModal: false,
      modalMessage: "",
      actionToConfirm: null,
      isAddBookPanelVisible: false,
      isEditBookPanelVisible: false,
      selectedBook: null,
      isTutorialVisible: true,
      showSuccessPanel: false,  // New property to show success panel
      successMessage: "",       // Message for success panel
    };
  },
  mounted() {
    if (!localStorage.getItem("books")) {
      const sampleBooks = [
        { id: 1, title: "Doremon tập 23", author: "FuJIKO F FuJIO ", category: "Truyện Manga", year: 2022, status: "Còn sách", image: "https://i.pinimg.com/474x/87/2e/26/872e26dd3703cf629c656720b8695868.jpg" },
        { id: 2, title: "Dragon Ball Super tập 1", author: "Akira Toriyama", category: "Truyện Manga", year: 2023, status: "Đã mượn", image: "https://i.pinimg.com/736x/ed/ba/12/edba12e77540d7f7e3fb037a1ebcdbe5.jpg" },
        { id: 3, title: "Hunter X Hunter  tập 4", author: "Togashi Yoshihiro", category: "Truyện Mangga", year: 2019, status: "Hư hỏng", image: "https://i.pinimg.com/736x/74/1f/59/741f592b0acef332bf9deaa6218d9049.jpg" },
        { id: 4, title: "Kimetsu No yaiba tập 12", author: "Gotoge Koyoharu", category: "Thể loại Manga", year: 2020, status: "Còn sách", image: "https://i.pinimg.com/736x/4a/02/4a/4a024a1dd75ea0ce6b0036f0cf3b1a45.jpg" },
        { id: 86, title: "Doraemon Tập 1", author: "Fujiko F. Fujio", category: "Truyện Manga", year: 1970, status: "Còn sách", image: "https://i.pinimg.com/736x/88/ce/8e/88ce8eafa3ffb893570cf2cf274857dc.jpg" },
        { id: 5, title: "Thám tử Lừng danh CONAN", author: "GOSO AOYAMA", category: "Truyện Manga", year: 2001, status: "Còn sách", image: "https://i.pinimg.com/736x/7b/cf/6e/7bcf6e66236776f3f89a8e9edd654f0a.jpg" },
        { id: 10, title: "Kimetsu No yaiba tập 14", author: "Gotoge Koyoharu", category: "Truyện Manga", year: 2020, status: "Còn sách", image: "https://i.pinimg.com/736x/be/6d/37/be6d376727f3d11d7f49ce8d4069d38b.jpg" },
        { id: 15, title: "Doremon tập 44", author: "FUJIKO F FuJIO ", category: "Truyện tranh", year: 2022, status: "Còn sách", image: "https://i.pinimg.com/736x/22/fc/4c/22fc4c72895d331f392bd02427893b8f.jpg" },
        { id: 20, title: "Chú thuật hồi chiến tập 1", author: "TAkutami Gege", category: "Truyện Manga", year: 2020, status: "Còn sách", image: "https://i.pinimg.com/736x/e8/bb/c4/e8bbc4419fc5531cc10a7e14596e8c9c.jpg" },
        { id: 94, title: "Em Học Lập Trình Scratch", author: "Mathew Hingland", category: "Sách Lập Trình", year: 2020, status: "Còn sách", image: "https://i.pinimg.com/736x/fc/80/3b/fc803ba4855018e00a49111ab30287f2.jpg" },
        { id: 95, title: "Clean Code", author: "Robert Martin", category: "Sách Lập Trình", year: 2020, status: "Còn sách", image: "https://i.pinimg.com/474x/bd/17/20/bd1720e504efe298254fbb9725571084.jpg" },
        { id: 96, title: "Học Như siêu nhân tư duy", author: "Ian Gilbert", category: "Sách Hướng dẫn", year: 2021, status: "Còn sách", image: "https://i.pinimg.com/736x/2d/2f/93/2d2f93e80f602c23582947b3b4103bf1.jpg" },
        { id: 96, title: "Danh Nhân Thế Giới - LINCOLN", author: "Publishing Company", category: "Truyện danh nhân", year: 2023, status: "Hư hỏng", image: "https://i.pinimg.com/736x/49/27/4f/49274fa6790c8c976faf9c2575b50469.jpg" },
        { id: 30, title: "Dragon Ball Super tập 15", author: "Akira Toriyama", category: "Truyện Manga", year: 2023, status: "Đã mượn", image: "https://i.pinimg.com/enabled_lo_mid/736x/60/1b/90/601b90e64e522854e663d5a31d8b1ba0.jpg" },
        { id: 6, title: "Đắc Nhân Tâm", author: "Dale Carnegie", category: "Phát triển bản thân", year: 1936, status: "Còn sách", image: "https://i.pinimg.com/736x/1c/22/df/1c22df7132ad8f1358688b23831e9eaf.jpg" },
        { id: 7, title: "Bóc Phốt Tài Chính", author: "Nguyễn Trọng Nhân", category: "Tài chính", year: 2021, status: "Còn sách", image: "https://i.pinimg.com/236x/b5/4d/3a/b54d3a23fd5847ccb59632aef5d02be3.jpg" },
        { id: 8, title: "10 Điều Khác Biệt Nhất Giữa Kẻ Giàu & Người Nghèo", author: "Keith Cameron Smith", category: "Phát triển bản thân", year: 2015, status: "Đã mượn", image: "https://i.pinimg.com/236x/62/49/da/6249daffcfb12ca37d9d61580122ed08.jpg" },
        { id: 9, title: "Đời Đơn Giản Khi Ta Đơn Giản", author: "Xuân Nguyễn", category: "Phát triển bản thân", year: 2018, status: "Còn sách", image: "https://i.pinimg.com/236x/b5/30/e8/b530e88b59480adca27d69dc5b328370.jpg" },
        { id: 87, title: "Khởi Nghiệp: Con Đường Duy Nhất Giúp Bạn Giàu Có", author: "Lê Quang", category: "Kinh doanh", year: 2020, status: "Hư hỏng", image: "https://i.pinimg.com/736x/4e/13/ce/4e13ce13db6816458315175d314fe2b3.jpg" },
        { id: 11, title: "Cha Giàu Cha Nghèo", author: "Robert T. Kiyosaki", category: "Kinh tế", year: 2000, status: "Đã mượn", image: "https://i.pinimg.com/236x/00/e6/78/00e6788c1b3cdbed67dc675faea416b1.jpg" },
        { id: 12, title: "Những Phương Thức Phục Hồi Sức Khỏe Theo Tự Nhiên", author: "Nishi Katsuzo", category: "Sức khỏe", year: 2019, status: "Còn sách", image: "https://i.pinimg.com/236x/36/e0/b4/36e0b4352cb1eae1267e5afc33d86b25.jpg" },
        { id: 13, title: "Đánh Thức Con Người Phi Thường Trong Bạn", author: "Anthony Robbins", category: "Phát triển bản thân", year: 1991, status: "Còn sách", image: "https://i.pinimg.com/236x/8b/63/68/8b63688ea187bd2170ea4ba7b653a0e7.jpg" },
        { id: 14, title: "Tư Duy Quản Lý Mới Trong Thời Đại VUCA", author: "Fukushige Hiroshi", category: "Quản lý", year: 2022, status: "Hư hỏng", image: "https://i.pinimg.com/736x/e0/9e/44/e09e442b81ca1770568288867f921007.jpg" },
        { id: 88, title: "Bí Mật Tư Duy Triệu Phú", author: "T. Harv Eker", category: "Kinh tế", year: 2005, status: "Đã mượn", image: "https://i.pinimg.com/236x/45/5c/fc/455cfce18c30487c01a3aec75addfc37.jpg" },
        { id: 16, title: "Điềm Tĩnh Làm Cha", author: "Kelvin Ang", category: "Gia đình", year: 2019, status: "Còn sách", image: "https://i.pinimg.com/236x/4d/32/cb/4d32cb9f6ebf62aff76e457430cf1427.jpg" },
        { id: 17, title: "Sức Mạnh Của Sự Tử Tế", author: "Linda.Thaler &  Koval", category: "Kỹ năng sống", year: 2015, status: "Còn sách", image: "https://i.pinimg.com/236x/2d/66/48/2d66483aeeeff7c61be973a0c1a582d4.jpg" },
        { id: 18, title: "Cứ Đi Để Lối Thành Đường", author: "Phoenix Ho", category: "Hướng nghiệp", year: 2020, status: "Hư hỏng", image: "https://i.pinimg.com/236x/3d/99/a9/3d99a9a43e1286c716cb62199c5780d8.jpg" },
        { id: 19, title: "Nghệ Thuật Bán Hàng Của Người Hướng Nội", author: "Pollard , Lewis", category: "Kinh doanh", year: 2019, status: "Đã mượn", image: "https://i.pinimg.com/236x/8f/64/1b/8f641b57b7e64a3de49329485aef80f7.jpg" },
        { id: 89, title: "Đọc Nhanh, Hiểu Sâu, Nhớ Lâu Trọn Đời", author: "Atsushi Innami", category: "Phát triển bản thân", year: 2021, status: "Còn sách", image: "https://i.pinimg.com/236x/ab/e3/c6/abe3c632da98407786cf57ae7462d755.jpg" },
        { id: 21, title: "Đời Ngắn Đừng Ngủ Dài", author: "Robin Sharma", category: "Tạo động lực", year: 2017, status: "Còn sách", image: "https://i.pinimg.com/236x/d2/0f/e4/d20fe4f60c88344e175b14c3856618a6.jpg" },
        { id: 22, title: "Tự Học Đột Phá: Chuyên Đề Đọc Hiểu Tiếng Anh", author: "Hoàng Bảo", category: "Ngôn ngữ", year: 2020, status: "Đã mượn", image: "https://i.pinimg.com/236x/e9/e7/81/e9e7812b1760378da7cb2c1b4138c171.jpg" },
        { id: 23, title: "Sức Mạnh Của Ngôn Từ", author: "Don Gabor", category: "Kỹ năng giao tiếp", year: 2010, status: "Hư hỏng", image: "https://i.pinimg.com/236x/28/ae/2a/28ae2a3fb334d62903faeca8d9710376.jpg" },
        { id: 24, title: "Sức Mạnh Của Hiện Tại", author: "Eckhart Tolle", category: "Tâm lý học", year: 1997, status: "Còn sách", image: "https://i.pinimg.com/236x/c2/b3/cb/c2b3cbcfa246d7f760a03f30da4fae98.jpg" },
        { id: 90, title: "Hướng Nội", author: "Susan Cain", category: "Tâm lý học", year: 2012, status: "Đã mượn", image: "https://i.pinimg.com/236x/2e/4a/2c/2e4a2c224269a931daeb3e49770af0a0.jpg" },
        { id: 26, title: "Tư Duy Tích Cực: Bạn Chính Là Những Gì Bạn Nghĩ!", author: "Trish Summerfield ", category: "Phát triển bản thân", year: 2014, status: "Còn sách", image: "https://i.pinimg.com/236x/ca/b2/e9/cab2e91c1d0f187fc2b29b5cd2f1c858.jpg" },
        { id: 27, title: "Nói Chuyện Là Bản Năng, Giữ Miệng Là Tu Dưỡng, Im Lặng Là Trí Tuệ", author: "Trương Tiểu Hãn", category: "Kỹ năng giao tiếp", year: 2019, status: "Còn sách", image: "https://i.pinimg.com/236x/27/ce/5e/27ce5e9b60e9936d896be2aecb5d84f7.jpg" },
        { id: 28, title: "Sức Mạnh Của Thói Quen", author: "Charles Duhigg", category: "Tâm lý học", year: 2012, status: "Đã mượn", image: "https://i.pinimg.com/236x/c5/b9/7b/c5b97b693ebd808d185cb0d4de501afd.jpg" },
        { id: 29, title: "Mỗi Ngày Một Bài Học", author: "Matsushita Konosuke", category: "Kinh doanh", year: 2020, status: "Hư hỏng", image: "https://i.pinimg.com/236x/51/2c/a8/512ca8dd7bd5f9e59665d445fb968244.jpg" },
        { id: 91, title: "Hãy Khiến Tương Lai Biết Ơn Vì Hiện Tại Bạn Đã Cố Gắng Hết Mình", author: "Sưu tầm", category: "Tạo động lực", year: 2021, status: "Còn sách", image: "https://i.pinimg.com/236x/54/05/76/540576801ceb9e83020520806bbde39f.jpg" },
        { id: 31, title: "Kỷ Luật Bản Thân", author: "Dawson & Guare", category: "Phát triển bản thân", year: 2018, status: "Đã mượn", image: "https://i.pinimg.com/236x/67/a8/bc/67a8bc0560b8702ca95313494b883bd7.jpg" },
        { id: 32, title: "Tư Duy Tích Cực: Bạn Chính Là Những Gì Bạn Nghĩ!", author: "Trish Summerfield ", category: "Tâm lý học", year: 2014, status: "Còn sách", image: "https://i.pinimg.com/236x/5d/38/34/5d3834e23e082d426575a34c8b8a07dc.jpg" },
        { id: 33, title: "Đặt Tên Cho Thương Hiệu", author: "Jacky Tai", category: "Kinh doanh", year: 2017, status: "Hư hỏng", image: "https://i.pinimg.com/236x/8e/73/dd/8e73dd1a15dd8f95255e4fe5420aa53b.jpg" },
        { id: 34, title: "Phương Pháp Học Tập Không Giới Hạn", author: "Jim Kwik", category: "Kỹ năng sống", year: 2020, status: "Đã mượn", image: "https://i.pinimg.com/474x/6f/87/d8/6f87d8eae69801cc0f00425e752b54d7.jpg" },
        { id: 35, title: "Toán Học Một Thiên Tiểu Thuyết", author: "Mickaël Launay", category: "Khoa học", year: 2019, status: "Còn sách", image: "https://i.pinimg.com/236x/bb/f2/db/bbf2db97f0f68a55982c40ad23495517.jpg" },
        { id: 36, title: "21 Bài Học Cho Thế Kỷ 21", author: "Yuval Noah Harari", category: "Tri thức", year: 2018, status: "Còn sách", image: "https://i.pinimg.com/236x/e1/fb/86/e1fb867ed25d77be1f9503e572c0973c.jpg" },
        { id: 37, title: "Đạo Lý Làm Người", author: "Lý Thạc", category: "Tâm lý học", year: 2011, status: "Còn sách", image: "https://i.pinimg.com/236x/ff/4a/dd/ff4add9d02e81f4d27abf635aa1f453c.jpg" },
        { id: 38, title: "Tâm Lý Học Về Tiền", author: "Morgan Housel", category: "Kinh tế", year: 2020, status: "Đã mượn", image: "https://i.pinimg.com/236x/81/5c/1f/815c1f988fe12affc487f854f62121aa.jpg" },
        { id: 39, title: "Thuyết Sao Cho Phục", author: "Susan M. Weinschenk", category: "Giao tiếp", year: 2019, status: "Còn sách", image: "https://i.pinimg.com/236x/7e/a7/e1/7ea7e141530f230547164a1f7f172d77.jpg" },
        { id: 40, title: "100 Ý Tưởng PR Tuyệt Hay", author: "Jim Blythe", category: "Kinh doanh", year: 2015, status: "Hư hỏng", image: "https://i.pinimg.com/236x/49/fb/44/49fb44d7484d58d55e6faf03a736341d.jpg" },
        { id: 41, title: "Không Ai Có Thể Làm Bạn Tổn Thương Trừ Khi Bạn Cho Phép", author: "Yoo Eun Jung", category: "Tạo động lực", year: 2018, status: "Còn sách", image: "https://i.pinimg.com/236x/3d/14/26/3d1426a00dabc810d51fe1a03058e8c7.jpg" },
        { id: 42, title: "Nghệ Thuật Giao Tiếp Để Thành Công", author: "Leil Lowndes", category: "Giao tiếp", year: 2003, status: "Đã mượn", image: "https://i.pinimg.com/236x/25/34/b5/2534b5186fd15e6464eacb16b312bbe9.jpg" },
        { id: 43, title: "Nghệ Thuật Quản Lý Tài Chính Cá Nhân", author: "Brian Tracy & Dan Strutzel", category: "Kinh tế", year: 2016, status: "Còn sách", image: "https://i.pinimg.com/236x/a7/3b/a1/a73ba1dd0eb4597ae539391885bffc04.jpg" },
        { id: 44, title: "Tư Duy Sâu", author: "Diệp Tử", category: "Phát triển bản thân", year: 2021, status: "Còn sách", image: "https://i.pinimg.com/236x/f5/1a/97/f51a97631c4d2702e3660e221bfc0527.jpg" },
        { id: 45, title: "7 Nguyên Tắc Bất Biến Để Xây Dựng Doanh Nghiệp Nhỏ", author: "Steven S. Little", category: "Kinh doanh", year: 2010, status: "Đã mượn", image: "https://i.pinimg.com/236x/3f/33/98/3f3398e68b142a3efe04195b5e48fe90.jpg" },
        { id: 46, title: "Người Trung Quốc Xấu Xí", author: "Bá Dương", category: "Văn hóa", year: 1985, status: "Còn sách", image: "https://i.pinimg.com/236x/dd/a2/be/dda2bebd46eb244c7b8883c4b4e87ba6.jpg" },
        { id: 47, title: "Phá Kén", author: "Tiểu Dã", category: "Phát triển bản thân", year: 2017, status: "Còn sách", image: "https://i.pinimg.com/236x/53/d4/ca/53d4cae5b1d0f7db0321af4fa07410ce.jpg" },
        { id: 48, title: "Kiếp Nào Ta Cũng Tìm Thấy Nhau", author: "Brian L. Weiss", category: "Tâm linh", year: 2015, status: "Đã mượn", image: "https://i.pinimg.com/236x/5d/9d/be/5d9dbe7f69bbf50ff02dced9c206eafd.jpg" },
        { id: 49, title: "Hành Tinh Của Một Kẻ Nghĩ Nhiều", author: "Nguyễn Khánh Trang", category: "Tâm lý học", year: 2020, status: "Còn sách", image: "https://i.pinimg.com/236x/b9/d5/89/b9d589519171bbcd7f6d1d0012db5d1a.jpg" },
        { id: 50, title: "36 Kế Cầu Người & Dùng Người", author: "Minh Tân", category: "Kinh doanh", year: 2016, status: "Hư hỏng", image: "https://i.pinimg.com/236x/ad/31/41/ad3141b78d3900d74b7e919b7f6ec9b3.jpg" },
        { id: 51, title: "Mặc Kệ Thiên Hạ: Sống Như Người Nhật", author: "Mari Tamagawa", category: "Tâm lý học", year: 2018, status: "Còn sách", image: "https://i.pinimg.com/236x/e9/bd/4a/e9bd4a9f9e7e1670bd3edd2636e08059.jpg" },
        { id: 52, title: "Tập Bài Giảng Chính Trị Học", author: "Viện Khoa Học Chính Trị", category: "Chính trị", year: 2004, status: "Đã mượn", image: "https://i.pinimg.com/236x/62/cc/90/62cc9007171de9a56ddeaeac320dd000.jpg" },
        { id: 53, title: "Tán Tỉnh Bất Kỳ Ai", author: "Leil Lowndes", category: "Giao tiếp", year: 2013, status: "Còn sách", image: "https://i.pinimg.com/236x/f1/a4/13/f1a4135aa97d36be343f74149b4835ce.jpg" },
        { id: 54, title: "Chọn Nghề Theo Tính Cách", author: "Alpha Books", category: "Hướng nghiệp", year: 2019, status: "Hư hỏng", image: "https://i.pinimg.com/236x/8f/d2/d8/8fd2d8514849a69f183d29b2cef5c70b.jpg" },
        { id: 55, title: "Hồ Sơ Tâm Lý Học: Tâm Thần Hay Kẻ Điên", author: "Mục Qua", category: "Tâm lý học", year: 2021, status: "Còn sách", image: "https://i.pinimg.com/236x/42/c5/d8/42c5d83de9ba80414a495fd3a2dcb6c4.jpg" },
        { id: 56, title: "Bí Mật Do Thái: Khơi Dậy Tài Năng Trẻ", author: "Michal.Wahari Larkin", category: "Phát triển bản thân", year: 2018, status: "Đã mượn", image: "https://i.pinimg.com/736x/56/e9/51/56e9519bf9d917f8380f0a4d0742f022.jpg" },
        { id: 57, title: "Buổi Sáng Diệu Kỳ", author: "Hal Elrod", category: "Phát triển bản thân", year: 2012, status: "Còn sách", image: "https://i.pinimg.com/236x/80/68/bb/8068bb51b784e70d7638775a476d3308.jpg" },
        { id: 58, title: "7 Thói Quen Tạo Gia Đình Hạnh Phúc", author: "Stephen R.Covey", category: "Gia đình", year: 1997, status: "Đã mượn", image: "https://i.pinimg.com/236x/70/09/d4/7009d4ede797ac4ca974aab30bfa20a9.jpg" },
        { id: 59, title: "Hùng Biện Kiểu TED", author: "Jeremey Donovan", category: "Giao tiếp", year: 2014, status: "Còn sách", image: "https://i.pinimg.com/236x/8b/d9/d8/8bd9d8cd81226780fa889728fdb59704.jpg" },
        { id: 60, title: "Thuật Yêu Đương", author: "Nguyên Duy Cần", category: "Tâm lý học", year: 2020, status: "Hư hỏng", image: "https://i.pinimg.com/236x/59/a1/87/59a187de6a00632016bdacb5fe84625e.jpg" },
        { id: 61, title: "Trí Tuệ Do Thái", author: "Eran Katz", category: "Tri thức", year: 2011, status: "Còn sách", image: "https://i.pinimg.com/236x/9c/ce/77/9cce77cf11e35d381000accd70881112.jpg" },
        { id: 62, title: "Tuổi 20 Những Năm Tháng Quyết Định Cuộc Đời Bạn", author: "Meg Jay", category: "Tạo động lực", year: 2013, status: "Đã mượn", image: "https://i.pinimg.com/736x/58/64/40/58644079c0e232ee6499a6eaff96d37d.jpg" },
        { id: 63, title: "Làm Đĩ", author: "Vũ Trọng Phụng", category: "Văn học", year: 1936, status: "Còn sách", image: "https://i.pinimg.com/236x/7f/41/c4/7f41c46ffc85489b239a5c3f2409f936.jpg" },
        { id: 64, title: "Trump: Đừng Bao Giờ Bỏ Cuộc", author: "Donald J. Trump", category: "Kinh doanh", year: 2008, status: "Còn sách", image: "https://i.pinimg.com/236x/a3/38/36/a33836174303ef61dff8a430a8640496.jpg" },
        { id: 65, title: "Tạo Dựng Thương Hiệu Cá Nhân", author: "Yamamoto Hideyuki", category: "Kinh doanh", year: 2019, status: "Hư hỏng", image: "https://i.pinimg.com/236x/95/07/05/950705ab698ef51f915e69235f9c1b48.jpg" },
        { id: 66, title: "Tôi Tư Duy Tôi Thành Đạt", author: "John C. Maxwell", category: "Phát triển bản thân", year: 2002, status: "Còn sách", image: "https://i.pinimg.com/236x/fe/42/35/fe423520042fb081acd93d1d657d2a5c.jpg" },
        { id: 67, title: "Trở Thành Người Ảnh Hưởng", author: "John Maxwell JimDornan", category: "Phát triển bản thân", year: 1997, status: "Còn sách", image: "https://i.pinimg.com/236x/ea/11/9e/ea119e3d5f8c3bc40dd27f81f39b2f86.jpg" },
        { id: 68, title: "Nghề Tay Trái Hái Ra Tiền", author: "Chris Guillebeau", category: "Kinh doanh", year: 2018, status: "Đã mượn", image: "https://i.pinimg.com/236x/b8/6d/9b/b86d9b1d80084c5f628f5de83fa3a118.jpg" },
        { id: 69, title: "Phù Thủy Sàn Chứng Khoán", author: "Jack D. Schwager", category: "Đầu tư", year: 1989, status: "Còn sách", image: "https://i.pinimg.com/236x/79/65/a8/7965a86e055ade3765b58849c3050cc2.jpg" },
        { id: 70, title: "Nghệ Thuật Kết Nối Đỉnh Cao Trong Giao Tiếp", author: "John C. Maxwell", category: "Giao tiếp", year: 2010, status: "Hư hỏng", image: "https://i.pinimg.com/236x/02/7b/e9/027be986b6cbd5d5901bd3e01b4e29fc.jpg" },
        { id: 71, title: "Từ Sinh Lý Đến Dưỡng Sinh", author: "Nguyễn Khắc Viện", category: "Y học", year: 1984, status: "Còn sách", image: "https://i.pinimg.com/236x/3b/13/a5/3b13a563418b601fb59531408344b8e3.jpg" },
        { id: 72, title: "Tâm Lý Học Chuyên Sâu", author: "Lưu Hồng Khanh", category: "Tâm lý học", year: 2017, status: "Đã mượn", image: "https://i.pinimg.com/236x/d4/c2/3e/d4c23e15f318f8cca0df339c8b06405c.jpg" },
        { id: 73, title: "Bắt Đầu Với Câu Hỏi Tại Sao", author: "Simon Sinek", category: "Tạo động lực", year: 2009, status: "Còn sách", image: "https://i.pinimg.com/236x/44/5a/3e/445a3efb779973666b62c7dbee3e5403.jpg" },
        { id: 74, title: "Hãy Suy Nghĩ Tựa Người Mua", author: "Jerry Acuff & Wally Wood", category: "Kinh doanh", year: 2015, status: "Hư hỏng", image: "https://i.pinimg.com/236x/d7/be/7e/d7be7ead04488cd0c22a32afbb406372.jpg" },
        { id: 75, title: "Kiếp Nào Ta Cũng Tìm Thấy Nhau", author: "Brian L. Weiss", category: "Tâm linh", year: 2015, status: "Còn sách", image: "https://i.pinimg.com/236x/5d/9d/be/5d9dbe7f69bbf50ff02dced9c206eafd.jpg" },
        { id: 76, title: "Khởi Nghiệp 4.0", author: "Dorie Clark", category: "Kinh doanh", year: 2019, status: "Đã mượn", image: "https://i.pinimg.com/236x/b0/24/d4/b024d4efaafc873aa43790199e8f2486.jpg" },
        { id: 77, title: "Cà Phê Cùng Tony", author: "Tony Buổi Sáng", category: "Tạo động lực", year: 2015, status: "Còn sách", image: "https://i.pinimg.com/236x/7f/f8/46/7ff8466e6f2066ddc2499b3d8aabbe27.jpg" },
        { id: 78, title: "Thế Giới Phẳng", author: "Thomas L. Friedman", category: "Kinh tế", year: 2005, status: "Đã mượn", image: "https://i.pinimg.com/236x/31/32/55/31325521811036f7fec9dea4a01f8027.jpg" },
        { id: 79, title: "Tiền Và Tâm Lý", author: "Nguyễn Quốc Trung", category: "Tâm lý học", year: 2018, status: "Còn sách", image: "https://i.pinimg.com/236x/4a/24/6d/4a246d222f1aeba7947889a823e75835.jpg" },
        { id: 80, title: "Linh Hồn Của Tiền", author: "Lynne Twist", category: "Tri thức", year: 2003, status: "Hư hỏng", image: "https://i.pinimg.com/236x/72/7c/c2/727cc2d5c42bb97c202447a145de95ea.jpg" },
        { id: 81, title: "Phương Pháp Sử Dụng Nguồn Nhân Lực", author: "Trần Minh Nhật", category: "Kinh doanh", year: 2016, status: "Còn sách", image: "https://i.pinimg.com/236x/67/0a/f8/670af8127c07b78a869822123e3ecc10.jpg" },
        { id: 82, title: "Bắt Chước Để Thành Công", author: "Tachikawa Mitsuaki", category: "Phát triển bản thân", year: 2017, status: "Đã mượn", image: "https://i.pinimg.com/236x/26/8f/ca/268fca2f32fa113118628100de741e28.jpg" },
        { id: 83, title: "Nơi Chỉ Người Đọc Sách Mới Có Thể Chạm Tới", author: "Takashi Saito", category: "Tri thức", year: 2019, status: "Còn sách", image: "https://i.pinimg.com/236x/77/16/56/771656584986ed06767f3c3c861b6d0b.jpg" },
        { id: 84, title: "Tư Duy Phản Biện", author: "Zoe McKey", category: "Tâm lý học", year: 2020, status: "Hư hỏng", image: "https://i.pinimg.com/236x/e6/41/47/e64147dba8b695f17c5075c9bfe8db04.jpg" },
        { id: 85, title: "Hạt Giống Tâm Hồn", author: "Nhiều Tác Giả", category: "Tạo động lực", year: 2000, status: "Còn sách", image: "https://i.pinimg.com/236x/b9/cf/29/b9cf292da7768b52715d8885cf7bcd6b.jpg" },


      ];

      localStorage.setItem("books", JSON.stringify(sampleBooks));
    }
    this.books = JSON.parse(localStorage.getItem("books"));
    this.allBooks = [...this.books];
  },
  methods: {
    showAddBookPanel() {
      this.isAddBookPanelVisible = true;
    },
    closeAddBookPanel() {
      this.isAddBookPanelVisible = false;
    },
    closeEditBookPanel() {
      this.isEditBookPanelVisible = false;
    },
    toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    },
    editBook() {
      if (this.selectedBookId !== null) {
        const book = this.books.find(b => b.id === this.selectedBookId);
        if (book) {
          this.selectedBook = { ...book };
          this.isEditBookPanelVisible = true;
        }
      } else {
        this.modalMessage = "Vui lòng chọn sách để sửa.";
        this.showModal = true;
      }
    },
    addBook(newBook) {
      const uniqueId = Date.now() + Math.floor(Math.random() * 1000);
      newBook.id = uniqueId;
      this.books.push(newBook);
      this.allBooks.push(newBook);
      localStorage.setItem("books", JSON.stringify(this.books));

    },
    deleteBook() {
      if (this.selectedBookId !== null) {
        this.modalMessage = "Bạn có chắc muốn xóa sách này không?";
        this.actionToConfirm = this.confirmDeleteBook;
        this.showModal = true;
      } else {
        this.modalMessage = "Vui lòng chọn sách để xóa.";
        this.showModal = true;
      }
    },
    borrowBook() {
      if (this.selectedBookId !== null) {
        const book = this.books.find(b => b.id === this.selectedBookId);
        if (book && book.status === "Còn sách") {
          const currentDate = new Date().toLocaleDateString();
          this.modalMessage = `Bạn có chắc muốn mượn sách này? Ngày mượn: ${currentDate}`;
          this.actionToConfirm = this.confirmBorrowBook;
          this.showModal = true;
        } else {
          this.modalMessage = "Sách đã được mượn hoặc bị hỏng vui lòng chọn sách khác.";
          this.showModal = true;
        }
      } else {
        this.modalMessage = "Vui lòng chọn sách để mượn.";
        this.showModal = true;
      }
    },
    saveEditBook(updatedBook) {
      const bookIndex = this.books.findIndex(book => book.id === updatedBook.id);
      if (bookIndex !== -1) {
        this.books[bookIndex] = updatedBook;
        localStorage.setItem("books", JSON.stringify(this.books));
        alert("Sách đã được sửa!");
        this.isEditBookPanelVisible = false;
      }
    },
    confirmDeleteBook() {
      this.books = this.books.filter(book => book.id !== this.selectedBookId);
      this.allBooks = [...this.books];
      this.selectedBookId = null;
      localStorage.setItem("books", JSON.stringify(this.books));
      alert("Sách đã được xóa!");
    },
    confirmBorrowBook() {
      const bookIndex = this.books.findIndex(book => book.id === this.selectedBookId);
      if (bookIndex !== -1) {
        const currentDate = new Date();
        this.books[bookIndex].status = `Tôi đã mượn ngày: ${currentDate.toLocaleDateString()}`;
        this.books[bookIndex].registerDate = currentDate;
        localStorage.setItem("books", JSON.stringify(this.books));

        // Show the success panel with message
        this.successMessage = "Cảm ơn bạn đã mượn sách! Chúc bạn một ngày vui vẻ.";
        this.showSuccessPanel = true;
      }
      this.selectedBookId = null;
    },
    filterBooks(status) {
      if (status === "all") {
        this.books = [...this.allBooks];
      } else {
        this.books = this.allBooks.filter(book => {
          if (status === "new") return book.status === "Còn sách";
          if (status === "borrowed") return book.status === "Đã mượn";
          return book.status === "Hư hỏng";
        });
      }
    },
    selectBook(bookId) {
      this.selectedBookId = bookId;
    },
    closeSuccessPanel() {
      this.showSuccessPanel = false;
    },
    startUsingApp() {
      this.isTutorialVisible = false;
    },
    confirmAction() {
      if (this.actionToConfirm) {
        this.actionToConfirm();
      }
      this.showModal = false;
    }
  }
};
</script>



<style scoped>
/* Styles for various components */

/* Tutorial Panel */
/* Tutorial Overlay */
.tutorial-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.75);
  /* Darker background overlay */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
  /* Add padding for mobile devices */
}

/* Tutorial Box */
.tutorial-box {
  background-color: #ffffff;
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  max-width: 400px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  /* Softer shadow */

  position: relative;
  /* For positioning of child elements */
}

/* Character Image */
.character-image {
  margin-bottom: 20px;
}

.character-image img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Chatbox */
.chat-box {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 8px;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.05);
  /* Inner shadow for depth */
  margin-bottom: 25px;
  font-size: 16px;
  line-height: 1.5;
  color: #333;
}

.chat-message p {
  margin: 10px 0;
  color: #444;
  /* Slightly darker text */
}

/* Start Button */
.btn-start {
  padding: 10px 25px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;

}

.btn-start:hover {
  background-color: #0056b3;
}

/* Fade-in Animation */



/* Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
  max-width: 90%;
}

.modal-buttons {
  margin-top: 20px;
}

.modal-buttons button {
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #6200ea;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button:hover {
  background-color: #3700b3;
}

.modal-buttons button:focus {
  outline: none;
  box-shadow: 0 0 5px 2px #80d4ff;
}

.no-books {
  text-align: center;
  font-size: 18px;
  margin: 20px 0;
}

/* Overlay for Add Book Panel */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-image img {
  max-width: 150px;
  /* Set max width */
  height: auto;
  /* Maintain aspect ratio */
  margin-bottom: 20px;
  /* Space between image and text */
}
</style>
