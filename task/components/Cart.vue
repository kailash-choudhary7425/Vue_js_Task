<template>
  <div class="container">
    <div class="text-success my-4 text-center"><h5>My Cart</h5></div>
    <div class="row">
      <div class="col" v-for="data in cartData" :key="data.id">
        <div>
          <img :src="data.image" alt="">
        </div>
        <p>{{data.name}}</p>
        <p class="text-center">${{data.price}}</p>
          <div class="d-flex text-center ps-5">
            <button class="m-2" @click="increment(data)">+</button>
            <input type="number" @input="changeQty(data)" min="0" v-model="data.qty" class="form-control qty mt-2" />
            <button class="m-2" :disabled="data.qty<1"  @click="decrement(data)">-</button>
          </div>
      </div>
    </div>
    <div class="text-danger text-center my-4">Cart Total: ${{cartTotal}}</div>
    <div class="my-2 text-success text-center"><h5>Upload File Section</h5></div>
    <div class="text-center">
      <div
      v-if="previewImage"
      class="imagePreviewWrapper"
      :style="{ 'background-image': `url(${previewImage})` }">
    </div>
 
    <input
      class="my-5"
      ref="fileInput"
      type="file"
      @input="pickFile">
      <button @click="removeFile">Remove File</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      cartData: [
        {
          image: "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/81RHHnGydgL._SL1500_.jpg",
          name: "Sample Laptop Product s1-11",
          price: 50,
          qty: 1,
          total: 50
        },
        {
          image: "https://m.media-amazon.com/images/I/41vaplE4LEL._AC_SR160,160_.jpg",
          name: "Samsung Product s1-11",
          price: 150,
          qty: 1,
          total: 150
        },
        {
          image: "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/41OaM+9ZHXL._AC_SR160,160_.jpg",
          name: "Nokia Product s1-11",
          price: 200,
          qty: 1,
          total: 200
        },
        {
          image: "https://m.media-amazon.com/images/W/WEBP_402378-T2/images/I/413c3ZnFLxL._AC_SR160,160_.jpg",
          name: "Vivo Product s1-11",
          price: 500,
          qty: 1,
          total: 500
        }
      ],
      previewImage: ''
    }
  },
  computed: {
    cartTotal() {
      let newArr = this.cartData.map((val) => val.total)
      return newArr.reduce((total, num) =>  total+num);
    }
  },
  methods: {
    pickFile () {
      let input = this.$refs.fileInput
      let file = input.files
      if (file && file[0]) {
        let reader = new FileReader
        reader.onload = e => {
          this.previewImage = e.target.result
        }
        reader.readAsDataURL(file[0])
        this.$emit('input', file[0])
      }
    },
    removeFile() {
      this.previewImage ='';
      this.$refs.fileInput.value = null;
    },
    increment(val) {
      val.qty++;
      this.changeQty(val)
    },
    decrement(val) {
      val.qty--;
      this.changeQty(val)
    },
    changeQty(val) {
      val.total = val.price * val.qty;
    }
  }
}
</script>

<style scoped>
.imagePreviewWrapper {
    border: 1px solid rgb(211, 198, 198);
    border-radius: 3px;
    width: 150px;
    height: 150px;
    display: block;
    cursor: pointer;
    margin: 0 auto 30px;
    background-size: cover;
    background-position: center center;
}
.product_main {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 2rem;
}

img {
    MAX-WIDTH: 100%;
    height: 105px;
    width: 210px;
    object-fit: contain;
}

.product {
    border: 1px solid #DDD;
    padding: 1rem;
}

button {
    border: none;
    padding: 10px;
    border-radius: 4px;
    color: rgb(32, 22, 22);
    font-size: 16px;
    margin-top: 14px;
    cursor: pointer;
}
.product_name {
    -webkit-box-orient: vertical;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    overflow: hidden;
    margin-bottom: 8px;
}

.prodcut_price {
    text-align: center;
    font-weight: 600;
    font-size: 18px;
}
.qty {
  width: 30%;
  height: 40px;
}
</style>