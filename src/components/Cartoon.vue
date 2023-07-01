<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  value: Api.Cartoon
}

const props = defineProps<Props>()

const getGameUrl = (path: string) => new URL(`${import.meta.env.VITE_GAME_SERVER_URL}${path}`)
const getMobageUrl = (gameUrl: URL) => {
  const mobageUrl = new URL(import.meta.env.VITE_MOBAGE_APP_URL)
  mobageUrl.searchParams.append('url', gameUrl.href)

  return mobageUrl
}
const thumbnailImageUrl = computed(() => {
  const path = `cartoon/${props.value.id}/${props.value.thumbnail_hash}.jpg`;
  return `${import.meta.env.VITE_GAME_SERVER_URL}${path}`;
})

const cartoonLinkUrl = computed(() => {
  const gameUrl = getGameUrl(`cartoon/scene/${props.value.id}`)

  return getMobageUrl(gameUrl).href
})
</script>

<template>
  <el-container class="result">
    <el-aside width="180px">
      <img width="180" height="205" :src="thumbnailImageUrl" />
    </el-aside>
    <el-container>
      <el-header>
        <a :href="cartoonLinkUrl">
          第<span>{{ value.id }}</span>話
          「<span>{{ value.title }}</span>」
        </a>
      </el-header>
      <el-main>
        <h2>公開日</h2>
        <p>{{ value.date }}</p>

        <h2>登場アイドル</h2>
        <ul>
          <li v-for="(name, index) in value.characters" :key="index"><a :href="'?character=' + name">{{ name }}</a></li>
        </ul>

        <h2>備考</h2>
        <p>{{ value.comment }}</p>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
  .result {
    margin: 1em 0;
    display: -webkit-box;
    display: flex;
    align-items: center;
  }

  .result > .el-container  {
    margin: 0 0.25em;
    padding: 5px;
    background-color: #eeeeee;
    border-radius: 0.5em;
  }
  .result > .el-container > *  {
    padding: 0;
  }
  .result > .el-container > .el-header {
    font-size: 120%;
    font-weight: bold;
    margin: 0 0 0.5em 0;
    height: auto!important;
  }
  .result > .el-container > .el-main > h2 {
    font-size: 100%;
    margin: 0;
  }
  .result > .el-container > .el-main > p,
  .result > .el-container > .el-main > ul {
    margin: 0 0 0.5em 0;
    padding: 5px;
    background-color: #ccccff;
    border-radius: 0.5em;
  }
  .result > .el-container > .el-main > ul {
    display: -webkit-box;
    display: flex;
    flex-wrap: wrap;
  }
  .result > .el-container > .el-main > ul > li {
    list-style-type: none;
    display: inline;
    padding-right: 0.5em;
  }
</style>
