<template>

    <div class="fourToFour">
        <div style="margin: 0 auto "align="center">
            <img src="../../assets/img/404.png" alt="">
        </div>
    </div>

</template>
<style>
    .fourToFour{
        width: 100%;
        margin-top: 260px;
        min-height: 400px;
    }
</style>
<script>
    export default{
        data(){
            return{
                msg:'hello vue'
            }
        },
      mounted(){
        document.title ="404_诚壹财富顾问";
          alert("window.location.href --------->"+window.location.href );
      }

    }
</script>
