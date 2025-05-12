<script setup lang="ts">
const email = ref("");
const password = ref("");

async function send() {
  try {
    const res = await $fetch("/api/auth/signup", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

async function debug() {
  try {
    const res = await $fetch("/api/test/test-roles");
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

async function cleartoken() {
  try {
    const res = await $fetch("/api/test/clear");
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

async function session() {
  try {
    const res = await $fetch("/api/user/update", {
      method: "POST",
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}

const updateTest = ref({
  email: "nmaniar",
  firstName: undefined,
  lastName: undefined,
  address: {
    street: undefined,
    city: undefined,
    state: undefined,
    zip: undefined,
  },
  phone: "",
});

async function updateUser() {
  try {
    const res = await $fetch("/api/user/update", {
      method: "POST",
      body: { ...updateTest.value },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <form action="">
    <input v-model="email" type="text" />
    <input v-model="password" type="text" />
    <button @click.prevent="send">Submit</button>
  </form>

  <button @click="debug">DEBUG</button>
  <p></p>
  <button @click="cleartoken">CLEAR</button>
  <p></p>
  <button @click="session">TEST SESSION</button>

  <form action="">
    <input
      v-model="updateTest.firstName"
      type="text"
      placeholder="First Name"
    />
    <input v-model="updateTest.lastName" type="text" placeholder="Last Name" />
    <input
      v-model="updateTest.address.street"
      type="text"
      placeholder="Street Address"
    />
    <input v-model="updateTest.address.city" type="text" placeholder="City" />
    <input v-model="updateTest.address.state" type="text" placeholder="State" />
    <input
      v-model="updateTest.address.zip"
      type="text"
      placeholder="Zip Code"
    />
    <input v-model="updateTest.phone" type="text" placeholder="Phone Number" />
    <button @click.prevent="updateUser">send update</button>
  </form>
</template>

<style scoped></style>
