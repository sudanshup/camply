import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Users, Heart } from "lucide-react";
import { useState } from "react";
import { Campsite } from "@/data/campsites";

interface CampsiteCardProps {
  campsite: Campsite;
}

const CampsiteCard = ({ campsite }: CampsiteCardProps) => {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border border-border">
      <div className="relative">
        <img
          src={campsite.image}
          alt={campsite.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className="absolute top-3 right-3 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
        >
          <Heart 
            className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : 'text-muted-foreground'}`} 
          />
        </button>
        <div className="absolute bottom-3 left-3">
          <Badge variant="secondary" className="bg-background/90">
            {campsite.campingTypes[0]}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
              {campsite.name}
            </h3>
            <div className="flex items-center text-muted-foreground text-sm mt-1">
              <MapPin className="h-4 w-4 mr-1" />
              {campsite.location}
            </div>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            <span className="text-sm font-medium">{campsite.rating}</span>
            <span className="text-sm text-muted-foreground ml-1">({campsite.reviewCount})</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {campsite.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {campsite.amenities.slice(0, 3).map((amenity) => (
            <Badge key={amenity} variant="outline" className="text-xs">
              {amenity}
            </Badge>
          ))}
          {campsite.amenities.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{campsite.amenities.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-1" />
            Up to {campsite.maxGuests} guests
          </div>
          <div className="text-right">
            <div className="font-bold text-lg text-foreground">
              ₹{campsite.price.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>

        <Link to={`/campsite/${campsite.id}`}>
          <Button className="w-full mt-4 bg-primary hover:bg-primary-hover">
            View Details
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CampsiteCard;