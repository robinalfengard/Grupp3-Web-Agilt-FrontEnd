<template>
    <body>
        <!-- This is just to test that the name is updated -->
        <h2>Hello {{ user.firstName }}</h2>
    </body>
</template>


<script>
export default {
    name: 'HomeComponent',

    setup(){
    const user = JSON.parse(localStorage.getItem('user'));
    return { user };
  },
  }
</script>