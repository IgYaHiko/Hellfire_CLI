"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { authClient } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CheckCircle, XCircle, Smartphone, icons } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { DEVILS } from "@/public/assets/images/img";

export default function DeviceApprovalContent() {
  const { data, isPending } = authClient.useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const userCode = searchParams.get("user_code");
  const [isProcessing, setIsProcessing] = useState({
    approve: false,
    deny: false,
  });

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-background">
        <Spinner />
      </div>
    );
  }

  if (!data?.session && !data?.user) {
    router.push("/sign-in");
    return null;
  }

  const handleApprove = async () => {
    setIsProcessing({ approve: true, deny: false });
    try {
      toast.loading("Approving device...", { id: "loading" });
      await authClient.device.approve({ userCode: userCode! });
      toast.dismiss("loading");
      toast.success("Device approved successfully!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to approve device");
    }
    setIsProcessing({ approve: false, deny: false });
  };

  const handleDeny = async () => {
    setIsProcessing({ approve: false, deny: true });
    try {
      toast.loading("Denying device...", { id: "deny" });
      await authClient.device.deny({ userCode: userCode! });
      toast.dismiss("deny");
      toast.success("Oops! Device denied to approve!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to deny device");
    }
    setIsProcessing({ approve: false, deny: false });
  };

  return (
     <section
     className='py-16 overflow-x-auto '
    >
      <div className='container mx-auto'>
         <div className='flex flex-col items-center space-y-7'>
            <div className='border p-0 border-dashed  rounded-xl bg-muted flex justify-center items-center'>
                 <Image
              alt=''
              src={DEVILS.DEVILONE}
              className='h-32 w-32 object-cover'
             />
            </div>
            <div>
                <p className="text-3xl text-center md:text-5xl font-[poppins] font-black">"Make A Deal With <span className="text-red-500">Devil."</span></p>
                <p className="text-sm text-zinc-400 text-center font-mono font-bold">A new device is requesting access to your account</p>
            </div>
           
            <div className="w-full px-5 md:px-0">
                 <div className="border-2 max-w-xl mx-auto border-dashed border-zinc-700 rounded-2xl p-6 bg-zinc-900/50 backdrop-blur-sm space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold font-mono text-zinc-500 uppercase tracking-wide">Authorization Code</p>
              <div className="bg-zinc-800 rounded-lg p-4 border border-zinc-700">
                <p className="text-xl font-mono font-bold text-cyan-400 text-center tracking-widest">
                  {userCode || "---"}
                </p>
              </div>
              <p className="text-xs font-mono font-bold text-left ">Share this code with the requesting device</p>
            </div>

             <div className="space-y-3 mt-5">
              <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide">
                Account: {data?.user?.email}
              </p>
              <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
                <p className="text-sm text-zinc-300 font-bold font-mono text-center">
                  Only approve this request if you initiated it. For security, never share this code with others.
                </p>
              </div>
            </div>



             <div className="space-y-3 mt-5">
            <Button
              onClick={handleApprove}
              disabled={isProcessing.approve}
              className="w-full h-11 bg-yellow-500 hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing.approve ? (
                <>
                  <Spinner className="w-4 h-4" />
                  <span className="font-mono font-semibold "> Approving...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span className="font-mono font-semibold ">Approve Deal</span>
                </>
              )}
            </Button>
            <Button
              onClick={handleDeny}
              disabled={isProcessing.deny}
              className="w-full h-11 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isProcessing.deny ? (
                <>
                  <Spinner className="w-4 h-4" />
                  <span className="font-mono font-semibold ">Denying...</span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5" />
                  <span className="font-mono font-semibold ">Deny Deal</span>
                </>
              )}
            </Button>
          </div> 
          </div>

          
            </div>

         
           
         </div>
      </div>
    </section>
  );
}



