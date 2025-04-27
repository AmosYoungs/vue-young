<template>
  <div class="flex-ver">
    <div class="app-container">
      <div class="header-title">Hibachi Order Form</div>
      <div class="base-info">
        <el-row style="margin: 10px 0" :gutter="5">
          <el-col :span="12" class="flex">
            <span class="label">Booking Date</span>
            <el-date-picker
              v-model="order.bookingDate"
              type="date"
              style="width: 95%"
              value-format="yyyy-MM-dd "
              format="yyyy-MM-dd "
              prefix-icon=""
            >
            </el-date-picker>
          </el-col>
          <el-col :span="12" class="flex">
            <span class="label">Booking Time</span>
            <el-select
              style="width: 100%"
              v-model="hour"
              :placeholder="'Select'"
            >
              <el-option
                :key="item.value"
                :label="item.value"
                :value="item.value"
                v-for="item in hourOptions"
              ></el-option>
            </el-select>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" class="flex">
            <span class="label">Booking Name：</span>
            <el-input class="flex-1" v-model="order.bookingName"></el-input>
          </el-col>

          <el-col :span="12" class="flex">
            <span class="label">Booking Address：</span>
            <el-input class="flex-1" v-model="order.bookingAddress"></el-input>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0">
          <el-col :span="12" class="flex">
            <span class="label">Phone：</span>
            <el-input class="flex-1" v-model="order.tel"></el-input>
          </el-col>
        </el-row>
      </div>
      <!-- 表格 -->

      <el-table
        :data="order.orderDetailList"
        class="el-table"
        border
        height="60%"
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
          v-for="column in tablColumns"
          :prop="column.valuekey"
          :key="column.label"
          :label="column.label"
          :width="flexColumnWidth(column.valuekey, column.label)"
        >
          <template slot-scope="scope">
            <el-input
              v-if="column.type == 'input'"
              v-model="scope.row[column.valuekey]"
            >
            </el-input>
            <el-input
              v-if="column.type == 'textarea'"
              type="textarea"
              v-model="scope.row[column.valuekey]"
            >
            </el-input>
            <el-input-number
              v-else-if="column.type == 'number'"
              size="small"
              :min="0"
              v-model="scope.row[column.valuekey]"
            >
            </el-input-number>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="center" width="110px">
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

      <div class="total-info">
        <div class="flex flex-jl">
          <span class="addtion-title">Additional Notes:</span>
        </div>
        <el-row align="center" class="flex flex-ac" :gutter="5">
          <el-col :span="24" class="flex">
            <el-input class="flex-1" v-model="order.additionalNotes"></el-input>
          </el-col>
        </el-row>
        <div class="flex flex-jl">
          <span class="addtion-title">Extra side Order:</span>
        </div>
        <el-row style="margin-top: 10px" :gutter="5">
          <el-col :span="12">
            <div class="flex flex-ac">
              <span class="label">Edamame</span>
              <el-input-number
                size="small"
                v-model="order.edamame"
              ></el-input-number>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="flex flex-ac">
              <span class="label">Gvoza</span>
              <el-input-number
                size="small"
                v-model="order.gyoza"
              ></el-input-number>
            </div>
          </el-col>
        </el-row>
      </div>
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
import axios from "axios";
export default {
  name: "MainVue",
  data() {
    return {
      hourOptions: [
        {
          value: "12:00 pm Noon",
        },
        {
          value: "1:00pm",
        },
        {
          value: "3:00pm",
        },
        {
          value: "4:00pm",
        },
        {
          value: "5:00pm",
        },
        {
          value: "7:00pm",
        },
        {
          value: "7:30pm",
        },
        {
          value: "8:00pm",
        },
        {
          value: "9:00pm",
        },
        {
          value: "10:00pm",
        },
      ],
      tablColumns: [
        {
          label: "name",
          valuekey: "name",
          type: "input",
        },
      ],
      hour: "",
      order: {
        tel: "",
        bookingDate: "",
        bookingName: "",
        bookingAddress: "",
        edamame: 0,
        gyoza: 0,
        additionalNotes: "",
        orderDetailList: [],
      },
    };
  },
  created() {
    this.requestTableColumn();
  },
  methods: {
    requestTableColumn() {
      axios.get("http://47.95.8.42:6002/api/food/list").then((result) => {
        if (result.status == 200 && result.data.rtnCode === 200) {
          let columns = result.data.data;
          columns.forEach((item) => {
            let obj = {
              label: item.foodName,
              valuekey: item.foodId,
              type: "number",
            };
            this.tablColumns.push(obj);
          });
          this.tablColumns.push({
            label: "Allergies",
            valuekey: "Allergies",
            type: "textarea",
          });
        }
        this.order.orderDetailList.push(this.initRow());
      });
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
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
      const arr = this.order.orderDetailList.map((x) => x[prop]);
      if (arr.length > 0) {
        arr.push(label);
        return this.getMaxLength(arr) + 100 + "px";
      }
      return 100 + "px";
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

    initRow() {
      const newRow = {};

      this.tablColumns.forEach((column) => {
        if (column.type === "number") {
          newRow[column.valuekey] = 0;
        } else {
          newRow[column.valuekey] = "";
        }
      });

      return newRow;
    },
    addRow() {
      // 添加一行数据
      const newRow = this.initRow();
      this.order.orderDetailList.push(newRow);
    },
    resetRow(row) {
      Object.keys(row).forEach((key) => {
        console.log(key, key.indexOf("000"));
        if (key.indexOf("000") > -1) {
          row[key] = 0;
        } else {
          row[key] = "";
        }
      });
    },
    deleteRow(row) {
      console.log(row);
      // 删除行数据
      const index = this.order.orderDetailList.indexOf(row);
      console.log(index);
      if (index !== -1) {
        this.order.orderDetailList.splice(index, 1);
      }
    },
    getCustomFoodList(item) {
      console.log(item);
      let custom = {
        name: item.name,
        allergies: item.Allergies || "nothing",
        foodList: [],
      };
      for (let key in item) {
        if (!(key === "Allergies" || key === "name")) {
          let food = {
            foodId: key,
            foodNum: item[key] || 0,
          };
          custom.foodList.push(food);
        }
      }
      return custom;
    },
    submitForm() {
      let requestObj = {
        tel: this.order.tel,
        bookingDateTime: this.order.bookingDate + this.hour,
        bookingName: this.order.bookingName,
        bookingAddress: this.order.bookingAddress,
        edamame: this.order.edamame,
        gyoza: this.order.gyoza,
        additionalNotes: this.order.additionalNotes,
      };
      let orderList = [];
      this.order.orderDetailList.forEach((item) => {
        orderList.push(this.getCustomFoodList(item));
      });
      requestObj["orderDetailDtoList"] = orderList;
      axios
        .post("http://47.95.8.42:6002/api/order/submit", requestObj)
        .then((result) => {
          if (result.status == 200 && result.data.rtnCode === 200) {
            console.log("提交成功");
          }
        });
    },
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
.flex-ver {
  display: flex;
  flex-direction: column;
}
.app-container {
  flex: 1;
  padding: 0 5px;
  overflow: scroll;
}
.scroll-container {
  flex: 1;
  overflow: scroll;
}
.header-title {
  font-size: 24px;
  font-weight: bolder;
  height: 35px;
  line-height: 35px;
}
.el-table {
  margin-top: 10px;
  /* border-width: medium;
  font-size: 30px; */
}
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
  justify-content: space-around;
  height: 50px;
  padding: 5px;
}
.el-input__inner {
  /* font-size: 30px; */
  line-height: 20em;
}
.total-info {
  margin: 15px 0;
}

.buttonSubmit {
  width: 40%;
}
.buttonAdd {
  width: 40%;
}
.operate-button {
  margin: 0 5px;
}
.el-textarea__inner {
  font-size: 30px;
  padding: 0;
}

.base-info {
  height: 120px;
  padding: 10px;
}
.flex {
  display: flex;
}
.flex-ac {
  align-items: center;
}
.flex-jl {
  justify-content: left;
}
.flex-1 {
  flex: 1;
}
.label {
  font-size: 14px;
  width: 80px;
}
.addtion-title {
  font-weight: bold;
  margin: 5px 0;
}
</style>