<template>
  <div class="flex-ver">
    <div class="app-container ">
      <div class="header-title">Hibachi Order Form</div>
      <div class="base-info">
        <div class="flex">
          <span class="label">Booking Name：</span>
          <el-input class="flex-1" v-model="order.bookingName"></el-input>
        </div>

        <div class="flex">
          <span class="label">Booking Address：</span>
          <el-input class="flex-1" v-model="order.bookingAddress"></el-input>
        </div>
      </div>

      <!-- 表格 -->
     
      <el-table
        :data="order.orderDetail"
        class="el-table"
        border
        height="75%"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          type="index"
          label="No."
          align="center"
          :width="flexColumnWidth('No.', 'No.')"
        ></el-table-column>
        <el-table-column
          prop="name"
          label="name"
          align="center"
          :width="flexColumnWidth('name', 'name')"
        >
          <template slot-scope="scope">
            <el-input v-model="scope.row.name"> </el-input>
          </template>
        </el-table-column>

        <el-table-column
          class="col-class"
          prop="F0001"
          align="center"
          :label="menus.F0001"
          :width="flexColumnWidth(menus.F0001, 'Veggie')"
        >
          <template slot-scope="scope">
            <el-input-number
              size="large"
              :min="0"
              @onblur="blurNum"
              v-model="scope.row.F0001"
            >
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0002"
          :label="menus.F0002"
          align="center"
          :width="flexColumnWidth(menus.F0002, 'Chicken')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" :min="0" v-model="scope.row.F0002">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0003"
          :label="menus.F0003"
          align="center"
          :width="flexColumnWidth(menus.F0003, 'Shrimp')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" :min="0" v-model="scope.row.F0003">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0004"
          :label="menus.F0004"
          align="center"
          :width="flexColumnWidth(menus.F0004, 'Steak')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" ::min="0" v-model="scope.row.F0004">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0005"
          :label="menus.F0005"
          align="center"
          :width="flexColumnWidth(menus.F0005, 'Salmon')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" :min="0" v-model="scope.row.F0005">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0006"
          :label="menus.F0006"
          align="center"
          :width="flexColumnWidth(menus.F0006, 'Scallops')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" :min="0" v-model="scope.row.F0006">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0007"
          :label="menus.F0007"
          align="center"
          :width="flexColumnWidth(menus.F0007, 'Filet +$8')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" :min="0" v-model="scope.row.F0007">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="F0008"
          :label="menus.F0008"
          align="center"
          :width="flexColumnWidth(menus.F0008, 'Lobs +$15')"
        >
          <template slot-scope="scope">
            <el-input-number size="large" :min="0" v-model="scope.row.F0008">
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column
          prop="Allergies"
          label="Allergies"
          align="center"
          :width="flexColumnWidth('Allergies', 'Allergies')"
        >
          <template slot-scope="scope">
            <el-input type="textarea" v-model="scope.row.Allergies"> </el-input>
          </template>
        </el-table-column>

        <el-table-column
          label="操作"
          align="center"
          :width="flexColumnWidth(menus.F0007, 'Filet +$8')"
        >
          <template slot-scope="scope">
              <el-button
                class="operate-button"
                icon="el-icon-refresh-right"
                size="small"
                @click="resetRow(scope.row)"
                >reset</el-button
              >
              <el-button
              type="danger"
                class="operate-button"
                icon="el-icon-delete"
                size="small"
                @click="deleteRow(scope.row)"
                >delete</el-button
              >
          </template>
        </el-table-column>
      </el-table>
     
    </div>
    <div class="footer-div">
      <el-button
          type="primary"
          class="buttonAdd"
          icon="el-icon-plus"
          size="small"
          plain
          @click="addRow"
          >add row</el-button
        >
      <el-button
        type="primary"
        size="small"
        class="buttonSubmit"
        @click="submitForm"
        >submit</el-button
      >
    </div>
  </div>
</template>


<script>
name = "MainVue";
export default {
  data() {
    return {
      tableData: [],
      menus: {
        F0001: "Veggie",
        F0002: "Chicken",
        F0003: "Shrimp",
        F0004: "Steak",
        F0005: "Salmon",
        F0006: "Scallops",
        F0007: "Filet +$8",
        F0008: "Lobs +$15",
      },
      order: {
        bookingName: "",
        bookingAddress: "",
        orderDetail: [
          {
            name: "",
            F0001: 0,
            F0002: 0,
            F0003: 0,
            F0004: 0,
            F0005: 0,
            F0006: 0,
            F0007: 0,
            F0008: 0,
            Allergies: "",
          },
        ],
      },

      total: 0,
      newRow: {}, // 新增的一行数据
      isDis: false,
      fullHeight: window.innerHeight - 220 + "px",
    };
  },
  mounted() {},
  methods: {
    // getSummary(params){
    //   console.log(params)
    //
    // },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      const idx = 0;
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "Total Count";
          return;
        }
        if (index === 1) {
          sums[index] = "";
          return;
        }
        if (column.property === "Allergies") {
          sums[index] = "";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] += "";
        } else {
          sums[index] = "";
        }
      });

      return sums;
    },
    /**
     * el-table-column 自适应列宽
     * @param prop_label: 表名
     * @param table_data: 表格数据
     */
    flexColumnWidth(label, prop) {
      const arr = this.order.orderDetail.map((x) => x[prop]);
      if (arr.length > 0) {
        arr.push(label);
        return this.getMaxLength(arr) + 160 + "px";
      }
      return 160 + "px";
    },
    /**计算列内容最大宽度
     * 遍历列的所有内容，获取最宽一列的宽度
     * @param arr
     */
    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          const calcLen = this.getTextWidth(item);
          if (acc < calcLen) {
            acc = calcLen;
          }
        }
        return acc;
      }, 0);
    },
    /**
     * 使用span标签包裹内容，然后计算span的宽度 width： px
     * @param valArr
     */
    getTextWidth(str) {
      let width = 0;
      const html = document.createElement("span");
      html.innerText = str;
      html.className = "getTextWidth";
      document.querySelector("body").appendChild(html);
      width = document.querySelector(".getTextWidth").offsetWidth;
      document.querySelector(".getTextWidth").remove();
      return width;
    },

    blurNum(value) {
      console.log(value);
    },
    initRow(row) {
      if (row == null || row == "" || row == undefined) {
        const newRow = {
          name: "",
          F0001: 0,
          F0002: 0,
          F0003: 0,
          F0004: 0,
          F0005: 0,
          F0006: 0,
          F0007: 0,
          F0008: 0,
          Allergies: "",
        };
        return newRow;
      }
      row.name = "";
      row.F0001 = "";
      row.F0002 = "";
      row.F0003 = "";
      row.F0004 = "";
      row.F0005 = "";
      row.F0006 = "";
      row.F0007 = "";
      row.F0008 = "";
      row.Allergies = "";
    },
    addRow() {
      // 添加一行数据
      const newRow = this.initRow();
      this.order.orderDetail.push(newRow);
    },
    resetRow(row) {
      row = this.initRow(row);
    },
    deleteRow(row) {
      console.log(row);
      // 删除行数据
      const index = this.order.orderDetail.indexOf(row);
      console.log(index);
      if (index !== -1) {
        this.order.orderDetail.splice(index, 1);
      }
    },
    submitForm() {},
  },
};
</script>
<style>
body {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}
.flex-ver{
  display: flex;
  flex-direction: column;
}
.app-container {
  flex: 1;
  padding: 0 5px;
}
.scroll-container{
flex: 1;
overflow: scroll;
}
.header-title {
  font-size: 24px;
  font-weight: bolder;
  height: 35px;
  line-height: 35px;
}
/* .el-table {
  margin-bottom: 6%;
  border-width: medium;
  font-size: 30px;
} */
.el-table .cell {
  white-space: normal;
  word-break: break-all;
  line-height: 40px;
}
el-table-column {
  height: 80%;
}
.booking-name-input {
  width: 35%;
}
.booking-address-input {
  width: 35%;
}

.footer-div {
  /* position: absolute; */
  /* bottom: 0px; */
  width: 100%;
  display: flex;
  justify-content: space-between;
  height: 50px;
  padding: 5px;
}
.el-input__inner {
  font-size: 30px;
  line-height: 20em;
}


.buttonSubmit {
  width: 45%;
}
.buttonAdd{
  width: 45%;
}
.operate-button{
  margin: 0 5px;
}
.el-textarea__inner {
  font-size: 30px;
  padding: 0;
}

.base-info {
  height: 100px;
  padding: 10px 0;
}
.flex {
  display: flex;
}
.flex-1 {
  flex: 1;
}
.label {
  font-size: 14px;
  width: 80px;
}

</style>