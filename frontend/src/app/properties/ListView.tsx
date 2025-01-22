// src/components/ListView.tsx
import PropertyCard from "../components/PropertyCard";
import { Property } from "@/types";

interface ListViewProps {
  properties: Property[];
}

const ListView: React.FC<ListViewProps> = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          images={property.images}
          title={property.title}
          location={property.location}
          price={property.price}
          description={property.description}
        />
      ))}
    </div>
  );
};

export default ListView;
