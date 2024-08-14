import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/* API Class */

class AidMeApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${AidMeApi.token}` };
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

  /* Get All People. */
  static async getAllPeople() {
    const res = await this.request(`people`);
    return res.people;
  }

  /* Get one person by ID. */
  static async getPerson(id) {
    const res = await this.request(`people/${id}`);
    return res.person;
  }

  /* Create person */
  static async postPerson(data) {
    try {
      const res = await this.request(`people`, data, "post");
      return res.person;
    } catch (e) {
      return e;
    }
  }

  /* Get all families. */
  static async getAllFamilies() {
    const res = await this.request(`families`);
    return res.families;
  }

  /* Get details on a family by id. */
  static async getFamily(id) {
    try {
      let res = await this.request(`families/${id}`);
      return res.family;
    } catch (e) {
      return false;
    }
  }

  /* Create a family by passing camp_id and head */
  static async postFamily(data) {
    try {
      const res = await this.request(`families`, data, "post");
      return res.family;
    } catch (e) {
      return false;
    }
  }

  /* Get all household members. */
  static async getAllHousehold() {
    const res = await this.request("families/household");
    return res.householdAll;
  }

  /* Add member to family. */
  static async postHousehold(data) {
    try {
      const res = await this.request(`families/${data.family_id}/people/${data.person_id}`, data, "post");
      return res.household;
    } catch (e) {
      return false;
    }
  }

  /* Get all donations. */
  static async getAllDonations() {
    const res = await this.request(`donations`);
    return res.donations;
  }

  /** Get details of a donation by id. */
  static async getDonation(id) {
    try {
      let res = await this.request(`donations/${id}`);
      return res.donation;
    } catch (e) {
      return false;
    }
  }

  /* Create donation */
  static async postDonation(data) {
    try {
      const res = await this.request(`donations`, data, "post");
      return res.donation
    } catch (e) {
      return false;
    }
  }

  /* Get All New Donations for a family. */
  static async getAllNewDonations(id) {
    try {
      const res = await this.request(`families/${id}/donations`);
      return res.donations;
    } catch (e) {
      return false;
    }
  }

  /* Create distribution. */
  static async postDistribution(data) {
    try {
      const res = await this.request(`families/${data.fID}/donations/${data.dID}`, data, "post");
      return res.distribution;
    } catch (e) {
      return false;
    }
  }

  /* Get  */

  /* Get All Camps. */
  static async getAllCamps() {
    const res = await this.request(`camps`);
    return res.camps;
  }

  /* Get camp by ID. */
  static async getCamp(id) {
    try {
      let res = await this.request(`camps/${id}`);
      return res.camp;
    } catch (e) {
      return false;
    }
  }

  /* Create new camp. */
  static async postCamp(data) {
    try {
      const res = await this.request("camps", data, "post");
      return res.camp;
    } catch (e) {
      return e;
    }
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


export default AidMeApi;