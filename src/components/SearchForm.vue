<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { getCharacterNameList } from '@/functions/api'

interface Props {
  modelValue: SearchCondition
}
interface Emits {
  (e: 'update:modelValue', condition: SearchCondition): void
  (e: 'ready'): void
}
const props = defineProps<Props>()
const emits = defineEmits<Emits>()

const condition = computed({
  get: () => props.modelValue,
  set: (value) => emits('update:modelValue', value),
})

const targetCharacters = ref<string[]>([])
const loadCharacterNameList = async() => {
  const response = await getCharacterNameList()
  targetCharacters.value = response.names
}

onMounted(() => {
  loadCharacterNameList().then(() => {
    emits('ready')
  })
})
</script>

<template>
  <el-form ref="form" label-position="right" label-width="150px">
    <el-form-item label="タイトル">
      <el-input v-model="condition.title" placeholder="タイトル" />
    </el-form-item>
    <el-form-item label="公開日">
      <el-date-picker v-model="condition.startAt" type="date" value-format="YYYY-MM-DD" placeholder="検索対象開始日" /> 〜
      <el-date-picker v-model="condition.endAt" type="date" value-format="YYYY-MM-DD" placeholder="検索対象終了日" />
    </el-form-item>
    <el-form-item label="登場キャラクター">
      <el-select v-model="condition.characters" multiple filterable no-match-text="見つかりません" placeholder="登場キャラクター">
        <el-option v-for="(name, index) in targetCharacters" :key="index" :label="name" :value="name" />
      </el-select>
    </el-form-item>
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
