<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { searchCartoon } from '@/functions/api'
import SearchForm from '@/components/SearchForm.vue'
import PageContent from '@/components/PageContent.vue'
import Cartoon from '@/components/Cartoon.vue'

interface SearchCondition {
  title?: string
  characters: string[]
  startAt?: string
  endAt?: string
}
const searchCondition = reactive<SearchCondition>({
  characters: [],
})

const response = ref<Api.SearchCartoonResponse | null>(null);
const page  = ref(1);
const limit = 10;

const search = async() => {
  const offset = (page.value - 1) * limit;
  response.value = await searchCartoon(
    searchCondition.title,
    searchCondition.characters,
    searchCondition.startAt,
    searchCondition.endAt,
    limit,
    offset
  )
}

const ready = (title: string | undefined, characters: string[], startAt: string | undefined, endAt: string | undefined) => {
  searchCondition.title = title
  searchCondition.characters = characters
  searchCondition.startAt = startAt
  searchCondition.endAt = endAt
}

watch([searchCondition, page], () => void search())
</script>

<template>
  <SearchForm @ready="ready" />

  <PageContent v-model="page" :total="response?.count ?? 0" :page-size="limit">
    <Cartoon v-for="(result, index) in response?.results" :key="index" :value="result" />
  </PageContent>
</template>
