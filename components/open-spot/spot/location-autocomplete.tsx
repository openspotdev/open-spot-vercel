"use client";

import { useState } from "react";
import GooglePlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-google-places-autocomplete";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// import { GoogleApiSpot } from "@/app/definitions/spots";
// import { Cloud, Menu, X, Activity, Bike, Waves } from "lucide-react";
// import { Switch } from "@/components/ui/switch";
// import { Label } from "@/components/ui/label";

// import { landingTexts } from "@/app/const/languages-texts";
export default function LocationAutocomplete() {
  const [newSpot, setNewSpot] = useState([]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSpot) return;
    const body = await handleAddSpot();
    const strJson = localStorage.getItem("spots");
    if (strJson) {
      const list = JSON.parse(strJson);
      localStorage.setItem("spots", JSON.stringify([...list, body]));
    } else {
      localStorage.setItem("spots", JSON.stringify([body]));
    }
  };

  const handleAddSpot = async () => {
    const spot = await geocodeByAddress(newSpot.label).then(async (results) => {
      const { lat, lng } = await getLatLng(results[0]);
      const jsonSpot = {
        guid: newSpot.value.place_id,
        name: newSpot.value.structured_formatting.main_text,
        location: {
          latitude: lat,
          longitude: lng,
        },
        country:
          results[0].address_components[
            results[0].address_components.length - 2
          ].long_name,
        state:
          results[0].address_components[
            results[0].address_components.length - 3
          ].long_name,
        city: results[0].address_components[
          results[0].address_components.length - 4
        ].long_name,
        selected: false,
        type: "sport",
      };
      return jsonSpot;
    });
    return spot;
  };

  return (
    <div className="">
      <GooglePlacesAutocomplete
        minLengthAutocomplete={3}
        apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY}
        selectProps={{
          placeholder: "",
          isClearable: true,
          escapeClearsValue: true,
          value: newSpot,
          onChange: (spot) => setNewSpot(spot),
          styles: {
            input: (provided) => ({
              ...provided,
              fontSize: "12px",
              color: "#29272C",
              height: "30px",
            }),
            option: (provided) => ({
              ...provided,
              fontSize: "12px",
              color: "#29272C",
              height: "auto",
            }),
            singleValue: (provided) => ({
              ...provided,
              fontSize: "12px",
              color: "1EA2E4",
            }),
          },
        }}
        apiOptions={{
          language: "en",
          region: "en",
        }}
      />
      <form id="spot-form" onSubmit={handleSave} className="mb-6 flex gap-2">
        <Input
          type="text"
          placeholder="Enter spot name"
          onChange={() => console.log("change")}
          value={newSpot}
          className="flex-grow hidden"
        />
      </form>
      <Button type="submit" form="spot-form">
        {"Save"}
      </Button>
    </div>
  );
}
