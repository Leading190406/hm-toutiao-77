<template>
<div class='container'>
    <el-card class="my-card">
        <img src="../../assets/image/logo_index.png">
    </el-card>
</div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
    .container{
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(../../assets/image/login_bg.jpg) no-repeat center / cover
    }
    .my-card{
        width: 400px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%,-50%);
    img{
        display: block;
        width: 200px;
        margin: 0 auto;
    }
    }
//     .el-card__body{
//   background: red;
// }

</style>
