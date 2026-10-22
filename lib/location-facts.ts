export type CityFact = {
  population: string;
  landmark: string;
  neighbourhood: string;
  climate: string;
};

const CITY_FACTS: Record<string, CityFact> = {
  Calgary: {
    population: "1.3M in the metro",
    landmark: "Stephen Avenue walk",
    neighbourhood: "Beltline shops and industrial bays",
    climate: "Chinook swings can stress old storefront seals after hail.",
  },
  Winnipeg: {
    population: "750k metro",
    landmark: "The Exchange District",
    neighbourhood: "Portage Avenue retail and St. Boniface strips",
    climate: "Deep freezes make tempered glass failures more common in January.",
  },
  Edmonton: {
    population: "1M metro",
    landmark: "Whyte Avenue",
    neighbourhood: "Ice District towers and suburban power centres",
    climate: "Dry cold plus gravel spray chips exterior glazing on plazas.",
  },
  Ottawa: {
    population: "1M metro",
    landmark: "ByWard Market",
    neighbourhood: "Sparks Street corridors and Kanata business parks",
    climate: "Freeze-thaw cycles loosen door closers on aluminum entries.",
  },
  Montreal: {
    population: "4M metro",
    landmark: "Saint-Laurent Boulevard",
    neighbourhood: "Plateau boutiques and Griffintown lofts",
    climate: "Heavy snow loads on awnings sometimes snap adjacent glass.",
  },
  Laval: {
    population: "440k city",
    landmark: "Carrefour Laval retail ring",
    neighbourhood: "Chomedey plazas and industrial flex space",
    climate: "Lake-effect gusts hit corner units on exposed boulevards.",
  },
  Hamilton: {
    population: "770k metro",
    landmark: "James Street North",
    neighbourhood: "Ancaster power centres and waterfront conversions",
    climate: "Escarpment winds drive debris into low-rise storefronts.",
  },
  "St Catharines": {
    population: "140k city",
    landmark: "Port Dalhousie waterfront",
    neighbourhood: "Glendale retail and QEW corridor plazas",
    climate: "Lake Ontario squalls stress older single-pane units.",
  },
  Markham: {
    population: "340k city",
    landmark: "Pacific Mall district",
    neighbourhood: "Downtown Markham towers and Highway 7 retail",
    climate: "Busy parking lots mean more vehicle contact with curbside glass.",
  },
  "North York": {
    population: "Toronto district",
    landmark: "Yonge and Sheppard cluster",
    neighbourhood: "Finch corridor shops and office podiums",
    climate: "High-rise wind tunnels crack spandrel panels near transit hubs.",
  },
  "London, Ontario": {
    population: "430k metro",
    landmark: "Richmond Row",
    neighbourhood: "Masonville retail and industrial parks",
    climate: "Spring thunderstorms bring flying branches into corner windows.",
  },
  "Surrey, BC": {
    population: "620k city",
    landmark: "City Centre SkyTrain hub",
    neighbourhood: "Whalley storefronts and South Surrey strip malls",
    climate: "Coastal moisture swells door frames if sealant is aged.",
  },
  Mississauga: {
    population: "770k city",
    landmark: "Square One district",
    neighbourhood: "Airport corporate parks and Erin Mills plazas",
    climate: "Gusts off the lake hit east-facing curtain walls.",
  },
  Toronto: {
    population: "6.7M metro",
    landmark: "Queen Street West",
    neighbourhood: "Financial core towers and neighbourhood main streets",
    climate: "Dense sidewalks mean vandalism and impact calls spike overnight.",
  },
  Halifax: {
    population: "480k metro",
    landmark: "Barrington Street",
    neighbourhood: "Dartmouth crossings and Bayers Lake retail",
    climate: "Nor'easters hurl salt and grit into harbor-facing glass.",
  },
  Regina: {
    population: "260k metro",
    landmark: "Victoria Avenue",
    neighbourhood: "East end plazas and warehouse showrooms",
    climate: "Flat prairie wind drives gravel into low commercial glazing.",
  },
  Vancouver: {
    population: "2.6M metro",
    landmark: "Gastown heritage fronts",
    neighbourhood: "Broadway medical rows and Marine Drive shops",
    climate: "Seismic codes matter when replacing large tempered panels.",
  },
  Vaughan: {
    population: "330k city",
    landmark: "Vaughan Mills corridor",
    neighbourhood: "Maple main street and industrial flex near the 400",
    climate: "Truck traffic vibrates older aluminum storefront systems.",
  },
  Etobicoke: {
    population: "Toronto district",
    landmark: "The Kingsway village",
    neighbourhood: "Islington Village and Queensway plazas",
    climate: "Lake breezes corrode exterior door hardware faster near the water.",
  },
  Barrie: {
    population: "150k city",
    landmark: "Downtown Dunlop Street",
    neighbourhood: "Big Box strips on Mapleview and industrial bays",
    climate: "Snowplow spray chips glazing on plaza entries each winter.",
  },
  Woodbridge: {
    population: "Vaughan community",
    landmark: "Woodbridge Avenue shops",
    neighbourhood: "Highway 7 retail and auto row glass fronts",
    climate: "Loading bays see forklift strikes on door glass weekly.",
  },
  Thornhill: {
    population: "Markham/Vaughan border",
    landmark: "Yonge Street strip",
    neighbourhood: "Promenade-adjacent plazas and medical offices",
    climate: "Busy arterials mean more after-hours board-up requests.",
  },
  Abbotsford: {
    population: "160k city",
    landmark: "Historic downtown Montrose",
    neighbourhood: "Sumas Way retail and airport road warehouses",
    climate: "Valley fog plus frost cycles fog insulated glass units.",
  },
};

export function factsForPage(area: string, kind: "city"): CityFact | undefined {
  if (kind !== "city") return undefined;
  return CITY_FACTS[area];
}
