<template>
    <section>
        <searchform v-bind:title="title" v-bind:start_at="start_at" v-bind:end_at="end_at" v-bind:idols="idols"></searchform>
        <result v-for="result in results" v-bind:data="result"></result>
        <pager v-bind:count="count" v-bind:limit="limit" @change="changePage"></pager>
    </section>
</template>


<script lang="ts">
    import searchform from './components/search_form.vue';
    import result from './components/search_result.vue';
    import pager from './components/pager.vue';

    function getCurrentDate(): string {
        var now: Date  = new Date();
        var date: string = now.getFullYear() + "-";
        date += ("0" + (now.getMonth() + 1)).slice(-2) + "-";
        date += ("0" + now.getDate()).slice(-2);
        return date
    }

    export default {
        components: {
            "searchform": searchform,
            "result": result,
            "pager": pager
        },
        data: function () {
            return {
                title: "",
                start_at: "2011-11-28",
                end_at: getCurrentDate(),
                idols: [],
                results: [],
                count: 0,
                limit: 10
            };
        },
        mounted: function (): void {
            this.setParameters();
            this.getResults();
        },
        methods: {
            setParameters: function(): void {
                const parameters: URLSearchParams = new URLSearchParams(window.location.search);
                if(parameters.has("title")) {
                    this.title = decodeURIComponent(parameters.get("title").replace(/\+/g, " ");
                }
                if(parameters.has("start_at")) {
                    this.start_at = parameters.get("start_at");
                }
                if(parameters.has("end_at")) {
                    this.end_at = parameters.get("end_at");
                }
                if(parameters.has("idol")) {
                    this.idols = parameters.getAll("idol");
                }
                if(parameters.has("idols")) {
                    this.idols = parameters.getAll("idols");
                }
            },
            getResults(offset: number = 0) {
                let data: FormData = new FormData();

                if(this.title.length > 0) {
                    data.append("title", this.title);
                }
                for(let i = 0; i < this.idols.length; i++) {
                    data.append("idol", this.idols[i]);
                }
                data.append("start_at", this.start_at);
                data.append("end_at", this.end_at);
                data.append("limit", this.limit);
                data.append("offset", offset.toString());
                fetch("https://zaubermaerchen.info/imas_cg/api/cartoon/search/", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                    },
                    body: data,
                    mode: "cors",
                    credentials: "omit"
                }).then((response) => {
                    return response.json();
                }).then((json) => {
                    this.count = json.count;
                    this.results = json.results;
                })
            }
            changePage: function(offset: number): void {
                this.getResults(offset);
            }
        }
    }
</script>

<style>
    body {
        font-size: 80%;
    }
</style>