import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Calendar, MapPin, Star, Users, CreditCard, 
  Settings, Bell, Heart, MessageSquare 
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { campsites } from "@/data/campsites";

interface Booking {
  id: string;
  campsiteId: string;
  campsite: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "upcoming" | "completed" | "cancelled";
  image: string;
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  // Mock user data
  const user = {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    avatar: "PS",
    memberSince: "2023",
    totalBookings: 8,
    favoriteSpots: 12
  };

  // Mock bookings data
  const bookings: Booking[] = [
    {
      id: "1",
      campsiteId: "1",
      campsite: "Himalayan Base Camp Experience",
      location: "Manali, Himachal Pradesh",
      checkIn: "2024-04-15",
      checkOut: "2024-04-17",
      guests: 4,
      total: 7500,
      status: "upcoming",
      image: "/src/assets/camp-manali.jpg"
    },
    {
      id: "2",
      campsiteId: "2",
      campsite: "Desert Nights Under Stars",
      location: "Jaisalmer, Rajasthan",
      checkIn: "2024-03-10",
      checkOut: "2024-03-12",
      guests: 2,
      total: 6400,
      status: "completed",
      image: "/src/assets/camp-rajasthan.jpg"
    }
  ];

  const favorites = campsites.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Avatar className="h-16 w-16">
              <AvatarFallback className="text-xl">{user.avatar}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome back, {user.name}!</h1>
              <p className="text-muted-foreground">Member since {user.memberSince}</p>
            </div>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Account Settings
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold">{user.totalBookings}</div>
              <p className="text-muted-foreground">Total Trips</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">{user.favoriteSpots}</div>
              <p className="text-muted-foreground">Favorite Spots</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-muted-foreground">Average Rating</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Your Bookings</h2>
              <Button>Book New Trip</Button>
            </div>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row gap-4">
                      <img
                        src={booking.image}
                        alt={booking.campsite}
                        className="w-full md:w-32 h-32 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-lg">{booking.campsite}</h3>
                            <div className="flex items-center text-muted-foreground">
                              <MapPin className="h-4 w-4 mr-1" />
                              {booking.location}
                            </div>
                          </div>
                          <Badge variant={booking.status === "upcoming" ? "default" : 
                                        booking.status === "completed" ? "secondary" : "destructive"}>
                            {booking.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Check-in</p>
                            <p className="font-medium">{booking.checkIn}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Check-out</p>
                            <p className="font-medium">{booking.checkOut}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Guests</p>
                            <p className="font-medium">{booking.guests}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Total</p>
                            <p className="font-medium">₹{booking.total.toLocaleString()}</p>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button size="sm" variant="outline">View Details</Button>
                          {booking.status === "upcoming" && (
                            <Button size="sm" variant="outline">Modify Booking</Button>
                          )}
                          {booking.status === "completed" && (
                            <Button size="sm" variant="outline">Write Review</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="favorites" className="space-y-4">
            <h2 className="text-xl font-semibold">Your Favorite Campsites</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((campsite) => (
                <Card key={campsite.id} className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={campsite.image}
                      alt={campsite.name}
                      className="w-full h-48 object-cover"
                    />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute top-3 right-3"
                    >
                      <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                    </Button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-1">{campsite.name}</h3>
                    <div className="flex items-center text-muted-foreground text-sm mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {campsite.location}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                        <span className="text-sm">{campsite.rating}</span>
                      </div>
                      <span className="font-semibold">₹{campsite.price}/night</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-4">
            <h2 className="text-xl font-semibold">Your Reviews</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No reviews yet</h3>
                <p className="text-muted-foreground mb-4">
                  Share your camping experiences with other adventurers!
                </p>
                <Button>Write Your First Review</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <h2 className="text-xl font-semibold">Messages</h2>
            <Card>
              <CardContent className="p-6 text-center">
                <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No new messages</h3>
                <p className="text-muted-foreground">
                  Messages from hosts and support will appear here.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;