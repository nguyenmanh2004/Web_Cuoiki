<template>
    <div class="book-list">
        <!-- Hiển thị sách theo dạng lưới -->
        <div class="book-grid">
            <div v-if="filteredBooks.length === 0" class="no-results">
               <h1> Không tìm thấy sách nào</h1>
                <img src = "https://i.pinimg.com/originals/5c/37/6f/5c376f3c1d31024278361a8a217ed86e.gif " width="300px" alt="">
                
            </div>
            <div
                v-for="(book, index) in currentBooks"
                :key="book.id"
                class="book-item animate__animated animate__fadeInRight"
                :class="{ selected: selectedBookId === book.id }"
                @click="selectBook(book.id)"
            >
                <img :src="book.image || defaultImage" alt="Book image" class="book-image" />
                <h3>{{ book.title || "Không có tiêu đề" }}</h3>
                <p>Tác giả: {{ book.author || "Không rõ" }}</p>
                <p>Thể loại: {{ book.category || "Không rõ" }}</p>
                <p>Năm XB: {{ book.year || "Không rõ" }}</p>
                <p class="status-box" :class="getStatusClass(book.status)">
                    {{ book.status || "Không rõ" }}
                </p>
                <p :class="getExpiryClass(book)">
                    Ngày hết hạn: {{ formatDate(new Date(new Date().setDate(new Date().getDate() + 7))) }}
                </p>
                <button @click.stop="returnBook(book)" class="return-book-btn">Trả sách</button>
            </div>
        </div>

        <!-- Thông điệp cảm ơn -->
        <div v-if="thankYouMessage" class="thank-you-message">
            Cảm ơn bạn đã đọc sách, hi vọng bạn cảm thấy vui khi đọc sách!
        </div>

        <!-- Điều khiển phân trang -->
        <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 1">Trước</button>
            <span>Trang {{ currentPage }} / {{ totalPages }}</span>
            <button @click="nextPage" :disabled="currentPage === totalPages">Tiếp</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "BooksList",
    props: {
        books: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            currentPage: 1,
            booksPerPage: 10,
            selectedBookId: null,
            defaultImage: "https://via.placeholder.com/120x180?text=No+Image",
            thankYouMessage: false,  // Biến để kiểm tra thông điệp có hiện hay không
        };
    },
    computed: {
        totalPages() {
            return Math.ceil(this.filteredBooks.length / this.booksPerPage) || 1;
        },
        currentBooks() {
            const start = (this.currentPage - 1) * this.booksPerPage;
            return this.filteredBooks.slice(start, start + this.booksPerPage);
        },
        filteredBooks() {
            return this.books.filter((book) => !["Còn sách", "Đã mượn", "Hư hỏng"].includes(book.status));
        },
    },
    created() {
        this.loadBooks();
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) this.currentPage--;
        },
        nextPage() {
            if (this.currentPage < this.totalPages) this.currentPage++;
        },
        selectBook(bookId) {
            this.selectedBookId = bookId;
            this.$emit("selectBook", bookId);
        },
        returnBook(book) {
            // Cập nhật trạng thái trong local state trước
            book.status = "Còn sách";
            // Lưu lại danh sách sách vào localStorage sau khi cập nhật
            const updatedBooks = this.books.map((b) => {
                if (b.id === book.id) {
                    return { ...b, status: "Còn sách" };
                }
                return b;
            });
            localStorage.setItem("books", JSON.stringify(updatedBooks));
            // Gửi sự kiện lên component cha để đồng bộ
            this.$emit("updateBooks", updatedBooks);
            // Hiển thị thông điệp cảm ơn
            this.showThankYouMessage();
        },
        loadBooks() {
            const storedBooks = localStorage.getItem("books");
            if (storedBooks) {
                this.$emit("updateBooks", JSON.parse(storedBooks));
            }
        },
        formatDate(date) {
            if (!date) return "";
            const day = String(date.getDate()).padStart(2, "0");
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const year = date.getFullYear();
            return `${day}/${month}/${year}`;
        },
        getStatusClass(status) {
            if (status === "Đã mượn") return "status-borrowed";
            if (status === "Còn sách") return "status-returned";
            return "";
        },
        getExpiryClass(book) {
            const expiryDate = new Date(new Date().setDate(new Date().getDate() + 7));
            const today = new Date();
            const diffDays = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
            return diffDays <= 2 ? "expiry-warning" : "";
        },
        showThankYouMessage() {
            this.thankYouMessage = true;
            setTimeout(() => {
                this.thankYouMessage = false; // Ẩn thông điệp sau 3 giây
            }, 3000);
        }
    },
};
</script>

<style scoped>
.book-list {
    overflow-y: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    width: 100vw;
    margin: 0;
    padding: 15px;
    box-sizing: border-box;
}

.book-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Flexible grid */
    gap: 15px;
    margin: 0 auto;
    max-width: 1200px;
}

.book-item {
    background-color: #fff;
    border: 2px solid #ddd;
    padding: 10px;
    text-align: center;
    transition: transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
    cursor: pointer;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.return-book-btn {
    padding: 8px 16px;
    background: linear-gradient(45deg, #ff5f6d, #ffc371); /* Gradient background */
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s ease, transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.return-book-btn:hover {
    background: linear-gradient(45deg, #ff416c, #ff4b2b); /* Darker gradient on hover */
    transform: translateY(-2px); /* Slight lift effect */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhance shadow on hover */
}

.return-book-btn:active {
    background: linear-gradient(45deg, #ff4b2b, #ff416c); /* More intense gradient on active */
    transform: translateY(0); /* Button returns to its original position */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Reduce shadow on active */
}

.book-item:hover {
    transform: translateY(-4px);
    border-color: #007bff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.book-image {
    width: 120px; /* Đặt kích thước cố định */
    height: 120px; /* Đặt kích thước cố định */
    object-fit: cover; /* Giữ tỉ lệ ảnh và tràn đầy khung */
    border-radius: 8px;
}

.book-item h3 {
    font-size: 14px;
    margin: 10px 0 5px;
}

.book-item p {
    font-size: 12px;
    margin: 5px 0;
}

.status-box {
    padding: 4px 8px;
    font-size: 12px;
    border-radius: 5px;
    margin-top: 8px;
}

.status-borrowed {
    background-color: #4e99e4;
    color: black;
}

.status-returned {
    background-color: #6f42c1;
    color: white;
}

.expiry-warning {
    color: #e74c3c;
    font-weight: bold;
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;
    padding: 5px 10px;
    margin: 10px auto;
    width: fit-content;
    background: #fff;
    border-radius: 5px;
    position: fixed;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
}

.pagination button {
    padding: 8px 16px;
    font-size: 14px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 0 5px;
}

.pagination button:disabled {
    background-color: #c0c0c0;
    cursor: not-allowed;
}

.thank-you-message {
    position: fixed;
    bottom: 120px;
    left: 50%;
    transform: translateX(-50%);
    padding: 10px;
    background-color: #28a745;
    color: white;
    font-weight: bold;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
    0% {
        opacity: 0;
        transform: translateX(-50%) translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateX(-50%) translateY(0);
    }
}
</style>
