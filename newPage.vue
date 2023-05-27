<template>
    <div>
        <table class="employee-table">
             <thead>
                  <tr>
                      <th class="emp-img"></th>
                      <th class="table-column">
                         <div><label for="Name">Name</label></div>
                         <div>
                            <input type="text" name="Name" v-model="username" @input="filterUsers(username)">
                         </div>
                      </th>
                      <th class="table-column">
                         <div><label for="Name">Nationality</label></div>
                         <div>
                             <select>
                                  <option>Saudi Arabia</option>
                                  <option>India</option>
                                  <option>Egypt</option>
                                  <option>United Arab Emirates</option>
                             </select>
                         </div>
                      </th>
                      <th class="table-column">Voucher Code</th>
                      <th class="table-column">
                          <div>Service Status</div>
                          <div>
                              <select name="" id="">
                                   <option>Completed</option>
                                   <option>Pending</option>
                              </select>
                          </div>
                      </th>
                  </tr>
             </thead>
             <tbody>
                <template v-if="usersData?.data && usersData.data.length">
                  <tr v-for="(user,i) in usersData.data" :key="i">
                       <td class="imgemp"><img :src="(user.image)? user.image: '-'"></td>
                       <td class="table-data">{{(user.name)? user.name: '-'}}</td>
                       <td class="table-data">{{(user.nationality)? user.nationality: '-'}}</td>
                       <td class="table-data">{{(user.voucher_code)? user.voucher_code: '-'}}</td>
                       <td class="table-data">{{user.service_status}}</td>
                  </tr>
                </template>
             </tbody>
        </table>
        <PaginationComp :metaData="metaData" @slct-page="selectPage"/>
        <div class="loading" v-if="loader"></div>
    </div>
</template>

<script setup> 
import PaginationComp from "../components/PaginationComp.vue"                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               
import {ref, onMounted, watch} from "vue";
import axios from "axios";
let usersData = ref([]);
const metaData = ref(null)
const token = "666cf7f455878a4af31103bb9f19c943dec109a0ca25933ac9d8ef319bd87ad079564d74c902de53e4df5efe13b8838ad3d9e483eb76411d0aabe93c9a96950796ec5a9a9a7cc41425d0004e39c34510925aee74cb3ba2648aa7ba5347abfdf4a4d9873f13a860f4e471cdd43a89335da0a59d8a253abff0d89519825100ef7435bb3b4ca28573ed1f7b69c8e662a2dcd796428f231a2c6cc2af6859fed62f08c2dbaa86d6b01ee93c256f4b7d6a0fc7d34de3a9d232c98408f60a359e03dc721b5942c81367e8dc1d6338f1b17565be5ecab90c5a31173708db26aa2fc460c42e6b4a1dec414d5d7295fcf201f2f4e995e0cc6272dd09878debc8052e94c29acaad8255b0236ca3e842975fcb1792805621be5272a511d75d56bf2d39d37e425967065aa6239d98a9747e3fa0a68ee3da1b19c9ba022e412e2110944695a14cfd8bcadd32507b50c36bba619d7242bc2a85ec123f840fe3c25acfb959ec64b355b06ad6fff838a6cd6ab8537b2a75d2003e864b4aa9d19eb10cc1ca6944a40f6c6aa42a8cc55ec6866abe887a83665385169ea7dfc1bd78e31bd5242992fd06";
const headers = {
      Authorization: token
};
const username = ref('')
let loader = ref(false);
let timer = ref(null);

watch(username , (newVal, oldVal) => {
    console.log("newVal :", newVal , "and old value :", oldVal);
    console.log("username :", username) 
})
onMounted(() => {
    getEmployees()
} )
function getEmployees(val){
    const req = {
               limit: 10,
               page: val? val: 1
           };
    if(username?.value)
        req.name = username.value;
    loader.value = true;
    axios.post("https://employeesuat.litedev.com/v1/company/listEmployee", req, { headers: headers}).then(
      (response) => {
           console.log("emp list res :", response);
           const res = response.data
           if(res.status == 1000){
                usersData.value = res.data;
                metaData.value = usersData.value.metadata;
           }
           else{
              usersData.value = {
                  data: [],
                  metadata : []
              }
           }
           loader.value = false;
      }
).catch((err) => {
      console.log(err)
})
}

function selectPage(val){
       console.log("page val :", val);
       getEmployees(val);
}

function filterUsers(val){
    val = String(val);
    if(val.charAt(0) == ' '){
        if(username.value == val)
            username.value = val.substring(1)
    }
    else if(val && val.length >= 3){
         if(timer.value) clearTimeout(timer.value)
         timer.value = setTimeout(() => {
            getEmployees()
         }, 500)
    }
    else if(val == ''){
        setTimeout(() => {
            getEmployees()
        }, 500)
    }
}


</script>

<style scoped>
table, th,td{
    border: 1px solid black;
    border-collapse: collapse;
}
.employee-table{
    display: block;
}
.employee-table thead , .employee-table tbody{
    display: block;
}
.table-column{
     width: 30%;
}
.emp-img{
    width: 15%;
}
.imgemp{
    width: 14.4%;
}
.table-data{
     width: 29.3%;
}
.imgemp img{
     width: 4em;
     height: 4em;
     border-radius: 40px;
     margin: 1em
}
.loading {background: radial-gradient(rgba(20, 20, 20,.2), rgba(0, 0, 0, .2));background: -webkit-radial-gradient(rgba(20, 20, 20,.2), rgba(0, 0, 0,.2));position: fixed;z-index: 99999;overflow: show;margin: auto;top: 0;left: 0;bottom: 0;right: 0;}
.loading:before {content:'';position: fixed;top: 50%;left: 50%;transform:translate(-50%, -50%);background:url("../assets/images/loader-white.svg") no-repeat;width: 90px; height: 90px;}
</style>