import { addBeneficiaryFormSchema, createAccountFormSchema, fundsTransferFormSchema, loginFormSchema, registerFormSchema, withdrawalFormSchema } from "@/types";
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
      const response = await axios.get(`http://localhost:8080/account/getdetails`,{
        params:{
          netbankingId:accountId
        }
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }
  // get transactions for account
  async getTransactions(accountId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/transactions/user`,{
        params:{
          netbankingId:accountId
        }
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async transfer(values: z.infer<typeof fundsTransferFormSchema>) {
    try {
      const response = await axios.post(`http://localhost:8080/transactions/transfer`, values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async withdrawal(values: z.infer<typeof withdrawalFormSchema>){
    try {
      const response = await axios.post(`http://localhost:8080/transactions/withdraw`, values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async getAllAccounts(){
    try {
      const response = await axios.get(`http://localhost:8080/admin/getallacc`)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async approveAccount(accountId: string, isApproved: string){
    try {
      const response = await axios.post(`http://localhost:8080/admin/approve/?accountId=${accountId}&isApproved=${isApproved}`
      // ,{
        // params:{
        //   accountId, isApproved
        // }
      // }
      )
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async getTransactionsByAccountId(accountId: string) {
    try {
      const response = await axios.get(`http://localhost:8080/transactions/byaccountid`,{
        params:{
          accountId
        }
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async addBeneficary(values: z.infer<typeof addBeneficiaryFormSchema>){
    try {
      const response = await axios.post(`http://localhost:8080/beneficiary/add`,values)
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async getBeneficary(netbankingId: string){
    try {
      const response = await axios.get(`http://localhost:8080/beneficiary/`,{
        params:{
          netbankingId
        }
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

  async resetPass(netbankingId: string, newPassword: string){
    try {
      const response = await axios.post(`http://localhost:8080/user/setloginpassword`,{
      
          netbankingId,
          newLoginPassword: newPassword
        
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }
  async resetTxnPass(netbankingId: string, newTxnPassword: string){
    try {
      const response = await axios.post(`http://localhost:8080/user/settxnpassword`,{
          netbankingId,
          newTxnPassword
      })
      return response.data
    } catch (err) {
      console.log(err);
      return { err: 'something went wrong' };
    }
  }

}
