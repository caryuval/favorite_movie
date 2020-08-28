import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    movies: [],
    foundMovies: null,
    didStartSearch: false
  },
  getters: {
    movies: state => state.movies,
    foundMovies: state => (state.foundMovies ? state.foundMovies : []),
    sortedFoundMovies: state => {
      if (!state.foundMovies) {
        return [];
      }
      return state.foundMovies.sort(
        (movieA, movieB) => movieB.duration - movieA.duration
      );
    },
    didStartSearch: state => state.didStartSearch
  },
  mutations: {
    addMovie(state, payload) {
      state.movies.push(payload);
    },
    setFoundMovies(state, payload) {
      state.didStartSearch = true;
      if (payload) {
        state.foundMovies = [...payload];
      }
    }
  },
  actions: {
    addMovie({ commit }, payload) {
      let duration = payload.duration;
      if (duration.includes("m")) {
        const durationNoCharacter = Number(duration.replace("m", ""));
        duration = (durationNoCharacter / 60).toFixed(3);
      } else {
        duration = duration.replace("h", "");
      }
      const newMovie = {
        ...payload,
        duration,
        id: Date.now()
      };
      commit("addMovie", newMovie);
    },
    searchMovies({ commit, state }, movieNameQuery) {
      const lowerCaseMovieNameQuery = movieNameQuery.toLowerCase();
      const foundMovies = state.movies.filter(
        movie => movie.name.toLowerCase().indexOf(lowerCaseMovieNameQuery) === 0
      );
      commit("setFoundMovies", foundMovies);
    }
  }
});

export default store;
