const mongoose = require("mongoose");
const dotenv = require("dotenv");
const JobRequest = require("./models/JobRequest");
const connectDB = require("./config/db");

dotenv.config();

const sampleJobs = [
  {
    title: "Need a plumber for a leaking kitchen tap",
    description:
      "The kitchen tap has been dripping constantly for the past week. Water pressure seems fine but the tap won't fully shut off. Need a plumber to replace the washer or the entire tap if necessary.",
    category: "Plumbing",
    location: "Glasgow, West End",
    contactName: "Sarah Mitchell",
    contactEmail: "sarah.mitchell@email.com",
    status: "Open",
  },
  {
    title: "Rewire living room sockets",
    description:
      "Two double sockets in the living room have stopped working. The rest of the house is fine. Need an electrician to check the wiring and fix or replace the sockets.",
    category: "Electrical",
    location: "Edinburgh, Leith",
    contactName: "James Campbell",
    contactEmail: "james.campbell@email.com",
    status: "Open",
  },
  {
    title: "Repair broken cabinet door hinges",
    description:
      "The lower cabinet door in the kitchen has a broken hinge and won't close properly. Needs hinge replacement and possible realignment. Solid wood doors.",
    category: "Carpentry",
    location: "Glasgow, Southside",
    contactName: "Emily Thomson",
    contactEmail: "emily.thomson@email.com",
    status: "In Progress",
  },
  {
    title: "Repaint hallway and stairwell",
    description:
      "The hallway and stairwell walls have scuff marks and peeling paint from a recent move. Need a fresh coat of paint — colour to be agreed on site, leaning towards warm white.",
    category: "Painting",
    location: "Aberdeen, City Centre",
    contactName: "David Wilson",
    contactEmail: "david.wilson@email.com",
    status: "Open",
  },
  {
    title: "Fit new skirting boards in bedroom",
    description:
      "Old skirting boards were removed during renovation. Need new ogee-profile skirting boards measured, cut and fitted in the master bedroom. Approx 14 linear metres.",
    category: "Joinery",
    location: "Glasgow, Finnieston",
    contactName: "Laura McKenzie",
    contactEmail: "laura.mckenzie@email.com",
    status: "Open",
  },
  {
    title: "Deep clean flat after tenancy",
    description:
      "Previous tenant has moved out of a 2-bed flat. Need a thorough deep clean including carpets, kitchen appliances, bathrooms, and window tracks before new tenant moves in.",
    category: "Cleaning",
    location: "Dundee, West End",
    contactName: "Ross Stewart",
    contactEmail: "ross.stewart@email.com",
    status: "Closed",
  },
  {
    title: "Garden tidy-up and hedge trimming",
    description:
      "The front and back gardens are overgrown after winter. Hedges need trimming, lawn needs cutting, and general tidy-up of flower beds. Small terraced house garden.",
    category: "Landscaping",
    location: "Glasgow, Kelvindale",
    contactName: "Fiona Robertson",
    contactEmail: "fiona.robertson@email.com",
    status: "Open",
  },
  {
    title: "Boiler servicing and radiator check",
    description:
      "Annual boiler service is overdue. One radiator in the spare room is cold at the top — may need bleeding or the valve replaced. Worcester Bosch combi boiler, about 5 years old.",
    category: "HVAC",
    location: "Edinburgh, Morningside",
    contactName: "Gregor Paterson",
    contactEmail: "gregor.paterson@email.com",
    status: "In Progress",
  },
];

const seedDB = async () => {
  try {
    await connectDB();
    await JobRequest.deleteMany({});
    console.log("Cleared existing jobs");

    const created = await JobRequest.insertMany(sampleJobs);
    console.log(`Seeded ${created.length} sample jobs`);

    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
