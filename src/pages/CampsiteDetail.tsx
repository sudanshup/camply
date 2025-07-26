import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Star, MapPin, Users, Calendar as CalendarIcon, Heart, Share2, 
  Wifi, Car, Utensils, Shield, CheckCircle 
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { campsites } from "@/data/campsites";

const CampsiteDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");
  const [isFavorited, setIsFavorited] = useState(false);

  const campsite = campsites.find(c => c.id === id);

  if (!campsite) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Campsite not found</h1>
          <Button onClick={() => navigate("/search")}>Back to Search</Button>
        </div>
      </div>
    );
  }

  const calculateTotal = () => {
    if (!checkIn || !checkOut) {
      return {
        days: 0,
        subtotal: 0,
        serviceFee: 0,
        tax: 0,
        total: 0
      };
    }
    const days = Math.max(1, Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)));
    const subtotal = campsite.price * days;
    const serviceFee = Math.round(subtotal * 0.12);
    const tax = Math.round(subtotal * 0.18);
    return {
      days,
      subtotal,
      serviceFee,
      tax,
      total: subtotal + serviceFee + tax
    };
  };

  const handleBooking = () => {
    if (!checkIn || !checkOut) {
      toast.error("Please select your check-in and check-out dates");
      return;
    }
    toast.success("Booking initiated! Redirecting to payment...");
    // Simulate booking process
    setTimeout(() => {
      navigate("/booking/confirmation", { state: { campsite, checkIn, checkOut, guests } });
    }, 1500);
  };

  const pricing = calculateTotal();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{campsite.name}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                  <span className="font-medium">{campsite.rating}</span>
                  <span className="ml-1">({campsite.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  {campsite.location}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`h-4 w-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8 rounded-2xl overflow-hidden">
          <div className="lg:col-span-2">
            <img
              src={campsite.image}
              alt={campsite.name}
              className="w-full h-64 lg:h-96 object-cover"
            />
          </div>
          <div className="lg:col-span-2 grid grid-cols-2 gap-4">
            {campsite.images.slice(1, 5).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${campsite.name} ${index + 2}`}
                className="w-full h-32 lg:h-44 object-cover"
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About this campsite</h2>
                  <p className="text-muted-foreground leading-relaxed">{campsite.description}</p>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Camping Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {campsite.campingTypes.map((type) => (
                      <Badge key={type} variant="secondary">{type}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Hosted by {campsite.host.name}</h3>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback>{campsite.host.avatar}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{campsite.host.name}</p>
                      <p className="text-sm text-muted-foreground">Joined {campsite.host.joinedDate}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="amenities" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">What this place offers</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campsite.amenities.map((amenity) => (
                    <div key={amenity} className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex items-center">
                    <Star className="h-6 w-6 fill-yellow-400 text-yellow-400 mr-2" />
                    <span className="text-2xl font-bold">{campsite.rating}</span>
                  </div>
                  <span className="text-muted-foreground">
                    {campsite.reviewCount} reviews
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Sample reviews */}
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>RK</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Rahul Kumar</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-xs text-muted-foreground ml-2">March 2024</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Amazing experience! The location is breathtaking and the amenities were perfect for our family trip. Host was very responsive and helpful.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="location" className="space-y-4">
                <h2 className="text-xl font-semibold mb-4">Where you'll be</h2>
                <div className="bg-muted/20 h-64 rounded-lg flex items-center justify-center">
                  <p className="text-muted-foreground">Interactive map will be displayed here</p>
                </div>
                <p className="text-muted-foreground">{campsite.location}</p>
              </TabsContent>
            </Tabs>
          </div>

          {/* Booking Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-2xl font-bold">₹{campsite.price.toLocaleString()}</span>
                  <span className="text-muted-foreground">per night</span>
                </div>

                <div className="space-y-4 mb-6">
                  {/* Check-in/out */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-sm font-medium">Check-in</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkIn && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "MMM dd") : "Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div>
                      <label className="text-sm font-medium">Check-out</label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !checkOut && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "MMM dd") : "Date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            initialFocus
                            disabled={(date) => checkIn ? date <= checkIn : false}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  {/* Guests */}
                  <div>
                    <label className="text-sm font-medium mb-1 block">Guests</label>
                    <Select value={guests} onValueChange={setGuests}>
                      <SelectTrigger>
                        <Users className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: campsite.maxGuests }, (_, i) => i + 1).map((num) => (
                          <SelectItem key={num} value={num.toString()}>
                            {num} {num === 1 ? "Guest" : "Guests"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleBooking} className="w-full mb-4">
                  Reserve Now
                </Button>

                <p className="text-center text-sm text-muted-foreground mb-4">
                  You won't be charged yet
                </p>

                {checkIn && checkOut && (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>₹{campsite.price.toLocaleString()} x {pricing.days} nights</span>
                      <span>₹{pricing.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Service fee</span>
                      <span>₹{pricing.serviceFee.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes</span>
                      <span>₹{pricing.tax.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>₹{pricing.total.toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampsiteDetail;