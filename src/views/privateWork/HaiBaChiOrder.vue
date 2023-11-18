<template>
  <div class="flex-ver">
    <div class="app-container">
      <div class="header-title">Hibachi Order Form</div>
      <div class="base-info">
      <el-row  >
        
        <el-col :span="12" class="flex">
          <span class="label">Booking Name：</span>
          <el-input class="flex-1" v-model="order.bookingName"></el-input>
        </el-col>

        <el-col :span="12" class="flex">
          <span class="label">Booking Address：</span>
          <el-input class="flex-1" v-model="order.bookingAddress"></el-input>
        </el-col>
      </el-row>
      <el-row style="margin:10px 0">
        <el-col :span="24" class="flex">
          <span class="label">Booking Date</span>
          <el-date-picker
            v-model="order.bookingDate"
            type="datetime"
            style="width:95%"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            prefix-icon=""
          >
          </el-date-picker>
        </el-col>
      </el-row>
      </div>
      <!-- 表格 -->
      <el-table
        :data="order.orderDetail"
        class="el-table"
        border
        fit
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
       
        <el-table-column v-for="column in tablColumns" :prop="column.valuekey" :key="column.label" :label="column.label" :width="flexColumnWidth(column.valuekey, column.label)">
          <template  slot-scope="scope" >
            <el-input v-if="column.type=='input'" v-model="scope.row[column.valuekey]"> </el-input>
            <el-input v-if="column.type=='textarea'" type="textarea" v-model="scope.row[column.valuekey]"> </el-input>
           <el-input-number v-else-if="column.type=='number'" size="small" :min="0" v-model="scope.row[column.valuekey]">
            </el-input-number>
          </template>
      </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="110px"
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
      tablColumns:[
      {
        label:'name',
        valuekey:'name',
        type:'input',
      },
      {
        label:'Veggie',
        valuekey:'F0001',
        type:'number',
      },
      {
        label:'Chicken',
        valuekey:'F0002',
        type:'number',
      },
      {
        label:'Shrimp',
        valuekey:'F0003',
        type:'number',
      },
      {
        label:'Steak',
        valuekey:'F0004',
        type:'number',
      },
        {
        label:'Salmon',
        valuekey:'F0005',
        type:'number',
      },
      {
        label:'Scallops',
        valuekey:'F0006',
        type:'number',
      },
      {
        label:'Filet +$8',
        valuekey:'F0007',
        type:'number',
      },
      {
        label:'Lobs +$15',
        valuekey:'F0008',
        type:'number',
      },
      {
        label:'Allergies',
        valuekey:'Allergies',
        type:'textarea',
      }
      ],
      order: {
        bookingDate: "",
        bookingName: "",
        bookingAddress: "",
        orderDetail: [],
      }, 
    };
  },
  created() {this.requestTableColumn()},
  methods: {
   requestTableColumn(){
    // TODO 请求获取tablColumns
    this.order.orderDetail.push(this.initRow())
   },
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
      const newRow = {}
      this.tablColumns.forEach(column=>{
        if(column.type==='number'){
          newRow[column.valuekey] =0
        }else{
          newRow[column.valuekey] =''
        }
      })
        return newRow;
    },
    addRow() {
      // 添加一行数据
      const newRow = this.initRow();
      this.order.orderDetail.push(newRow);
    },
    resetRow(row) {
      Object.keys(row).forEach(key=>{
        console.log(key,key.indexOf('000'))
        if(key.indexOf('000')>-1){
          row[key] = 0
        }else{
          row[key] = ''
        }
        })
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
    submitForm() {
      console.log(this.order)
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