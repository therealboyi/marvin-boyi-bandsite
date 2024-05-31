class BandSiteApi {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    async postComment(comment) {
        const response = await axios.post(`${this.baseUrl}comments?api_key=${this.apiKey}`, comment, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }

    async getComments() {
        const response = await axios.get(`${this.baseUrl}comments?api_key=${this.apiKey}`);
        return response.data.sort((a, b) => b.timestamp - a.timestamp);
    }

    async likeComment(id) {
        const response = await axios.put(`${this.baseUrl}comments/${id}/like?api_key=${this.apiKey}`);
        return response.data;
    }

    async deleteComment(id) {
        const response = await axios.delete(`${this.baseUrl}comments/${id}?api_key=${this.apiKey}`);
        return response.data;
    }

    async getCommentById(id) {
        const response = await axios.get(`${this.baseUrl}comments/${id}?api_key=${this.apiKey}`);
        return response.data;
    }

    async getShows() {
        const response = await axios.get(`${this.baseUrl}showdates?api_key=${this.apiKey}`);
        return response.data;
    }
}
