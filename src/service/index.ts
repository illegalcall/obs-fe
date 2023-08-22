import { createAccountFormSchema, loginFormSchema, registerFormSchema } from "@/types";
import axios from "axios"
import { z } from "zod"

export class APIService {
  constructor() {}

  async createAccount(values: z.infer<typeof createAccountFormSchema>) {
    try {
      const response = await axios.post('http://localhost:8080/user/createaccount', values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async register(values: z.infer<typeof registerFormSchema>) {
    try {
      const reqData:any = {
        accountId: values.accountNumber,
        txnPassword: values.transactionPassword,
        password: values.password,
        otp: values.otp
      }
      

      const response = await axios.post('http://localhost:8080/netbanking/register', reqData)
      // const response = await axios.post('http://localhost:8080/netbanking/signup', values)
      
      console.log('r',response)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async login(values: z.infer<typeof loginFormSchema>) {
    try {

      const response = await axios.post('http://localhost:8080/netbanking/signin', values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async getAccountDetails(accountId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/account/getdetails/${accountId}`)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }
  // get transactions for account
  async getTransactions(accountId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/account/transactions/${accountId}`)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }


  async transfer(from: string, to: string, amount: number, type: string) {
    try {
      const response = await axios.post(`http://localhost:8080/account/transfer`, {
        from,
        to,
        amount,
        type
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

}
