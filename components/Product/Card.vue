<template>
  <div class="flex flex-col md:px-2 mb-2">
    <div class="flex flex-col shadow rounded-xl bg-white p-2 flex-1">
      <NuxtLink :to="`/category/${product.kind.slug}${product.subcategory ? `/${product.subcategory.slug}/` : '/'}${product.id}`" class="relative mb-2">
        <div v-if="!product.kind.onlyText" class="absolute flex bg-white shadow rounded top-2 right-2 p-1">
          <div v-if="!product.group || (product.group.male === 0 && product.group.female)">
            <FontAwesomeIcon v-if="product.sex === null" icon="genderless" class="text-xl"/>
            <FontAwesomeIcon v-if="!product.sex && product.sex !== null" icon="venus" class="text-xl" style="color: #c11f80;"/>
            <FontAwesomeIcon v-if="product.sex" icon="mars" class="text-xl" style="color: #3f81e5;"/>
          </div>
          <div v-else class="flex">
            <div>
              <span class="text-sm">{{product.group.male}}</span>
              <FontAwesomeIcon icon="mars" class="text-xl" style="color: #3f81e5;"/>
            </div>
            <span class="text-sm">.</span>
            <div>
              <span class="text-sm">{{product.group.female}}</span>
              <FontAwesomeIcon icon="venus" class="text-xl" style="color: #c11f80;"/>
            </div>
          </div>
          <div class="ml-1">
            '{{moment(product.cb).format('YY')}}
          </div>
        </div>
        <img :data-src="product.preview.imgSrc" alt="" class="img-fluid rounded lazyload">
      </NuxtLink>
      <div class="flex flex-col flex-1">
        <div v-if="!product.askPrice">
          <span class="text-red-500 font-bold text-lg">{{formatPrice()}}</span>
        </div>
        <NuxtLink
          :to="`/category/${product.kind.slug}${product.subcategory ? `/${product.subcategory.slug}/` : '/'}${product.id}`"
          :class="`block font-semibold text-sm mb-2 transition duration-200 hover:text-green-600 ${truncateName && 'truncate'}`"
        >
          {{product.name}}
        </NuxtLink>

        <div class="mt-auto">
          <button
            @click.prevent="send"
            class="text-sm text-white font-bold inline-block rounded-lg py-2 px-3 cursor-pointer duration-200 transition bg-green-600 hover:bg-green-700"
          >
            {{
              product.askPrice ?
                'Запросить цену'
                : 'Написать продавцу'
            }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, {PropType} from 'vue';
import {RUB, getPrice} from "~/utils";
import {IProduct} from "~/types";
import ChatSend from '~/components/Chat/Send';
import moment from "moment";


export default Vue.extend({
  name: "Card",

  methods: {
    getPrice,
    moment,
    formatPrice() {
      return RUB(getPrice(this.product.price))
    },

    send() {
      this.$modal.show(ChatSend, {product: this.product}, {
        adaptive: true,
        scrollable: true,
        height: 'auto'
      })
    }
  },

  props: {
    product: Object as PropType<IProduct>,
    truncateName: {
      type: Boolean,
      default: false
    }
  }
});
</script>
