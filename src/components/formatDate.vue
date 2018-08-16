<template>
  <div>
    <b>时间：{{ 1534054721000 | formatDate('YYYY-MM-DD') }}</b>
    <b>默认: {{ 1534054721000 | formatDate }}</b>

    <p>{{ 18003717997 | formatTel }}</p>

    <p>{{ 'today' | toUpperCase}}</p>

    <p>{{ 410181199611296519 | formatIdCard }}</p>

    <p>{{ '6217002430030521570' | formatBankCard }}</p>
  </div>
</template>
<script>
export default {
  name: 'FormatDate'
}
</script>
