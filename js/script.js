var app = new Vue (
    {
        el:"#root",
        data: {
            // pagina di default (home)
            defaultView: [],

            // schede film e serie tv
            moviesSeriesTabs: [],

            // parametri per la ricerca 
            userInput: '',

            // searchResult sarà un array 
            searchResult: [],
            
            // array lingue 
            langArray: ['en', 'es', 'it', 'fr', 'de', 'ja'],

            cast: []
        },

        methods: {
            // con questa funzione devo elaborare la input dell'utente e mostrare al click i risultati
            search() {
                axios
                .get('https://api.themoviedb.org/3/search/multi?api_key=f89c7f6032a3346fd48dd264e45c139f', {
                    params: {
                        query: this.userInput
                    }
                })
                
                .then((response) => {
                    this.moviesSeriesTabs.length = 0;
                    const result = response.data.results;
                    
                    if(this.userInput.length > 0) {
                        this.searchResult = result;
                    }
                })                
            },

            // funzione per mostrare una lista di film al clic relativo 
            movieButton() {
                axios
                .get('https://api.themoviedb.org/3/trending/movie/day?api_key=f89c7f6032a3346fd48dd264e45c139f')
                .then((response) => {
                    this.defaultView.length = 0;
                    const result = response.data.results;
                    this.moviesSeriesTabs = result;
                })
            },

            // funzione per mostrare una lista di serie tv al clic relativo 
            tvSeriesButton() {
                axios
                .get('https://api.themoviedb.org/3/trending/tv/day?api_key=f89c7f6032a3346fd48dd264e45c139f')
                .then((response) => {
                    this.defaultView.length = 0;
                    const result = response.data.results;
                    this.moviesSeriesTabs = result;
                })
            },
            
            // funzione che elabora il voto del film/serie e lo converte in un numero da 1 a 5 
            voteStars(vote) {
                return Math.ceil(vote / 2);
            },

            // funzione che deve restituire il cast del film/serie ricercato 
            getCast() {
                axios
                    .get('https://api.themoviedb.org/3/movie/603/credits?api_key=f89c7f6032a3346fd48dd264e45c139f')
                    .then((response) => {
                        const result = response.data.cast;
                        
                        
                    })
            }
        },

        mounted() {
            // questa chiamata mostra la vista di default 
            axios
                .get('https://api.themoviedb.org/3/trending/all/week?api_key=f89c7f6032a3346fd48dd264e45c139f')
                .then((response) => {
                    const result = response.data.results;
                    this.defaultView = result;
                })
                
        }
    }
)