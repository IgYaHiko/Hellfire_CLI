import {createAuthClient} from 'better-auth/react'
import { deviceAuthorizationClient } from "better-auth/client/plugins"

export const authClient = createAuthClient({
    baseURL: "https://hellfire-cli.onrender.com",
      plugins: [ 
    deviceAuthorizationClient(), 
  ], 
})
