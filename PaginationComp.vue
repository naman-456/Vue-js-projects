<template>
    <div>
      
      <div class="pagination-comp" v-if="metaData && metaData.length">
         <div class="material-symbols-outlined icon-arrow-left">arrow_back_ios</div>
         <template v-for="i in metaData[0].total_pages" :key="i">
             <div class="page-container"  @click="pageSelect(i)" v-if="(i <= 6) || (i == metaData[0].total_pages)" :class="{active: (selectedPage == i)}">
                <span>{{i}}</span>
             </div>
             <div class="page-container" v-else-if="i == 7">
                <span>...</span>
             </div>
         </template>
         <div class="material-symbols-outlined icon-arrow-right">arrow_forward_ios</div>
      </div> 
    </div>
    
</template>

<script>
 export default{
     data(){
        return{
            selectedPage: 1
        }
     },
     props: ['metaData'],
     methods:{
        pageSelect(val){
            this.selectedPage = val;
            this.$emit('slct-page', val);
        }
     }
 }
</script>

<style scoped>
.page-container{
    width: 3em;
    height: 2em;
    background-color:rgb(183, 232, 251);
    border-radius: 5px;
    margin-top: 1em;
    margin-right: 0.5em;
    padding-top: 1em;
}
.pagination-comp{
    display:flex;
    justify-content: flex-end;
}
.page-container:hover{
    background-color: blue;
    color: #ffffff;
    cursor: pointer;
}
.active{
    background-color: blue;
    color: #ffffff;
}
.icon-arrow-left{
    width: 3em;
    height: 2em;
    margin-top: 1em;
    display: flex;
    justify-content: flex-end;
    font-size:1.5em;
    cursor: pointer;
}
.icon-arrow-right{
    width: 3em;
    height: 2em;
    margin-top: 1em;
    display: flex;
    justify-content: flex-start;
    font-size:1.5em;
    cursor: pointer;
}
</style>
