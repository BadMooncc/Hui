<template>
  <div>
    <b>时间：{{ 1534054721000 | formatDate('YYYY-MM-DD') }}</b>
    <b>默认: {{ 1534054721000 | formatDate }}</b>

    <p>{{ 18003717997 | formatTel }}</p>

    <p>{{ 'today' | toUpperCase}}</p>
  </div>
</template>
<script>
export default {
  name: 'FormatDate'
}
</script>
