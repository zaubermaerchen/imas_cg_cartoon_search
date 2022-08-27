<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getCharacterNameList } from '@/functions/api';

interface Emits {
  (e: 'ready', title: string | undefined, characters: string[], startAt: string | undefined, endAt: string | undefined): void
}
const emits = defineEmits<Emits>();

const title = ref('');
const startAt = ref('');
const endAt = ref('');
const characters = ref<string[]>([]);

const targetCharacters = ref<string[]>([]);
const loadCharacterNameList = async() => {
  const response = await getCharacterNameList();
  targetCharacters.value = response.names;
}

const getCurrenetDate = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium' })

  return formatter.format(now).replace(/\//g, '-')
}

const setConditions = () => {
  const parameters: URLSearchParams = new URLSearchParams(window.location.search);
  title.value = parameters.get('title') ?? ''
  startAt.value = parameters.get('start_at') ?? '2011-11-28'
  endAt.value = parameters.get('end_at') ?? getCurrenetDate()
  characters.value = parameters.getAll('character')
}

onMounted(() => {
  loadCharacterNameList().then(() => {
    setConditions();
    emits('ready', title.value || undefined, characters.value, startAt.value || undefined, endAt.value || undefined)
  })
})
</script>

<template>
  <el-form ref="form" label-position="right" label-width="150px">
    <el-form-item label="タイトル">
      <el-input v-model="title" name="title" placeholder="タイトル" />
    </el-form-item>
    <el-form-item label="公開日">
      <el-date-picker v-model="startAt" name="start_at" type="date" placeholder="検索対象開始日" /> 〜
      <el-date-picker v-model="endAt" name="end_at" type="date" placeholder="検索対象終了日" />
    </el-form-item>
    <el-form-item label="登場キャラクター">
      <el-select v-model="characters" multiple filterable no-match-text="見つかりません" placeholder="登場キャラクター">
        <el-option v-for="(name, index) in targetCharacters" :key="index" :label="name" :value="name" />
      </el-select>
      <input v-for="(character, index) in characters" :key="index" :value="character" type="hidden" name="character" />
    </el-form-item>
    <el-button type="primary" native-type="submit">検索</el-button>
  </el-form>
</template>

<style scoped>
  .el-form {
    margin-bottom: 1em;
  }
  .el-select {
    width: 100%;
  }
</style>
