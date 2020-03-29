<template>
  <div class="Out">
      <el-badge :value="list.length" class="badge">
        离职申请
      </el-badge>
      <i class="el-icon-circle-plus-outline" @click="moni"></i>
      <div class="li">
        <ul class="Apply" v-for="(item, index) in list" :key="index">
          <li>{{item.name}}<div style="float:right;margin-right:15px">{{item.date}}</div></li>
        </ul>
      </div>
  </div>
</template>

<script>
import { getApply } from 'network/get'
import { postApply } from 'network/post'

export default {
    data(){
      return{
        list: []
      }
    },
    methods: {
      getApply(){
        getApply("离职申请").then(res => {
          this.list = res.data
        })
      },
      moni(){
        const date = new Date()
        const newAplly = {
          id: this.list.length + 1,
          name: "跑得快申请",
          date: date,
          nature: "离职申请",
          content: "想辞职"
        }
        console.log(date)
      }
    },
    
    created(){
      this.getApply()
    },
}
</script>

<style scoped>
    .Out{
      height: 270px;
      padding-top: 10px;
    }
    .badge{
      margin-bottom: 15px;
      padding-left: 5px;
      margin-right: 10px;
    }
    .li{
      height: 230px;
      overflow: auto;
    }
    .Apply{
      font-size: 15px;
      line-height: 39px;
    }
    .Apply li{
      padding-left: 10px;
      list-style: none;
      border-bottom: dashed 1px #fff;
      background: #eee;
    }
</style>