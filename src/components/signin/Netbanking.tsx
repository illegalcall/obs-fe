import React, { useEffect } from 'react'

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Link, useNavigate } from 'react-router-dom'
import { useStore } from "@/store"
import { APIService } from "@/service"
import { loginFormSchema, registerFormSchema } from "@/types"
import { useToast } from "../ui/use-toast"


const Netbanking = () => {
  const { toast } = useToast()
  const apiService = new APIService()
  const [activeTab, setActiveTab] = React.useState("login")
  const navigate = useNavigate()

  const [accountId, updateAccountId, updateName] = useStore(
    (state) => [state.accountId, state.updateAccountId, state.updateName],
  )

  useEffect(() => {
    if (accountId !== "") {
      console.log("hii")
      navigate('/dashboard')
    }
  })

  const loginForm = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      userId: "",
      password: "",
    },
  })

  const registerForm = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      accountNumber: "",
      password: "",
      transactionPassword: "",
      confirmPassword: "",
      confirmTransactionPassword: "",
      otp: ""
    },
  })


  async function onLogin(values: z.infer<typeof loginFormSchema>) {
    console.log(values)

    const data = await apiService.login(values)
    console.log("🚀 ~ file: Netbanking.tsx:83 ~ onLogin ~ data:", data)


    if (data.message !== 'Login Successful') {
      toast({
        title: "Login Failed",
        description: data.message,
      })
      loginForm.setError("userId", {
        type: "manual",
        message: data.message,
      })
      loginForm.setError("password", {
        type: "manual",
        message: data.message,
      })
      return
    }

    const accountId = data.netbankingId
    const name = data.fullName


    updateAccountId(accountId)
    updateName(name)
    window.sessionStorage.setItem("accountId", accountId)
    window.sessionStorage.setItem("name", name)

    navigate('/dashboard')
  }

  const onRegister = async (values: z.infer<typeof registerFormSchema>) => {
    console.log(values)
    const data = await apiService.register(values)
    const netBankingId = data

    navigate(`/account-registration-success/${netBankingId}`)
    // setActiveTab("login")
  }

  return (
    <Tabs defaultValue="login" value={activeTab} className="w-[600px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" onClick={() => setActiveTab("login")}>Login</TabsTrigger>
        <TabsTrigger value="register" onClick={() => setActiveTab("register")}>Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to your netbanking account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-8">
                  <FormField
                    control={loginForm.control}
                    name="userId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>User id</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your netbanking user id.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your netbanking password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Login</Button>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter><span className="mr-1">Dont have an account?</span><Link to="/create-account">Click here</Link></CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Register</CardTitle>
            <CardDescription>
              Register for your netbanking account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Form {...registerForm}>
                <form onSubmit={registerForm.handleSubmit(onRegister)} className="grid grid-cols-2 gap-y-3 gap-x-2">
                  <FormField
                    control={registerForm.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your bank account number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Login Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your netbanking password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Login Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Re-enter your login password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="transactionPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Transaction Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          This will be your transaction password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="confirmTransactionPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Transaction Password</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Re-enter your transaction password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={registerForm.control}
                    name="otp"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Otp</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Enter the otp sent to your registered mobile number.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Register</Button>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter><span className="mr-1">Dont have an account?</span><Link to="/create-account">Click here</Link></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Netbanking