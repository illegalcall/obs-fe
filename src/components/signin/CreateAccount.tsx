import React from 'react'
import { useNavigate } from 'react-router-dom'
import * as z from "zod"
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom'
import { useStore } from '@/store'
import { createAccountFormSchema } from "@/types"
import { APIService } from "@/service"



const CreateAccount = () => {
  const apiService = new APIService()
  const navigate = useNavigate()
  const createAccountForm = useForm<z.infer<typeof createAccountFormSchema>>({
    resolver: zodResolver(createAccountFormSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      fatherName: "",
      mobileNo: "",
      emailId: "",
      aadharNo: "",
      dOB: "",
      address: "",
      occupationType: "",
      sourceOfIncome: "",
      grossAnnualIncome: "",
    },
  })

  const [accountId, updateAccountId, updateName] = useStore(
    (state) => [state.accountId, state.updateAccountId, state.updateName],
  )


  async function onCreateAccount(values: z.infer<typeof createAccountFormSchema>) {
    const data = await apiService.createAccount(values)
    const accountId = data.accountId
    const name = data.fullName
    navigate(`/account-creation-success/${accountId}&${name}`)
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Create Account</CardTitle>
          <CardDescription>
            Create a new bank account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-[700px]">
          <div className="space-y-1">
            <Form {...createAccountForm}>
              <form onSubmit={createAccountForm.handleSubmit(onCreateAccount)} className="grid grid-cols-2 gap-x-2">
                <FormField
                  control={createAccountForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="fatherName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Father's name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="mobileNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mobile number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="emailId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email id</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="aadharNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Aadhar no</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="dOB"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Date of birth</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="occupationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occupation type</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="sourceOfIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Source of Income</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createAccountForm.control}
                  name="grossAnnualIncome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gross Annual Income</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button className='mt-4 col-start-1' type="submit">Create Account</Button>
              </form>
            </Form>
          </div>
        </CardContent>
        <CardFooter><span className="mr-1">Already have an account?</span><Link to="/">Click here</Link></CardFooter>
      </Card>
    </div>
  )
}

export default CreateAccount