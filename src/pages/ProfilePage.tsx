import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { User, Package, Settings, MapPin, Mail, Phone, LogOut, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, orders, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formValues, setFormValues] = useState({
    name: user?.name ?? '',
    email: user?.email ?? '',
    phone: user?.phone ?? '',
    address: user?.address ?? '',
  });

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    toast.success("Successfully logged out");
    navigate('/');
  };

  const handleSave = () => {
    updateProfile(formValues);
    setIsEditing(false);
    toast.success("Profile updated successfully");
  };

  return (
    <div className="container mx-auto px-4 py-8 animate-fade-in-up">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Card className="border-0 shadow-lg shadow-sky-100 sticky top-24">
            <CardContent className="p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#0077b6] to-[#00b4d8] rounded-full flex items-center justify-center shadow-lg shadow-sky-200 mb-4">
                  <span className="text-3xl text-white font-bold">
                    {user.name.split(' ').map((name) => name[0]).join('')}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-slate-800">{user.name}</h2>
                <p className="text-sm text-slate-500">Member since {user.joinDate}</p>
              </div>

              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start text-[#0077b6] bg-sky-50 mb-2">
                  <User className="mr-3 h-4 w-4" /> Personal Info
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-[#0077b6] hover:bg-sky-50 mb-2">
                  <Package className="mr-3 h-4 w-4" /> My Orders
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-[#0077b6] hover:bg-sky-50 mb-2">
                  <MapPin className="mr-3 h-4 w-4" /> Addresses
                </Button>
                <Button variant="ghost" className="w-full justify-start text-slate-600 hover:text-[#0077b6] hover:bg-sky-50 mb-6">
                  <Settings className="mr-3 h-4 w-4" /> Settings
                </Button>
                
                <div className="pt-4 border-t border-slate-100">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-3 h-4 w-4" /> Logout
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="mb-6 bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto overflow-x-auto flex whitespace-nowrap">
              <TabsTrigger value="profile" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0077b6] px-6">
                Profile Details
              </TabsTrigger>
              <TabsTrigger value="orders" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-[#0077b6] px-6">
                Order History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="profile" className="animate-in fade-in-50 duration-300">
              <Card className="border-0 shadow-lg shadow-sky-50">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl md:text-2xl text-[#022047]">Personal Information</CardTitle>
                      <CardDescription>Manage your account details and contact info.</CardDescription>
                    </div>
                    <Button 
                      variant={isEditing ? "default" : "outline"}
                      className={isEditing ? "bg-[#0077b6] text-white hover:bg-[#022047]" : "border-[#0077b6] text-[#0077b6] hover:bg-sky-50"}
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-slate-500">Full Name</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                          value={formValues.name}
                          onChange={(event) => setFormValues((prev) => ({ ...prev, name: event.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 h-11 disabled:bg-slate-50 disabled:text-slate-700 disabled:opacity-100 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-500">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                          value={formValues.email}
                          onChange={(event) => setFormValues((prev) => ({ ...prev, email: event.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 h-11 disabled:bg-slate-50 disabled:text-slate-700 disabled:opacity-100 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-500">Phone Number</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                          value={formValues.phone}
                          onChange={(event) => setFormValues((prev) => ({ ...prev, phone: event.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 h-11 disabled:bg-slate-50 disabled:text-slate-700 disabled:opacity-100 rounded-xl"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-slate-500">Default Address</Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                        <Input 
                          value={formValues.address}
                          onChange={(event) => setFormValues((prev) => ({ ...prev, address: event.target.value }))}
                          disabled={!isEditing}
                          className="pl-10 h-11 disabled:bg-slate-50 disabled:text-slate-700 disabled:opacity-100 rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders" className="animate-in fade-in-50 duration-300">
              <Card className="border-0 shadow-lg shadow-sky-50">
                <CardHeader>
                  <CardTitle className="text-xl md:text-2xl text-[#022047]">Order History</CardTitle>
                  <CardDescription>View and track your recent purchases.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {orders.length === 0 && (
                      <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-slate-500">
                        Your placed orders will appear here after checkout.
                      </div>
                    )}
                    {orders.map((order) => (
                      <div key={order.id} className="p-4 rounded-2xl border border-slate-100 hover:border-sky-200 hover:shadow-md hover:shadow-sky-50 transition-all duration-200 bg-white">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-sky-50 flex items-center justify-center text-[#0077b6]">
                              <Package className="w-6 h-6" />
                            </div>
                            <div>
                              <p className="font-semibold text-slate-800">{order.id}</p>
                              <p className="text-sm text-slate-500">{order.date} • {order.items} Items</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between md:flex-col md:items-end gap-2">
                            <p className="font-bold text-lg text-[#0077b6]">{order.total} EGP</p>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
                              ${order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                              {order.status === 'Delivered' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                              {order.status}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
