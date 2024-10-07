<template>
 <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-sm" style="width: 40%;">
            <div class="card-body">
                <h3 class="card-title text-center">Sign Up</h3>
                <h3>{{infoText}}</h3>
                <form  @submit.prevent="signup()">

                    <div class="mb-3">

                        <input v-model="firstname" type="text" class="form-control" id="firstname" placeholder="Enter first name">
                    </div>

                    <div class="mb-3">
                        <input v-model="lastname" type="text" class="form-control" id="lastname" placeholder="Enter last name">
                    </div>

                    
                    <div class="mb-3">
                        <input v-model="address" type="text" class="form-control" id="address" placeholder="Enter address">
                    </div>

                    
                    <div class="mb-3">
                        <input v-model="city" type="text" class="form-control" id="city" placeholder="Enter city">
                    </div>


                    <div class="mb-3">
                        <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email">
                    </div>

                    <div class="mb-3">

                        <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password">
                    </div>
                    

                    <button  @click="signup()" class="btn btn-primary w-100">Sign Up</button>     
                </form> 
            </div>
           
        </div>
    </div>

</template>


<script>
import { ref } from 'vue';
import axios from 'axios';
import { API_URL } from '@/config';
axios.defaults.baseURL = API_URL;

export default {
    name: 'SignUpComponent',
    setup() {
        const firstname = ref('');
        const lastname = ref('');
        const address = ref('');
        const city = ref('');
        const email = ref('');
        const password = ref('');
        const infoText = ref("");

        const validateForm = () => {
            if (firstname.value === '') {
                infoText.value = 'Please enter your first name';
                return false;
            }
            if (lastname.value === '') {
                infoText.value = 'Please enter your last name';
                return false;
            }
            if (address.value === '') {
                infoText.value = 'Please enter your address';
                return false;
            }
            if (city.value === '') {
                infoText.value = 'Please enter your city';
                return false;
            }
            if (email.value === '') {
                infoText.value = 'Please enter your email';
                return false;
            }
            if (password.value === '') {
                infoText.value = 'Please enter your password';
                return false;
            }
            return true;
        };

        const signup = async () => {
            if (!validateForm()) {
                return;
            }

    try{
        const response = await axios.get(`/user/${email.value}`);
        if(response.status === 200){
            infoText.value = 'Email already exists';
            return;
        }

    } catch (error) {
        console.error(error);
    }
    
    try {
    const response = await axios.post('/user/signup', {
      firstName: firstname.value,
      lastName: lastname.value,
      address: address.value,
      city: city.value,
      email: email.value,
      password: password.value,
    });

    if (response.status === 200) {
      infoText.value = 'Signup successful';
    } else{
        infoText.value = 'Signup failed';
    }

   


  } catch (error) {
    console.error(error);
  }
        };

        return {
            firstname,
            lastname,
            address,
            city,
            email,
            password,
            infoText,
            signup,
            validateForm
        };
    }
};
</script>