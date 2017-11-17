<!-- Table with pagination -->
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
            <table class="table table-hover">

                <slot name="theader"></slot>

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
<script>
  export default {
    props: {
      dataSource: {
        type: Object,
        default: []
      }
    },
    data: function () {
      return {}
    },
    methods: {}
  }
</script>
