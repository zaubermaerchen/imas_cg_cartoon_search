<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useRouter } from "vue-router"
import { searchCartoon } from '@/functions/api'
import SearchForm from '@/components/SearchForm.vue'
import PageContent from '@/components/PageContent.vue'
import Cartoon from '@/components/Cartoon.vue'

const router = useRouter()

const condition = reactive<SearchCondition>({
  title: '',
  characters: [],
  startAt: '',
  endAt: '',
})

const response = ref<Api.SearchCartoonResponse | null>(null)
const page  = ref(1)
const limit = 10

const getCurrenetDate = () => {
  const now = new Date()
  const formatter = new Intl.DateTimeFormat('ja-JP', { dateStyle: 'medium' })

  return formatter.format(now).replace(/\//g, '-')
}

const setConditions = () => {
  const parameters: URLSearchParams = new URLSearchParams(window.location.search)
  condition.title = parameters.get('title') ?? ''
  condition.startAt = parameters.get('start_at') ?? '2011-11-28'
  condition.endAt = parameters.get('end_at') ?? getCurrenetDate()
  condition.characters = parameters.getAll('character')
}

const search = async() => {
  const offset = (page.value - 1) * limit
  response.value = await searchCartoon(
    condition.title || undefined,
    condition.characters,
    condition.startAt || undefined,
    condition.endAt || undefined,
    limit,
    offset
  )

  const query: Record<string, string | string[]> = {}
  if (condition.title) {
    query['title'] = condition.title
  }
  query['characters'] = condition.characters
  if (condition.startAt) {
    query['start_at'] = condition.startAt
  }
  if (condition.endAt) {
    query['end_at'] = condition.endAt
  }
  router.replace({
    name: 'Index',
    query: query,
  })
}

const ready = () => {
  setConditions()
}

let stopPageWatch = watch(page, () => void search())
watch(condition, () => {
  stopPageWatch()
  page.value = 1
  stopPageWatch = watch(page, () => void search())
  void search()
})
</script>

<template>
  <SearchForm v-model="condition" @ready="ready" />

  <PageContent v-model="page" :total="response?.count ?? 0" :page-size="limit">
    <Cartoon v-for="(result, index) in response?.results" :key="index" :value="result" />
  </PageContent>
</template>
