<template>
    <form method="get">
        <table>
            <tr>
                <th>タイトル</th>
                <td>
                    <input type="search" name="title" size="50" v-bind:value="title" />
                </td>
            </tr>
            <tr>
                <th>公開日</th>
                <td>
                    <input type="date" name="start_at" v-bind:value="start_at" /> 〜
                    <input type="date" name="end_at" v-bind:value="end_at" />
                </td>
            </tr>
            <tr>
                <th>登場キャラクター</th>
                <td>
                    <input type="hidden" name="character" v-for="name in selected_characters" v-bind:value="name" />
                    <v-select name="name" v-model="selected_characters" v-bind:options="character_names" multiple="multiple"></v-select>
                </td>
            </tr>
        </table>
        <p>
            <input type="submit" value="検索" />
        </p>
    </form>
</template>

<script lang="ts">
    import vSelect from 'vue-select'


    export default {
        components: {
            'v-select': vSelect
        },
        data: function () {
            return {
                selected_characters: [],
                character_names: [],
            };
        },
        props: [
            "title",
            "start_at",
            "end_at",
            "characters",
        ],
        mounted: function (): void {
            fetch("https://zaubermaerchen.info/imas_cg/api/idol_name/list/", {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                },
                mode: "cors",
                credentials: "omit"
            }).then((response) => {
                return response.json();
            }).then((json) => {
                this.character_names = json.names;
            })
        },
        watch: {
            characters: {
                handler(val) {
                    this.selected_characters = val;
                }
            }
        }
    }
</script>

<style scoped>
    input {
        border-radius: 3px;
        box-shadow: none;
        border: 1px solid #bbbbbb;
    }
    button {
        border-radius: 3px;
        box-shadow: none;
        border: 1px solid #bbbbbb;
    }
    input[name="title"] {
        padding: 0.5em 2px;
        width: 30em;
    }
    select#idols {
        width: 30em;
    }
    input[type="date"] {
        padding: 0.3em 2px;
    }
    input[type="submit"] {
        padding: 3px 5px;
    }
</style>