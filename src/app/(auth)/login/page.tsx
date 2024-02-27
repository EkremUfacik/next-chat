"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/validations";
import { axiosBase } from "@/services/axiosInstance";
import { useUser } from "@/hooks/useUser";

const Login = () => {
  const router = useRouter();
  const { toast } = useToast();
  const user = useUser();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loading = form.formState.isSubmitting;

  const onSubmit = async (userInfo: z.infer<typeof loginSchema>) => {
    try {
      const res = await axiosBase.post("/user/login", userInfo);
      console.log(res.data);
      user.login(res.data);
      toast({
        description: "Logged in successfully!",
      });
      form.reset();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h1 className="text-xl my-10 font-semibold text-slate-800">Login</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-60">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormDescription>
            <Link href="/register">Don't have an account?</Link>
          </FormDescription>
          <Button type="submit" disabled={loading} className="block mx-auto ">
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
