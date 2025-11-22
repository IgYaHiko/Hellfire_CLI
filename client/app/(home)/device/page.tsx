'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { authClient } from '@/lib/auth-client'
import { icons } from '@/public/assets/icons/icons'
import { DEVILS } from '@/public/assets/images/img'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const DeviceAuthPage = () => {
     const [userCode, setUserCode] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      const formattedCode = userCode.trim().replace(/-/g, "").toUpperCase()

      const response = await authClient.device({
        query: { user_code: formattedCode },
      })

      if (response.data) {
        router.push(`/approve?user_code=${formattedCode}`)
      }
    } catch (err) {
      setError("Invalid or expired code")
    } finally {
      setIsLoading(false)
    }
  }

   const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "")
    if (value.length > 4) {
      value = value.slice(0, 4) + "-" + value.slice(4, 8)
    }
    setUserCode(value)
  }



  return (
    <section
     className='py-20 overflow-x-auto '
    >
      <div className='container mx-auto'>
         <div className='flex flex-col items-center space-y-7'>
            <div className='border p-0 border-dashed  rounded-xl bg-muted flex justify-center items-center'>
                 <Image
              alt=''
              src={icons.HELL_FIRE2}
              className='h-32 w-32 object-cover'
             />
            </div>

            <div>
                <span className='text-center font-black text-4xl font-[poppins]'>"Join the Cult -<span className='text-red-500'> HELLFIRE."</span></span>
            <p className='capitalize font-mono text-md text-center'>Enter Your Device Code to Continue</p>
            </div>
            

            <form action=""  onSubmit={handleSubmit} className="max-w-lg w-full border p-6 rounded-2xl shadow-md flex flex-col gap-4 border-dashed bg-neutral-950" >
                <Label className='font-mono font-bold' >Device Code</Label>
                <Input
                 value={userCode}
                 onChange={handleCodeChange}
                 maxLength={9}
                 type='text'
                 id='code'
                 placeholder='XXXX-XXXX'
                 className='py-6 px-4 placeholder:font-bold font-mono font-bold'
                />
                <p className='text-xs font-mono font-bold'>Find this code on the device you want to auth</p>
                 {/* Error Message */}
            {error && (
              <div className="p-3 font-mono font-bold rounded-lg bg-red-950 border border-red-900 text-red-200 text-xs">{error}</div>
            )}
             <Button
              disabled={isLoading || userCode.length < 9}
             type='submit'
             className='font-mono bg-red-500 font-bold mt-5 rounded-lg'
             >Summon</Button>

             <div className='p-2 border border-dashed rounded-xl mt-2 dark:bg-neutral-900'>
                <p  className='text-xs font-mono text-center capitalize font-semibold '>this code is unique to your device and will expire shortly. Keep it confidential and never share it with anyone</p>
             </div>
            </form>
         </div>
      </div>
    </section>
  )
}

export default DeviceAuthPage