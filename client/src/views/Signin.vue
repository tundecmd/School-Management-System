<template>
    <div>
        <h2>Login</h2>
        <div class="row">
            <div class="card mx-auto">
                <div class="card-header text-white bg-primary">
                    <h4>Login</h4>
                </div>
                <div class="card-body">
                    <form @submit.prevent="handleSignin">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input 
                                id="email"
                                type="email" 
                                placeholder="Username" 
                                name="email" 
                                v-model="email" 
                                class="form-control"
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input 
                                id="password"
                                type="password" 
                                placeholder="Password" 
                                name="password" 
                                v-model="password" 
                                class="form-control"
                            />
                            <button class="btn btn-primary">Sign in</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <router-link to="/signup" class="card-link">Need an account?</router-link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            email: "",
            password: ""
        }
    },
    methods: {
        ...mapActions(["signin"]),
        handleSignin () {
            console.log(this.email, this.password)
            let student = {
                email: this.email,
                password: this.password
            };
            this.signin(student)
                .then(res => {
                    if (res.data) {
                        console.log('data received')
                        this.$router.push("/profile")
                    }
                }).catch(err => {
                    console.log(err)
                })
        }
    }
}
</script>
<style>
    .card {
        width: 60%;
        border-radius: 0;
    }
    .btn {
        border-radius: 0;
    }
    .form-control {
        border-radius: 0;
    }
</style>