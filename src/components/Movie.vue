<template>
  <div :class="['movie', { isAdd: movie.isAdd }]" v-if="searchedMovie">
    <img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      class="movie-img"
    />
    <div>
      <div class="movie-name">
        {{ movie.original_title }} ({{ movie.release_date }})
      </div>
      <span class="movie-overview">{{ movie.overview }}</span>
      <div class="movie-buttons">
        <button
          class="btn movie-buttons-add"
          @click="checkMovie(movie.id), (movie.isAdd = true)"
        >
          Add
        </button>
      </div>
    </div>
  </div>
  <div :class="['movie', { isFavourite: movie.isFavourite }]" v-else>
    <img
      :src="`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`"
      :alt="movie.original_title"
      class="movie-img"
    />
    <div>
      <div class="movie-text">
        <div class="movie-name">
          {{ movie.original_title }} ({{ movie.release_date }})
        </div>
        <div class="movie-overview">{{ movie.overview }}</div>
      </div>
      <div class="movie-buttons">
        <button
          @click="movieStore.favouriteToggle(movie.id)"
          :class="[
            'btn',
            'movie-buttons-watched',
            { 'movie-buttons-favAdd': !movie.isFavourite },
          ]"
        >
          <span v-if="!movie.isFavourite">Favourite</span>
          <span v-else>Kick</span>
        </button>
        <button
          class="btn movie-buttons-delete"
          @click="movieStore.deleteMovie(movie.id)"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMovieStore } from "../stores/movieStore";
import { useSearchStore } from "../stores/searchStore";

const emit = defineEmits(["alertMovie"]);

const movieStore = useMovieStore();
const searchStore = useSearchStore();

const props = defineProps({
  movie: {
    type: Object,
    required: true,
    default: () => {},
  },
  searchedMovie: Boolean,
});

function checkMovie(id) {
  let movieHasAdded = movieStore.getMovie(id);
  if (!movieHasAdded) {
    searchStore.addMovieToWatched(id);
  } else {
    emit("alertMovie");
  }
}
</script>

<style lang="scss" scoped>
.movie {
  display: grid;
  grid-template-columns: 200px 1fr;
  column-gap: 30px;
  margin-bottom: 20px;
  border: 2px solid #efefef;
  padding: 10px;
  box-shadow: #1eb4c3 0px 0px 15px;
  transition: 0.3s;

  &.isAdd {
    box-shadow: peru 0px 0px 15px;
    .movie-buttons-add {
      color: #fff;
      background: peru;
    }
  }

  &.isFavourite {
    box-shadow: none;
    .movie-text {
      background: radial-gradient(
          ellipse farthest-corner at right bottom,
          #fedb37 0%,
          #fdb931 8%,
          #d89e22 30%,
          #b0841e 40%,
          transparent 80%
        ),
        radial-gradient(
          ellipse farthest-corner at left top,
          #ffffff 0%,
          #ffffac 8%,
          #d1b464 25%,
          #ae8526 62.5%,
          #8c6f2c 100%
        );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    background: #0b1826;
  }

  &-accept {
    margin-right: 10px;
  }

  &-img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }

  &-name {
    display: flex;
    align-items: center;
    font-size: 20px;
    margin-bottom: 20px;
  }

  &-overview {
    display: block;
    margin-bottom: 20px;
  }

  &-buttons {
    display: flex;
    gap: 10px;

    &-watched {
      color: #fff;
      background: #1fd1f9;
      background-image: linear-gradient(315deg, #1fd1f9 0%, #b621fe 74%);
      &__icon {
        width: 15px;
        margin-left: 10px;
      }
    }

    &-delete {
      color: #fff;
      background: radial-gradient(
        circle at 50.4% 50.5%,
        rgb(251, 32, 86) 0%,
        rgb(135, 2, 35) 90%
      );
    }

    &-add {
      color: #fff;
      background: linear-gradient(to right, rgb(52, 232, 158), rgb(15, 52, 67));
    }

    &-favAdd {
      background: radial-gradient(
          ellipse farthest-corner at right bottom,
          #fedb37 0%,
          #fdb931 8%,
          #9f7928 30%,
          #8a6e2f 40%,
          transparent 80%
        ),
        radial-gradient(
          ellipse farthest-corner at left top,
          #ffffff 0%,
          #ffffac 8%,
          #d1b464 25%,
          #5d4a1f 62.5%,
          #5d4a1f 100%
        );
    }
  }
}
</style>
