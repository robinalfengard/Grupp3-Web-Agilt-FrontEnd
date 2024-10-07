<template>
 <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card shadow-sm" style="width: 40%;">
            <div class="card-body">
                <h3 class="card-title text-center">Sign Up</h3>
                <form>

                    <div class="mb-3">

                        <input type="text" class="form-control" id="firstname" placeholder="Enter first name">
                    </div>

                    <div class="mb-3">
                        <input type="text" class="form-control" id="lastname" placeholder="Enter last name">
                    </div>

                    
                    <div class="mb-3">
                        <input type="text" class="form-control" id="address" placeholder="Enter address">
                    </div>

                    
                    <div class="mb-3">
                        <input type="text" class="form-control" id="city" placeholder="Enter city">
                    </div>



                    <div class="mb-3">
                        <input type="email" class="form-control" id="email" placeholder="Enter email">
                    </div>

                    <div class="mb-3">

                        <input type="password" class="form-control" id="password" placeholder="Enter password">
                    </div>




                    <button type="submit" class="btn btn-primary w-100">Sign Up</button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'SignUpComponent',

  }
</script>