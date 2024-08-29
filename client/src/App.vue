
<template>
  <div v-if="!isLogin">
    <div>
      <p>用户名：<input type="text" placeholder="username" v-model="username"/></p>
      <p>密码：<input type="password" placeholder="password" v-model="password"/></p>
      <button @click="login">登陆</button>
    </div>
  </div>
  <div v-else>
    <button @click="getCustomerInfo">获取用户信息</button>
    <div v-if="customerInfo">
      <p>用户名：{{customerInfo.name}}</p>
      <p>用户Id：{{customerInfo.id}}</p>
      <p>年龄：{{customerInfo.age}}</p>

    </div>
  </div>
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios';

    let isLogin = ref(false)
    let username = ref('');
    let password = ref('');
    let customerInfo = ref(null);

    onMounted(() => {
      let access_token = localStorage.getItem('access_token');
      if(access_token){
        isLogin.value = true;
      }
    })

    const login = async() => {
        if(username.value.length<5){
          alert('用户名最少5位')
          return;
        }
        if(password.value.length<5){
          alert('密码最少5位')
          return;
        }
        let {data} = await axios.post('http://localhost:5050/auth/login', {
            username: username.value,
            password: password.value 
        })
        console.log('datat::', data);
        if(data.code === 0){
          let { access_token, refresh_token } = data.data;
          localStorage.setItem('access_token', access_token);
          localStorage.setItem('refresh_token', refresh_token);
          isLogin.value = true;
        }
    }

    const getCustomerInfo = async () => {
        let {data} = await axios({
            url: 'http://localhost:8080/api/customer',
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token')
            },
            data: {
              userId: 1
            },
            method: 'post'
        })
        console.log('datat::', data);
        if(data.code === 0){
          customerInfo.value = data.data;
          return;
        }
        if(data.code === 2){
          refreshToek(data => {
            if(data.code === 2){
              // 说明刷新的token也失效了  
              isLogin.value = false;
              localStorage.clear();
              return;
            }

            const { access_token, refresh_token} = data.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);
            getCustomerInfo();
          })
        }
    }

    async function refreshToek(callback){
      const { data } = await axios({
        url: 'http://localhost:5050/auth/refresh',
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('refresh_token')
        },
        method: 'post'
      })

      callback && callback(data);
    }
</script>