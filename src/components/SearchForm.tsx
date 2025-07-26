import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, CalendarIcon, Users, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { indianStates } from "@/data/campsites";

interface SearchFormProps {
  variant?: "hero" | "compact";
}

const SearchForm = ({ variant = "hero" }: SearchFormProps) => {
  const navigate = useNavigate();
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState("2");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (destination) params.set("destination", destination);
    if (checkIn) params.set("checkin", format(checkIn, "yyyy-MM-dd"));
    if (checkOut) params.set("checkout", format(checkOut, "yyyy-MM-dd"));
    if (guests) params.set("guests", guests);
    
    navigate(`/search?${params.toString()}`);
  };

  if (variant === "compact") {
    return (
      <div className="flex flex-col sm:flex-row gap-2 p-4 bg-background rounded-lg border border-border shadow-sm">
        <div className="flex-1">
          <Input
            placeholder="Where do you want to camp?"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border-0 bg-muted"
          />
        </div>
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary-hover">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-background/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Destination */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Destination</label>
          <Select value={destination} onValueChange={setDestination}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue placeholder="Select state" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {indianStates.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Check-in */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Check-in</label>
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
                {checkIn ? format(checkIn, "PPP") : "Pick a date"}
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

        {/* Check-out */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Check-out</label>
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
                {checkOut ? format(checkOut, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) => checkIn ? date < checkIn : false}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Guests</label>
          <Select value={guests} onValueChange={setGuests}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Guest" : "Guests"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button 
        onClick={handleSearch} 
        className="w-full mt-6 bg-primary hover:bg-primary-hover text-primary-foreground h-12 text-lg font-semibold"
      >
        <Search className="h-5 w-5 mr-2" />
        Search Campsites
      </Button>
    </div>
  );
};

export default SearchForm;