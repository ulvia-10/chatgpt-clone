import {CustomInput} from '@/components/atoms/custom-input'
import {Button} from '@/components/ui/button'
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {Eye, EyeOff} from 'lucide-react'
import {useLoginForm} from './use-login-form'

export function LoginForm() {
  const {form, showPassword, handleShowPassword, onSubmit} = useLoginForm()

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="userName"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <CustomInput
                        type={'text'}
                        placeholder="Username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <CustomInput
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        addonRight={
                          showPassword ? (
                            <Eye onClick={handleShowPassword} size={16} />
                          ) : (
                            <EyeOff onClick={handleShowPassword} size={16} />
                          )
                        }
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full mt-4">Login</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
