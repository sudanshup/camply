import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, MapIcon, List, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import CampsiteCard from "@/components/CampsiteCard";
import { campsites, campingTypes, amenities } from "@/data/campsites";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState("price-low");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  // Get search parameters
  const destination = searchParams.get("destination") || "";
  const checkin = searchParams.get("checkin") || "";
  const checkout = searchParams.get("checkout") || "";
  const guests = searchParams.get("guests") || "";

  // Filter and sort campsites
  const filteredCampsites = useMemo(() => {
    let filtered = campsites;

    // Filter by destination
    if (destination) {
      filtered = filtered.filter(camp => 
        camp.state.toLowerCase().includes(destination.toLowerCase()) ||
        camp.location.toLowerCase().includes(destination.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(camp => 
      camp.price >= priceRange[0] && camp.price <= priceRange[1]
    );

    // Filter by camping types
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(camp =>
        camp.campingTypes.some(type => selectedTypes.includes(type))
      );
    }

    // Filter by amenities
    if (selectedAmenities.length > 0) {
      filtered = filtered.filter(camp =>
        selectedAmenities.every(amenity => camp.amenities.includes(amenity))
      );
    }

    // Sort campsites
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "reviews":
        filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return filtered;
  }, [destination, priceRange, selectedTypes, selectedAmenities, sortBy]);

  const handleTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, type]);
    } else {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    }
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    if (checked) {
      setSelectedAmenities([...selectedAmenities, amenity]);
    } else {
      setSelectedAmenities(selectedAmenities.filter(a => a !== amenity));
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Search Header */}
      <div className="border-b border-border py-4">
        <div className="container mx-auto px-4">
          <SearchForm variant="compact" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {destination ? `Campsites in ${destination}` : "All Campsites"}
            </h1>
            <p className="text-muted-foreground">
              {filteredCampsites.length} result{filteredCampsites.length !== 1 ? 's' : ''}
              {checkin && checkout && ` • ${checkin} - ${checkout}`}
              {guests && ` • ${guests} guests`}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>

            {/* Filters Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>

            {/* View Mode */}
            <div className="flex border border-border rounded-lg">
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-r-none"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("map")}
                className="rounded-l-none"
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          {showFilters && (
            <Card className="w-80 h-fit">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Filters</h3>

                {/* Price Range */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range (per night)</h4>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    min={0}
                    step={100}
                    className="mb-2"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Camping Types */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Camping Type</h4>
                  <div className="space-y-2">
                    {campingTypes.slice(0, 6).map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={type}
                          checked={selectedTypes.includes(type)}
                          onCheckedChange={(checked) => 
                            handleTypeChange(type, checked as boolean)
                          }
                        />
                        <label htmlFor={type} className="text-sm cursor-pointer">
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Amenities</h4>
                  <div className="space-y-2">
                    {amenities.slice(0, 8).map((amenity) => (
                      <div key={amenity} className="flex items-center space-x-2">
                        <Checkbox
                          id={amenity}
                          checked={selectedAmenities.includes(amenity)}
                          onCheckedChange={(checked) => 
                            handleAmenityChange(amenity, checked as boolean)
                          }
                        />
                        <label htmlFor={amenity} className="text-sm cursor-pointer">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setPriceRange([0, 5000]);
                    setSelectedTypes([]);
                    setSelectedAmenities([]);
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {viewMode === "list" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCampsites.map((campsite) => (
                  <CampsiteCard key={campsite.id} campsite={campsite} />
                ))}
              </div>
            ) : (
              <Card className="h-[600px] bg-muted/20">
                <CardContent className="p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <MapIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Interactive Map Coming Soon</h3>
                    <p className="text-muted-foreground">
                      We're working on an interactive map to help you visualize campsite locations.
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {filteredCampsites.length === 0 && (
              <Card className="h-64">
                <CardContent className="p-6 h-full flex items-center justify-center">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold mb-2">No campsites found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your search criteria or filters.
                    </p>
                    <Button
                      onClick={() => {
                        setPriceRange([0, 5000]);
                        setSelectedTypes([]);
                        setSelectedAmenities([]);
                      }}
                    >
                      Clear Filters
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;