export default class ApiHandler {
  constructor(baseUrl = "https://py-library-api-v2.server.steffen.codes") {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, method = "GET", params = {}, headers = {}) {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (method === "GET" && Object.keys(params).length > 0) {
      Object.keys(params).forEach((key) =>
        // adds the query parameters to the URL, example:
        // if params = { n: 5, s: "Harry Potter" }
        // then the URL will be: http://localhost/books?n=5&s=Harry%20Potter
        url.searchParams.append(key, params[key])
      );
    }

    const options = { method, headers };

    if (["POST", "PUT"].includes(method)) {
      const formData = new FormData();
      Object.keys(params).forEach((key) => formData.append(key, params[key]));
      options.body = formData;
    }

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        return {
          success: false,
          statusCode: response.status,
        };
      }
      const json = await response.json();
      return {
        success: true,
        data: json,
      };
    } catch (error) {
      console.error(`Error in ${method} ${url}:`, error);
      throw error;
    }
  }

  async getBooksByNumber(number) {
    return await this.request("/books", "GET", { n: number });
  }

  async searchBooksByTitle(searchText) {
    return await this.request("/books", "GET", { s: searchText });
  }

  async getBooksByAuthor(authorId) {
    return await this.request("/books", "GET", { a: authorId });
  }

  async getBookDetails(bookId) {
    return await this.request(`/books/${bookId}`, "GET");
  }

  async getAuthors() {
    return await this.request("/authors", "GET");
  }

  async getPublishers() {
    return await this.request("/publishers", "GET");
  }

  // ?? How is this a User endpoint, and not an Admin endpoint?
  async getUser(userId) {
    return await this.request(`/users/${userId}`, "GET");
  }

  async createUser(data) {
    return await this.request("/users", "POST", data);
  }

  // ?? How is this a User endpoint, and not an Admin endpoint?
  async updateUser(userId, data) {
    return await this.request(`/users/${userId}`, "PUT", data);
  }

  // ?? How is this a User endpoint, and not an Admin endpoint?
  async deleteUser(userId) {
    return await this.request(`/users/${userId}`, "DELETE");
  }

  async loginUser(email, password) {
    return await this.request("/users/login", "POST", { email, password });
  }

  async loanBook(userId, bookId) {
    return await this.request(`/users/${userId}/books/${bookId}`, "POST");
  }

  async createAuthor(data) {
    return await this.request("/admin/authors", "POST", data);
  }

  async createPublisher(data) {
    return await this.request("/admin/publishers", "POST", data);
  }

  async createBook(data) {
    return await this.request("/admin/books", "POST", data);
  }
}
