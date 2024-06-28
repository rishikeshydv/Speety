interface Property {
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  beds: string;
  baths: string;
  houseType: string;
  transactionType: string;
  listedBy: string;
  listerEmail: string;
  brokerId: string;
  imageUrl: string[];
  videoUrl: string[];
  date: string;
  sqft: string;
  lotSize: string;
  yearBuilt: string;
  description: string;
  parkingSpace: string;
  estimatedMortgage: string;
  amenities: string;
}

interface CacheEntry {
    property: Property;
    expiry: number;
}

class PresentListingCache {
    private PLC: Map<string, CacheEntry>;
    private lifetime: number;

    constructor(lifetime: number) {
        this.PLC = new Map<string, CacheEntry>();
        this.lifetime = lifetime;
    }

    set(key: string, value: Property) {
        const expiry = Date.now() + this.lifetime;
        this.PLC.set(key, { property: value, expiry: expiry });
    }

    get(key: string):Property|null {
        const entry = this.PLC.get(key);
        if (!entry){
            return null;
        }
        if (Date.now() > entry.expiry) {
            this.PLC.delete(key);
            return null;
          }
        return entry.property;

    }
}

export default PresentListingCache;
