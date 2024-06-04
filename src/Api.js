import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  /* Login User. */
  static async login(data) {
    const res = await this.request("auth/token", data, "post");
    return res.token;
  }

  /* Register User. */
  static async signup(data) {
    const res = await this.request("auth/register", data, "post");
    return res.token;
  }

  // Individual API routes

  /* Get all companies. */
  static async getAllCompanies(name = "") {
    name = !name ? "" : `?name=${name}`;
    const res = await this.request(`companies/${name}`);
    return res.companies;
  }

  /** Get details on a company by handle. */
  static async getCompany(handle) {
    try {
      let res = await this.request(`companies/${handle}`);
      return res.company;
    } catch (e) {
      return false;
    }
  }

  /* Get All Jobs. */
  static async getAllJobs(title = "") {
    title = !title ? "" : `?title=${title}`;
    const res = await this.request(`jobs/${title}`);
    return res.jobs;
  }

  /* Apply To Job. */
  static async applyToJob(username, jobId) {
    const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post");
    return res;
  }

  /* Get Current User. */
  static async getCurrentUser(username) {
    const res = await this.request(`users/${username}`);
    return res.user;
  }

  /* Update User. */
  static async updateUser(username, data) {
    const res = await this.request(`users/${username}`, data, "patch");
    return res.user;
  }
}


export default JoblyApi;