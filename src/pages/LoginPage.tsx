import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useForm as useRHForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';

import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Mail, Phone, Lock, User, ArrowRight } from 'lucide-react';

const emailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const phoneSchema = z.object({
  phone: z.string().min(10, { message: "Invalid phone number" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type EmailFormValues = z.infer<typeof emailSchema>;
type PhoneFormValues = z.infer<typeof phoneSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeMethod, setActiveMethod] = useState<'email' | 'phone'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const redirectPath = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? '/profile';

  const emailForm = useRHForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "", password: "" }
  });

  const phoneForm = useRHForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: { phone: "", password: "" }
  });

  const onEmailSubmit = async (_data: EmailFormValues) => {
    setIsLoading(true);
    try {
      await login({ email: _data.email });
      toast.success('Successfully logged in with Email');
      navigate(redirectPath, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  const onPhoneSubmit = async (_data: PhoneFormValues) => {
    setIsLoading(true);
    try {
      await login({ phone: _data.phone });
      toast.success('Successfully logged in with Phone');
      navigate(redirectPath, { replace: true });
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return (
    <div className="flex-1 min-h-[80vh] flex items-center justify-center p-4 bg-slate-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-100 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-sky-100 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      
      <div className="w-full max-w-md z-10 animate-fade-in-up">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-2xl flex items-center justify-center shadow-lg shadow-sky-200">
            <User className="text-white w-8 h-8" />
          </div>
        </div>

        <Card className="border-0 shadow-xl shadow-slate-200/50 bg-white/80 backdrop-blur-xl">
          <CardHeader className="text-center space-y-2 pb-6">
            <CardTitle className="text-2xl font-bold bg-gradient-to-br from-[#022047] to-[#0077b6] bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-500">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full" onValueChange={(value) => setActiveMethod(value as 'email' | 'phone')}>
              <TabsList className="grid w-full grid-cols-2 mb-8 bg-slate-100/80 p-1 rounded-xl">
                <TabsTrigger value="email" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0077b6]">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="phone" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0077b6]">
                  <Phone className="w-4 h-4 mr-2" />
                  Phone
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="email" className="space-y-4 animate-in fade-in-50 duration-300">
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-slate-700">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="email"
                        placeholder="you@example.com"
                        className="pl-10 h-11 bg-white border-slate-200 focus:border-[#0077b6] focus:ring-[#0077b6]/20 transition-all rounded-xl"
                        {...emailForm.register('email')}
                      />
                    </div>
                    {emailForm.formState.errors.email && (
                      <p className="text-sm text-red-500">{emailForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-email" className="text-sm font-medium text-slate-700">Password</Label>
                      <Link to="/contact" className="text-xs text-[#0077b6] hover:underline hover:text-[#022047] transition-colors">
                        Need help?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password-email"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11 bg-white border-slate-200 focus:border-[#0077b6] focus:ring-[#0077b6]/20 transition-all rounded-xl"
                        {...emailForm.register('password')}
                      />
                    </div>
                    {emailForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{emailForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 mt-4 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#022047] hover:to-[#0077b6] text-white rounded-xl shadow-lg shadow-sky-200 transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : (
                      <>
                        Sign In <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="phone" className="space-y-4 animate-in fade-in-50 duration-300">
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="phone"
                        placeholder="+20 100 000 0000"
                        className="pl-10 h-11 bg-white border-slate-200 focus:border-[#0077b6] focus:ring-[#0077b6]/20 transition-all rounded-xl"
                        {...phoneForm.register('phone')}
                      />
                    </div>
                    {phoneForm.formState.errors.phone && (
                      <p className="text-sm text-red-500">{phoneForm.formState.errors.phone.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password-phone" className="text-sm font-medium text-slate-700">Password</Label>
                      <Link to="/contact" className="text-xs text-[#0077b6] hover:underline hover:text-[#022047] transition-colors">
                        Need help?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <Input
                        id="password-phone"
                        type="password"
                        placeholder="••••••••"
                        className="pl-10 h-11 bg-white border-slate-200 focus:border-[#0077b6] focus:ring-[#0077b6]/20 transition-all rounded-xl"
                        {...phoneForm.register('password')}
                      />
                    </div>
                    {phoneForm.formState.errors.password && (
                      <p className="text-sm text-red-500">{phoneForm.formState.errors.password.message}</p>
                    )}
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full h-11 mt-4 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] hover:from-[#022047] hover:to-[#0077b6] text-white rounded-xl shadow-lg shadow-sky-200 transition-all duration-300 transform hover:-translate-y-0.5"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : (
                      <>
                        Sign In <ArrowRight className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <div className="mt-8 text-center text-sm text-slate-500">
              {activeMethod === 'email' ? 'Need an account?' : 'Need access?'}{' '}
              <Link to="/contact" className="font-medium text-[#0077b6] hover:text-[#022047] hover:underline transition-colors">
                Contact SoloPharma
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
