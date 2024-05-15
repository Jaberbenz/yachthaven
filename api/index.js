const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Client = require("./models/Client.js");
const Prestataire = require("./models/Prestataire.js");
const Prestation = require("./models/Prestation.js");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");
require("dotenv").config();
const app = express();
const Booking = require("./models/Booking.js");
const mongoUrl = process.env.MONGODB_URL;

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fsfsfsfsfs";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Connexion à MongoDB
mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
}
app.get("/test", (req, res) => {
  res.json("test ok");
});

app.post("/registerClient", async (req, res) => {
  const { nom, prenom, email, password, numeroTel, role } = req.body;

  try {
    const clientDoc = await Client.create({
      nom,
      prenom,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      numeroTel,
      role,
    });

    res.json(clientDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/registerPrestataire", async (req, res) => {
  const {
    nom,
    prenom,
    email,
    password,
    numeroTel,
    adresse,
    numeroSiret,
    role,
  } = req.body;

  try {
    const prestataireDoc = await Prestataire.create({
      nom,
      prenom,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
      numeroTel,
      adresse,
      numeroSiret,
      role,
    });

    res.json(prestataireDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const clientDoc = await Client.findOne({ email });
  if (clientDoc) {
    const passOk = bcrypt.compareSync(password, clientDoc.password);
    if (passOk) {
      jwt.sign(
        {
          email: clientDoc.email,
          id: clientDoc._id,
        },
        jwtSecret,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(clientDoc);
        }
      );
    } else {
      res.status(422).res.json("pass not ok");
    }
  } else {
    res.json("not found");
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      const { nom, email, _id, role } = await Client.findById(userData.id);
      res.json({ nom, email, _id, role });
    });
  } else {
    res.json(null);
  }
});

app.post("/logout", (req, res) => {
  res.cookie("token", "").json(true);
});

app.post("/upload-by-link", async (req, res) => {
  const { link } = req.body;
  const newName = "photo" + Date.now() + ".jpg";
  await imageDownloader.image({
    url: link,
    dest: __dirname + "/uploads/" + newName,
  });
  res.json(newName);
});

const photosMiddleware = multer({ dest: "uploads" });
app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
});

app.post("/prestation", (req, res) => {
  console.log("Received for creation:", req.body); // Log des données reçues

  const { token } = req.cookies;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.log("JWT Error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const {
      titre,
      adresse,
      photos,
      description,
      perks,
      extraInfo,
      maxInvite,
      prix,
      disponibilities,
    } = req.body;

    console.log(`Creating Prestation for user ID: ${userData.id}`);

    try {
      const prestationDoc = await Prestation.create({
        owner: userData.id,
        titre,
        adresse,
        photos,
        description,
        perks,
        extraInfo,
        maxInvite,
        prix,
        disponibilities,
      });

      console.log("Prestation created successfully:", prestationDoc);
      res.json(prestationDoc);
    } catch (creationError) {
      console.error("Error creating prestation:", creationError);
      res
        .status(500)
        .json({ message: "Error creating prestation", error: creationError });
    }
  });
});

app.get("/prestations", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    const { id } = userData;
    res.json(await Prestation.find({ owner: id }));
  });
});

app.get("/prestation/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prestation = await Prestation.findById(id);
    if (!prestation) {
      return res.status(404).json({ message: "Prestation not found" });
    }
    res.json(prestation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/prestation", async (req, res) => {
  console.log("Received for update:", req.body); // Log initial des données reçues

  const { token } = req.cookies;
  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      console.log("JWT Error:", err);
      return res.status(401).json({ message: "Invalid token" });
    }

    const {
      id,
      titre,
      adresse,
      photos,
      description,
      perks,
      extraInfo,
      maxGuests,
      prix,
      disponibilities,
    } = req.body;

    try {
      const prestationDoc = await Prestation.findById(id);
      if (!prestationDoc) {
        console.log("Prestation not found:", id);
        return res.status(404).json({ message: "Prestation not found" });
      }

      if (userData.id !== prestationDoc.owner.toString()) {
        console.log("Unauthorized attempt to update by user:", userData.id);
        return res.status(403).json({ message: "Unauthorized" });
      }

      // Nettoyage des disponibilités pour supprimer les segments non désirés
      const cleanedDisponibilities = disponibilities.map(
        ({ jour, ouverture, fermeture }) => ({
          jour,
          ouverture,
          fermeture,
        })
      );

      // Mise à jour des champs de la prestation
      prestationDoc.set({
        titre,
        adresse,
        photos,
        description,
        perks,
        extraInfo,
        maxGuests,
        prix,
        disponibilities: cleanedDisponibilities,
      });

      await prestationDoc.save();
      console.log("Prestation updated successfully:", prestationDoc);
      res.json({ message: "Prestation updated successfully" });
    } catch (updateError) {
      console.error("Error updating prestation:", updateError);
      res
        .status(500)
        .json({ message: "Error updating prestation", error: updateError });
    }
  });
});

app.get("/allprestations", async (req, res) => {
  res.json(await Prestation.find());
});

app.post("/prestationReservation", async (req, res) => {
  const event = Prestation(req.body);
  await event.save();
  res.send("ok");
});

app.get("/prestationReservation", async (req, res) => {
  const events = await Prestation.find({
    start: { $gte: new Date(req.query.start) },
    end: { $lte: new Date(req.query.end) },
  });
  res.send(events);
});

app.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { prestation, date, startTime, endTime, guestName, numberOfGuests } =
    req.body;

  try {
    const newBooking = new Booking({
      prestation,
      user: userData.id,
      date: new Date(date),
      startTime,
      endTime,
      guestName,
      numberOfGuests,
    });

    await newBooking.save();
    res
      .status(201)
      .json({ message: "Booking successfully created!", booking: newBooking });
  } catch (error) {
    console.error("Error saving booking:", error);
    res
      .status(500)
      .json({ message: "Failed to create booking", error: error.message });
  }
});

app.get("/bookings", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const bookings = await Booking.find({ user: userData.id });
    res.json(bookings);
  } catch (error) {
    console.error("Error getting bookings:", error);
    res
      .status(500)
      .json({ message: "Failed to get bookings", error: error.message });
  }
});

app.get("/prestataire/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const prestataire = await Prestataire.findById(id);
    if (!prestataire) {
      console.log("Prestataire not found for ID:", id);
      return res.status(404).json({ message: "Prestataire not found" });
    }
    res.json(prestataire);
  } catch (error) {
    console.error("Error in fetching prestataire:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const client = await Client.findById(id);
    if (!client) {
      console.log("Client not found for ID:", id);
      return res.status(404).json({ message: "Client not found" });
    }
    res.json(client);
  } catch (error) {
    console.error("Error in fetching client:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.put("/client/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, prenom, numeroTel, role } = req.body;

    await Client.findByIdAndUpdate(
      { _id: id },
      {
        nom,
        email,
        prenom,
        numeroTel,
        role,
      }
    );

    res.status(200).json({ message: "Client updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(4000);
