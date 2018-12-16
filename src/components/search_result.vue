<template>
    <div class="result">
        <div class="thumbnail">
            <img width="180" height="205" v-bind:src="getThumbnailUmageUrl()" />
        </div>
        <div class="detail">
            <h1>
                <a v-bind:href="getUrl()">
                    第<span>{{ getId() }}</span>話
                    「<span>{{ getTitle() }}</span>」
                </a>
            </h1>

            <h2>公開日</h2>
            <p>{{ getDate() }}</p>

            <h2>登場アイドル</h2>
            <ul class="charcters">
                <li v-for="name in getCharacters()"><a v-bind:href="'?character=' + name">{{ name }}</a></li>
            </ul>

            <h2>備考</h2>
            <p>{{ getComment() }}</p>
        </div>
    </div>
</template>

<script lang="ts">
    function getBaseUrl(path: string): string {
        return "http://125.6.169.35/idolmaster/" + path;
    }
    function getGameUrl(path: string): string {
        const url = getBaseUrl(path);
        return "http://sp.pf.mbga.jp/12008305/" + "?url=" + encodeURIComponent(url);
    }

    export default {
        props: [
            "data"
        ],
        methods: {
            getId(): number {
                return parseInt(this.data.id);
            },
            getDate(): String {
                return this.data.date;
            },
            getTitle(): String {
                return this.data.title;
            },
            getCharacters(): String[] {
                return this.data.characters;
            },
            getThumbnailHash(): String {
                return this.data.thumbnail_hash;
            },
            getComment(): String {
                return this.data.comment;
            },
            getUrl(): string {
                return getGameUrl("cartoon/scene/" + this.getId());
            },

            getThumbnailUmageUrl(): string {
                return getBaseUrl("media/image_sp/cartoon/" + this.getId() + "/" + this.getThumbnailHash() + ".jpg");
            },
        }
    };
</script>

<style scoped>
    .result {
        margin: 0 0 1em 0;
        display: -webkit-box;
        display: flex;
        align-items: center;
    }

    .result > .detail {
        margin: 0 0.25em;
        padding: 5px;
        background-color: #eeeeee;
        border-radius: 0.5em;
        -webkit-box-flex : 1;
        -webkit-box-ordinal-group : 2;
        -webkit-flex-grow: 0;
        flex-grow: 1;
        -webkit-order: 1;
        order: 1;
    }

    .result > .thumbnail {
        margin: 0 0.25em;
        -webkit-box-ordinal-group : 1;
        -webkit-order: 0;
        order: 0;
    }
    .result > .detail > h1 {
        font-size: 120%;
        margin: 0 0 0.5em 0;

    }
    .result > .detail > h2 {
        font-size: 100%;
        margin: 0;
    }
    .result > .detail > p {
        margin: 0 0 0.5em 0;
        padding: 5px;
        background-color: #ccccff;
        border-radius: 0.5em;
    }
    .result > .detail > ul.charcters {
        display: -webkit-box;
        display: flex;
        flex-wrap: wrap;
        margin: 0 0 0.5em 0;
        padding: 5px;
        background-color: #ccccff;
        border-radius: 0.5em;
    }
    .result > .detail > ul.charcters > li {
        list-style-type: none;
        display: inline;
        padding-right: 0.5em;
    }
</style>