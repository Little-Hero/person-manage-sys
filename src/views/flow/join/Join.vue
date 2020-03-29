<template>
  <div class="Join">
      <el-badge :value="list.length" class="badge">
        入职申请
      </el-badge>
      <div class="li">
        <ul class="Apply" v-for="(item, index) in list" :key="index">
          <li>{{item.name}}<div style="float:right;margin-right:15px">{{item.date}}</div></li>
        </ul>
      </div>
    <div>

    </div>
  </div>
</template>

<script>
import { getApply } from 'network/get'

export default {
    data(){
      return{
        list: []
      }
    },
    methods: {
      getApply(){
        getApply("入职申请").then(res => {
          this.list = res.data
        })
      }
    },
    created(){
      this.getApply()
    }
}
</script>

<style scoped>
    .Join{
      height: 290px;
      /* background: #eee; */
      border-bottom: #eee;
    }
    .badge{
      margin-bottom: 15px;
      padding-left: 5px;
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