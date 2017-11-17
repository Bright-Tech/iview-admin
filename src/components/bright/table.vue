<template>
    <div class="vue-table-container">
        <slot name="search" v-if="showFilter">
            <div class="row form-horizontal">
                <div class="col-sm-12">
                    <div class="input-group">
                        <input placeholder="请输入关键词" class="input-sm form-control" name="keyword" type="text"
                               v-model="queryString" v-on:keyup.enter="search">
                        <span class="input-group-btn">
                            <button type="button" class="btn btn-sm btn-primary" @click="search">检索</button>
                        </span>
                    </div>
                </div>
            </div>
        </slot>
        <div class="table-container">
            <table class="table-hover">

                <slot name="theader" solt="header" ></slot>

                <slot name="tbody" v-for="item in dataSource.items" :item="item"></slot>

            </table>
        </div>
        <div class="widget-toolbox padding-10 clearfix">
            <pagination :page-count="dataSource.pageCount"
                        :total="dataSource.total"
                        :current-page="dataSource.currentPage" @goPage="goPage"></pagination>
        </div>
    </div>
</template>
<style scoped>

</style>
<script>
  import table from '../bootstrap4/table.vue'
  import pagination from '../bootstrap4/pagination.vue'

  export default {
    components: {
      table,
      pagination
    },
    props: {
      showFilter: {
        type: Boolean,
        default: true
      },
      dataSource: {
        type: Object,
        default: []
      },
      tableClass: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        queryString: ''
      }
    },
    methods: {
      search: function () {
        let self = this
        self.dataSource.fetch({query: self.queryString})
      },
      goPage: function (event) {
        let self = this
        self.dataSource.fetch({page: event.page, query: self.queryString})
      }
    }
  }
</script>
