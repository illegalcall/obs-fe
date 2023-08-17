import { createAccountFormSchema, loginFormSchema, registerFormSchema } from "@/types";
import axios from "axios"
import { z } from "zod"

export class APIService {
  constructor() {}

  async createAccount(values: z.infer<typeof createAccountFormSchema>) {
    try {
      const response = await axios.post('http://localhost:8080/user/register', values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async register(values: z.infer<typeof registerFormSchema>) {
    try {
      const response = await axios.post('http://localhost:8080/netbanking/register', values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async login(values: z.infer<typeof loginFormSchema>) {
    try {
      const response = await axios.post('http://localhost:8080/netbanking/login', values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async getAccountDetails(accountId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/netbanking/account/${accountId}`)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }
}
