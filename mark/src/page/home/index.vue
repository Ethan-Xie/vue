<template>
  	<div class="home_container">
        <!-- <font color = 'green' >green</font> -->
        <itemcontainer father-component="home"></itemcontainer>
    </div>
</template>

<script>
import itemcontainer from '../../components/itemcontainer'

console.log(itemcontainer)

export default {
	name: 'home',
  	components: {
  		'itemcontainer':itemcontainer
  	},
    created(){
        
    }
}
</script>

<style lang="less" scoped>
    .home_container{

    }
</style>
