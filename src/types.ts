import { z } from "zod"

export const createAccountFormSchema = z.object({
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  fatherName: z.string(),
  mobileNo: z.string(),
  emailId: z.string().email(),
  aadharNo: z.string().length(12),
  dOB: z.string(),
  address: z.string(),
  occupationType: z.string(),
  sourceOfIncome: z.string(),
  grossAnnualIncome: z.string(),
})

export const loginFormSchema = z.object({
  netbankingId: z.string().min(5).max(15),
  password: z.string().min(8)
})

export const registerFormSchema = z.object({
  accountNumber: z.string().min(5).max(15),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
  transactionPassword: z.string().min(5),
  confirmTransactionPassword: z.string().min(5),
  otp: z.string().min(6).max(6)
}).refine(data => data.transactionPassword === data.confirmTransactionPassword, {
  message: "Transaction Passwords do not match",
  path: ["confirmTransactionPassword"],
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export enum LoginResponse {
  SUCCESS = "Login Successful",
  FAILURE = "FAILURE",
}

export enum RegisterResponse {
  SUCCESS = "Netbanking Registration Successful!",
  FAILURE = "FAILURE",
}

export enum TransferType {
  IMPS= "IMPS",
  NEFT= "NEFT",
  RTGS= "RTGS",
}

export const fundsTransferFormSchema = z.object({
  txnType: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  fromUserId: z.string().min(5, {
    message: "Account number must be at least 5 characters.",
  }),
  toUserId: z.string().min(5, {
    message: "Account number must be at least 5 characters.",
  }),
  amount: z.coerce.number().positive(),
  remarks: z.string().optional(),
})