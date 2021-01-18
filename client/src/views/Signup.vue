<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label>Name:</label>
            <input type="text" required v-model="name">

            <label>Email:</label>
            <input type="text" required v-model="email">

            <label>Password:</label>
            <input type="password" required v-model="password">
            <div class="error" v-if="passwordError">{{ passwordError }}</div>

            <label>Gender:</label>
            <select v-model="gender">
                <option value="male">Male</option>
                <option value="female">Female</option>
            </select>

            <label>Age:</label>
            <input type="number" min="16" max="45" required v-model="age">

            <label>Username:</label>
            <input type="text" required v-model="username">

            <div class="terms">
                <input type="checkbox" requred v-model="terms">
                <label>Accept terms and conditions</label>
            </div>
            <button>
                Create an Account
            </button>
        </form>
        <p>Name: {{ name }}</p>
        <p>Email: {{ email }}</p>
        <p>Password: {{ password}}</p>
        <p>Gender: {{ gender }}</p>
        <p>Age: {{ age }}</p>
        <p>Username: {{ username }}</p>
        <p>Terms accepted: {{ terms }}</p>
    </div>
</template> 
<script>
export default {
    data() {
        return {
            name: "",
            username: "",
            email: "",
            password: "",
            gender: "",
            age: "",
            terms: false,
            passwordError: ''
        }
    },
    methods: {
        handleSubmit() {
            // validate password
            this.passwordError = this.password.length > 5 ? 
                "" : "Password must be at least six(6) chars long!!!"

            const studentObj = {
                email: this.email,
                name: this.name,
                username: this.username,
                password: this.password,
                gender: this.gender,
                age: this.age,
                terms: this.terms,
                passwordError: this.passwordError
            }

            if (!this.passwordError) {
                console.log('studentObj', studentObj)
            }
        }
    }
}
</script>
<style>
    form {
        max-width: 420px;
        margin: 30px auto;
        background: white;
        text-align: left;
        padding: 40px;
        border-radius: 10px;
    }
    label {
        color: #aaa;
        display: inline-block;
        margin: 25px 0 15px;
        font-size: 0.6em;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-weight: bold;
    }
    input, select {
        display: block;
        padding: 10px 6px;
        width: 100%;
        box-sizing: border-box;
        border: none;
        border-bottom: 1px solid #ddd;
        color: black;
    }
    input[type="checkbox"] {
        display: inline-block;
        width: 16px;
        margin: 0 10px 0 0;
        position: relative;
        top: 2px;
    }
    button {
        background: #0b6dff;
        border: 0;
        padding: 10px 20px;
        margin-top: 20px;
        color: white;
        border-radius: 20px;
    }
    .submit {
        text-align: center;
    }
    .error {
        color: red;
    }
</style>