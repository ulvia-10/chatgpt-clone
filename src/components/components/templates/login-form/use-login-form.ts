import {
  accountLoginAuthenticatedQueryOptions,
  useAccountLoginHook,
} from '@/api/msUms/hooks/account'
import {useAuth} from '@/hooks/use-auth'
import {zodResolver} from '@hookform/resolvers/zod'
import {useQueryClient} from '@tanstack/react-query'
import {useNavigate} from '@tanstack/react-router'
import type {AxiosError} from 'axios'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {toast} from 'sonner'
import * as z from 'zod'

export const LoginSchema = z.object({
  userName: z.string().min(1, {
    message: 'Username is required',
  }),
  password: z.string().min(1, {
    message: 'Password is required',
  }),
})

export function useLoginForm() {
  const navigate = useNavigate()
  const {setUser} = useAuth()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const login = useAccountLoginHook()
  const queryClient = useQueryClient()

  const handleShowPassword = () => setShowPassword(!showPassword)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      userName: '',
      password: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof LoginSchema>) => {
    const data = {
      userName: values.userName,
      password: values.password,
    }

    login.mutate(
      {data},
      {
        onSuccess: async data => {
          await queryClient.fetchQuery(
            accountLoginAuthenticatedQueryOptions(
              import.meta.env.REACT_APP_CLIENT_UT_PORTAL,
              undefined,
              {
                baseURL: `${import.meta.env.REACT_APP_API_URL}/ucp/user-management`,
                headers: {
                  Authorization: `Bearer ${data.tokenResponse?.accessToken}`,
                  'Ocp-Apim-Subscription-Key': import.meta.env
                    .REACT_APP_UMS_OCP_APIM_KEY,
                },
              },
            ),
          )

          localStorage.setItem(
            import.meta.env.REACT_APP_CLIENT_ID,
            JSON.stringify(data),
          )

          localStorage.setItem(
            import.meta.env.REACT_APP_CLIENT_UT_PORTAL,
            JSON.stringify(data),
          )

          setUser(data)
          toast('Success!', {
            description: 'Welcome Back.',
          })

          navigate({
            to: '/health-score/dashboard',
            replace: true,
          })
        },
        onError: error => {
          const err = error as AxiosError
          if (err) {
            if (err.response?.status === 400) {
              return toast('Error!', {
                description: `${err.response.data === 'Username or Password is Invalid.' ? err.response.data : 'Something went wrong.'}`,
              })
            }
          }

          return toast('Error!', {
            description: 'Something went wrong.',
          })
        },
      },
    )
  }

  return {form, onSubmit, showPassword, handleShowPassword}
}
