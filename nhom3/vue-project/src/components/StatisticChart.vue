<template>
    <div class="statistics-chart">
     
  
      <!-- Form thêm độc giả -->
      <div v-if="showAddReaderForm" class="add-reader-form">
        <form @submit.prevent="addReader">
          <input type="text" v-model="newReader.name" placeholder="Tên độc giả" required />
          <input type="number" v-model="newReader.borrowed" placeholder="Số lần mượn" required />
          <input type="number" v-model="newReader.returned" placeholder="Số lần trả" required />
          <input type="number" v-model="newReader.violation" placeholder="Số vi phạm" required />
          <input type="text" v-model="newReader.violationReason" placeholder="Lý do vi phạm" />
         
        </form>
      </div>
  
      <div class="scroll-container">
        <div class="chart-and-table-container">
          <!-- Bảng thống kê -->
          <div class="statistics-table">
            <h3 class="text-center">Thống kê độc giả</h3>
            <div class="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>Tên độc giả</th>
                    <th>Số lần mượn</th>
                    <th>Số lần trả</th>
                    <th>Vi phạm</th>
                    <th>Lý do vi phạm</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(reader, index) in readers" :key="index">
                    <td>{{ reader.name }}</td>
                    <td>{{ reader.borrowed }}</td>
                    <td>{{ reader.returned }}</td>
                    <td>{{ reader.violation }}</td>
                    <td>{{ reader.violationReason }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
  
          <!-- Biểu đồ -->
          <div class="chart-container">
            <div class="chart">
              <h3 class="text-center">Số lần mượn sách của các độc giả</h3>
              <canvas ref="borrowChart"></canvas>
            </div>
            <div class="chart">
              <h3 class="text-center">Số sách đã trả của các độc giả</h3>
              <canvas ref="returnedChart"></canvas>
            </div>
            <div class="chart">
              <h3 class="text-center">Số vi phạm của các độc giả</h3>
              <canvas ref="violationChart"></canvas>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Export to Excel Button -->
      <div class="export-btn-container">
        <button @click="exportToExcel">Xuất ra Excel</button>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import Chart from "chart.js/auto";
  import * as XLSX from 'xlsx'; // Importing the Excel library
  
  export default {
    name: "StatisticsChart",
    setup() {
      const readers = ref([
        { name: 'Độc giả A', borrowed: 10, returned: 8, violation: 1, violationReason: 'Trả muộn' },
        { name: 'Độc giả B', borrowed: 5, returned: 4, violation: 0, violationReason: 'Không có' },
        { name: 'Độc giả C', borrowed: 8, returned: 7, violation: 2, violationReason: 'Mất sách' },
        { name: 'Độc giả D', borrowed: 12, returned: 11, violation: 0, violationReason: 'Không có' },
        { name: 'Độc giả e', borrowed: 100, returned: 17, violation: 3, violationReason: 'Không có' }
      ]);
  
      const newReader = ref({
        name: '',
        borrowed: 0,
        returned: 0,
        violation: 0,
        violationReason: ''
      });
  
      const showAddReaderForm = ref(false);
  
      const addReader = () => {
        readers.value.push({ ...newReader.value });
        newReader.value = { name: '', borrowed: 0, returned: 0, violation: 0, violationReason: '' };
        showAddReaderForm.value = false;
        updateCharts();
      };
  
      const toggleAddReaderForm = () => {
        showAddReaderForm.value = !showAddReaderForm.value;
      };
  
      const borrowData = ref({
        labels: readers.value.map(reader => reader.name),
        datasets: [{
          label: 'Số lần mượn sách',
          data: readers.value.map(reader => reader.borrowed),
          backgroundColor: 'rgba(66, 165, 245, 0.2)',
          borderColor: '#42A5F5',
          borderWidth: 1
        }]
      });
  
      const returnedData = ref({
        labels: readers.value.map(reader => reader.name),
        datasets: [{
          label: 'Số sách đã trả',
          data: readers.value.map(reader => reader.returned),
          backgroundColor: '#66BB6A',
          borderColor: '#66BB6A',
          borderWidth: 1
        }]
      });
  
      const violationData = ref({
        labels: readers.value.map(reader => reader.name),
        datasets: [{
          label: 'Vi phạm',
          data: readers.value.map(reader => reader.violation),
          backgroundColor: ['#FF7043', '#FFEB3B', '#4CAF50', '#03A9F4']
        }]
      });
  
      const borrowChart = ref(null);
      const returnedChart = ref(null);
      const violationChart = ref(null);
  
      const updateCharts = () => {
        borrowData.value.labels = readers.value.map(reader => reader.name);
        borrowData.value.datasets[0].data = readers.value.map(reader => reader.borrowed);
  
        returnedData.value.labels = readers.value.map(reader => reader.name);
        returnedData.value.datasets[0].data = readers.value.map(reader => reader.returned);
  
        violationData.value.labels = readers.value.map(reader => reader.name);
        violationData.value.datasets[0].data = readers.value.map(reader => reader.violation);
  
        borrowChart.value.update();
        returnedChart.value.update();
        violationChart.value.update();
      };
  
      // Function to export data to Excel
      const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(readers.value);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Thống kê");
        XLSX.writeFile(wb, "ThongKe.xlsx");
      };
  
      onMounted(() => {
        const borrowCtx = borrowChart.value.getContext('2d');
        const returnedCtx = returnedChart.value.getContext('2d');
        const violationCtx = violationChart.value.getContext('2d');
  
        new Chart(borrowCtx, {
          type: 'bar',
          data: borrowData.value,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        new Chart(returnedCtx, {
          type: 'bar',
          data: returnedData.value,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
  
        new Chart(violationCtx, {
    type: 'bar',  // Chuyển từ 'pie' sang 'bar'
    data: violationData.value,
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
      });
  
      return {
        readers,
        newReader,
        showAddReaderForm,
        addReader,
        borrowChart,
        returnedChart,
        violationChart,
        exportToExcel
      };
    }
  };
  </script>
  <style scoped>
.scroll-container {
  max-height: 410px; /* Tăng chiều cao khu vực cuộn */
  overflow-y: auto;   /* Chỉ cho phép cuộn dọc */
  margin-bottom: 30px;
  padding: 10px;
  border: 1px solid #ddd; /* Thêm viền để phân biệt khu vực cuộn */
  border-radius: 5px; /* Bo góc cho khu vực cuộn */
  overflow-x: hidden; /* Chặn cuộn ngang nếu không cần thiết */
  background-color: #f9f9f9;
}

.statistics-chart {
  padding: 20px;
  font-family: Arial, sans-serif;
  overflow: hidden;
  background-color: #fff;
  border-radius: 10px;
}

h2, h3 {
  color: #333;
}

.add-reader-form {
  margin: 20px 0;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.add-reader-form input {
  display: block;
  width: 100%;
  margin: 8px 0;
  padding: 12px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 14px;
}

.add-reader-form button {
  padding: 12px 25px;
  background-color: #42A5F5;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.add-reader-form button:hover {
  background-color: #1E88E5;
}

.statistics-table {
  margin-top: 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th, table td {
  padding: 12px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

table th {
  background-color: #42A5F5;
  color: white;
  font-weight: bold;
}

table td {
  background-color: #fff;
}

table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.chart-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 30px;
}

.chart {
  width: 300px;
  height: 300px;
}

canvas {
  width: 100%;
  height: 100%;
}

.export-btn-container {
  position: absolute;
  bottom: 40px;
  right: 20px; /* Align the button to the bottom right */
  text-align: center;
}

.export-btn-container button {
  padding: 10px 10px;
  background-color: #66BB6A;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}

.export-btn-container button:hover {
  background-color: #388E3C;
}

button {
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
}

button:focus {
  outline: none;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .statistics-chart {
    padding: 10px;
  }

  .chart-container {
    flex-direction: column;
    align-items: center;
  }

  .chart {
    width: 250px;
    height: 250px;
  }

  .add-reader-form input, .add-reader-form button {
    font-size: 14px;
  }

  table th, table td {
    font-size: 12px;
  }

  .export-btn-container button {
    width: 100%;
  }
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .statistics-chart {
    padding: 10px;
  }

  .chart-container {
    flex-direction: column;
    align-items: center;
  }

  .chart {
    width: 250px;
    height: 250px;
  }

  .add-reader-form input, .add-reader-form button {
    font-size: 14px;
  }

  table th, table td {
    font-size: 12px;
  }

  .export-btn-container button {
    width: 100%;
  }
}

</style>