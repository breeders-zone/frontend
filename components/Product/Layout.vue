<template>
  <div class="container">
    <div class="md:py-8 py-4">
      <div class="flex items-center mb-8">
        <h1 class="text-3xl font-bold mr-1">
          <slot name="headerTitle"/>
        </h1>
        <div class="text-sm text-gray-600">{{meta.page.total}}</div>
      </div>
      <slot name="headerFilter"/>
    </div>
    <div class="flex flex-wrap items-start">
      <slot name="filter" v-if="!$device.isMobile"/>
      <modal
        v-else
        classes="full-modal"
        name="filter"
        :scrollable="true"
        width="100%"
        height="100%"
      >
        <div class="py-3 border-b relative flex justify-center">
          <h3 class="font-bold">Фильтры</h3>
          <div class="absolute top-3 right-2.5">
            <FontAwesomeIcon icon="times" size="lg" @click="$modal.hide('filter')"/>
          </div>
        </div>
        <div class="container">
          <slot name="filter"/>
        </div>
      </modal>

      <div class="md:w-10/12 w-full">
        <div class="flex md:justify-end justify-between mb-3 md:px-2">
          <div class="md:mr-0 mr-2 md:w-3/12 w-full">
            <VueSelect
              @input="(val) => $router.push({
                path: $route.path,
                query: {
                  ...$route.query,
                  sort: val ? val.value : ''
                }
              })"
              :filterable="false"
              :searchable="false"
              placeholder="Сортировать по..."
              :options="sortOptions"
              :value="sortOptions.find((item) => item.value === sort)"
              :calculate-position="withPopper"
            />
          </div>
          <button
            v-if="$device.isMobile"
            @click="$modal.show('filter')"
            class="shadow text-sm font-bold inline-block rounded-lg p-2 cursor-pointer duration-200 transition bg-white hover:bg-gray-100"
          >
            <FontAwesomeIcon icon="sliders-h" size="lg"/>
          </button>
        </div>
        <div class="flex flex-wrap">
          <ProductCard
            v-for="product in products"
            :key="'product-' + product.id"
            :product="product"
          />
        </div>
      </div>
      <div class="md:w-10/12 w-full ml-auto pt-3">
        <Pagination :currentPage="meta.currentPage" :lastPage="meta.lastPage"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import {withPopper} from "~/utils";

  export default Vue.extend({
    data: () => ({
      sortOptions: [{label: 'Сначала дешевле', value: 'price'}, {label: 'Сначала дороже', value: '-price'}],
    }),

    methods: {
      withPopper
    },

    props: {
      products: Array as () => Array<any>,
      meta: Object,
      sort: String
    }
  });
</script>