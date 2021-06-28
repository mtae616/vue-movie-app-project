import axios from 'axios'
import _uniqBy from 'lodash/uniqBy'

const _defaultMessage = 'Search for the movie title!'

export default {
  // module!
  namespaced: true,
  // data!
  state: () => ({
    movies: [],
    message: _defaultMessage,
    loading: false,
    theMovie: {}
  }),
  // computed
  getters: {},
  // methods!
  // 변이
  mutations: {
    updateState(state, payload) {
      // ['movies', 'message', 'loading']
      //객체데이터의 key값만 가지고 새로운 배열 생성
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    resetMovies(state) {
      state.movies = []
      state.message = _defaultMessage
      state.loading = false
    }
  },
  // 비동기
  actions: {
    async searchMovies({ state, commit }, payload) { 
      // 함수 실행할 때 들어오는 데이터 들을 payload로 받음
      if(state.loading) return 
      // 검색 메소드가 실행이 되고 있는 경우에 다시 검색 메소드를 실행시키면
      // 아래 로직은 동작하지 않게 함
      
      commit('updateState', {
        message: '',
        loading: true
      })

      try{
        const res = await _fetchMovie({
          ...payload, page:1
        })

        const { Search, totalResults } = res.data
        commit('updateState', {
          movies: _uniqBy(Search, 'imdbID')
        })
        console.log(totalResults) // 266 => 27 페이지
        console.log(typeof totalResults) //string

        const total = parseInt(totalResults, 10)
        const pageLength = Math.ceil(total / 10) // ceil 은 올림처리
        
        // 추가 요청!
        if(pageLength > 1) {
          for(let page = 2; page <= pageLength; page += 1){
            if(page > (payload.number / 10)) break
            const res = await _fetchMovie({
              ...payload,
              page
            })
            const { Search } = res.data
            commit('updateState', {
              movies: [...state.movies, ..._uniqBy(Search, 'imdbID')]
            })
          }
        }
      } catch(message) {
        commit('updateState', {
          movies: [],
          message
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    },
    async searchMovieWithId({ state, commit }, payload) {
      if(state.loading) return
      
      commit('updateState', {
        theMovie: {},
        loading: true
      })

      try {
        const res = await _fetchMovie(payload)
        console.log(res.data)
        commit('updateState', {
          theMovie: res.data
        })
      } catch (error) {
        commit('updateState', {
          theMovie: {}
        })
      } finally {
        commit('updateState', {
          loading: false
        })
      }
    }
  },
}

function _fetchMovie(payload) {
  const { title, type, year, page, id } = payload
  const OMDB_API_KEY = '117ae0ed'
  const url = id 
  ? `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}` 
  : `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`
  
  return new Promise ((resolve, reject) => {
    axios.get(url)
      .then(res => {
        if(res.data.Error) {
          reject(res.data.Error)
        }
        resolve(res)
      })
      .catch(err => reject(err.message))
  })
}