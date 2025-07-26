import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Tent, Mountain, Waves, TreePine } from "lucide-react";
import Navbar from "@/components/Navbar";
import SearchForm from "@/components/SearchForm";
import CampsiteCard from "@/components/CampsiteCard";
import { campsites } from "@/data/campsites";
import heroImage from "@/assets/hero-camping.jpg";

const Index = () => {
  const featuredCampsites = campsites.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: `url(${heroImage})`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40" />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Discover India's Best
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Camping Experiences
            </span>
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            From Himalayan peaks to desert dunes, find your perfect camping adventure across India's diverse landscapes.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Camp Your Way Across India
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're seeking adventure in the mountains, tranquility by the water, or cultural immersion in historic regions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mountain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Mountain Adventures</h3>
                <p className="text-muted-foreground">
                  Experience the Himalayas and Western Ghats with breathtaking views and fresh mountain air.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Waves className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Coastal & Backwaters</h3>
                <p className="text-muted-foreground">
                  Discover beach camping in Goa and unique floating camps in Kerala's backwaters.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border border-border hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-camping-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TreePine className="h-8 w-8 text-camping-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Desert & Wildlife</h3>
                <p className="text-muted-foreground">
                  Camp under starry skies in Rajasthan's deserts or explore wildlife sanctuaries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Campsites */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Featured Campsites
              </h2>
              <p className="text-muted-foreground">
                Hand-picked exceptional camping experiences
              </p>
            </div>
            <Link to="/search">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredCampsites.map((campsite) => (
              <CampsiteCard key={campsite.id} campsite={campsite} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of campers who have discovered incredible experiences across India. 
            Book your perfect camping spot today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/search">
              <Button size="lg" variant="secondary" className="min-w-[200px]">
                <Tent className="h-5 w-5 mr-2" />
                Start Exploring
              </Button>
            </Link>
            <Link to="/host">
              <Button size="lg" variant="outline" className="min-w-[200px] border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                Become a Host
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <MapPin className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">CAMPLY</span>
              </div>
              <p className="text-background/70">
                Discover and book unique camping experiences across India.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/search" className="hover:text-background transition-colors">All Campsites</Link></li>
                <li><Link to="/search?type=mountain" className="hover:text-background transition-colors">Mountain Camping</Link></li>
                <li><Link to="/search?type=beach" className="hover:text-background transition-colors">Beach Camping</Link></li>
                <li><Link to="/search?type=desert" className="hover:text-background transition-colors">Desert Camping</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/about" className="hover:text-background transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-background transition-colors">Contact</Link></li>
                <li><Link to="/help" className="hover:text-background transition-colors">Help Center</Link></li>
                <li><Link to="/careers" className="hover:text-background transition-colors">Careers</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Host</h4>
              <ul className="space-y-2 text-background/70">
                <li><Link to="/host" className="hover:text-background transition-colors">Become a Host</Link></li>
                <li><Link to="/host/resources" className="hover:text-background transition-colors">Host Resources</Link></li>
                <li><Link to="/host/community" className="hover:text-background transition-colors">Host Community</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/70">
            <p>&copy; 2024 Camply. All rights reserved. Made with ❤️ for adventure seekers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
