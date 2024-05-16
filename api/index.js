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
const upload = multer({ dest: "uploads/" });

const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = "fsfsfsfsfs";

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: ["https://yachthaven-front.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Connexion à MongoDB
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Successfully connected to MongoDB."))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

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

  try {
    let userDoc = await Client.findOne({ email });
    if (!userDoc) {
      userDoc = await Prestataire.findOne({ email });
    }

    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
            role: userDoc.role,
          },
          jwtSecret,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json(userDoc);
          }
        );
      } else {
        res.status(422).json("pass not ok");
      }
    } else {
      res.status(404).json("not found");
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/profile", (req, res) => {
  const { token } = req.cookies;

  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;

      const { email } = userData;

      try {
        let user = await Client.findOne({ email });
        if (!user) {
          user = await Prestataire.findOne({ email });
        }

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
      } catch (error) {
        console.error("Error in fetching user:", error);
        res.status(500).json({ message: "Server error" });
      }
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
      categorie,
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
        categorie,
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
      categorie,
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
        categorie,
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
  const prestations = await Prestation.find();
  res.json(prestations);
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

app.put("/client/:id", upload.single("photo"), async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, prenom, numeroTel } = req.body;

    const updateData = {
      nom,
      email,
      prenom,
      numeroTel,
    };

    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const updatedClient = await Client.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedClient) {
      return res.status(404).json({ message: "Client not found" });
    }

    // Generate a new token with updated information
    const token = jwt.sign(
      {
        email: updatedClient.email,
        id: updatedClient._id,
      },
      jwtSecret,
      {}
    );

    res.cookie("token", token).json(updatedClient);
  } catch (error) {
    console.error("Error updating client:", error);
    res.status(500).json({ message: error.message });
  }
});

app.put("/prestataire/:id", upload.single("photo"), async (req, res) => {
  try {
    const { id } = req.params;
    const { nom, email, prenom, numeroTel, adresse } = req.body;

    const updateData = {
      nom,
      email,
      prenom,
      numeroTel,
      adresse,
    };

    if (req.file) {
      updateData.photo = req.file.filename;
    }

    const updatedPrestataire = await Prestataire.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );
    if (!updatedPrestataire) {
      return res.status(404).json({ message: "Prestataire not found" });
    }

    // Generate a new token with updated information
    const token = jwt.sign(
      {
        email: updatedPrestataire.email,
        id: updatedPrestataire._id,
      },
      jwtSecret,
      {}
    );

    res.cookie("token", token).json(updatedPrestataire);
  } catch (error) {
    console.error("Error updating prestataire:", error);
    res.status(500).json({ message: error.message });
  }
});

app.get("/booking/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Fetch the booking document first
    const booking = await Booking.findById(id).populate("prestation");
    if (!booking) {
      return res.status(404).send("Booking not found");
    }

    // Optionally, directly return the populated prestation details
    const prestation = booking.prestation;
    if (!prestation) {
      return res.status(404).send("Prestation not found for this booking");
    }
    res.json(prestation);
  } catch (err) {
    console.error("Error fetching booking details:", err);
    res.status(500).send(err.message);
  }
});

app.get("/prestations-by-booking/:bookingId", async (req, res) => {
  try {
    // Récupérer la réservation à partir de l'ID de réservation fourni
    const booking = await Booking.findById(req.params.bookingId).populate(
      "prestation"
    );

    // Vérifier si la réservation existe
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Récupérer l'ID du propriétaire (owner) de la prestation réservée
    const ownerId = booking.prestation.owner;

    // Trouver toutes les prestations ayant le même propriétaire (owner) sauf celle déjà réservée
    const prestations = await Prestation.find({
      owner: ownerId,
      _id: { $ne: booking.prestation._id },
    });

    // Vérifier si des prestations existent pour ce propriétaire
    if (!prestations || prestations.length === 0) {
      return res
        .status(404)
        .json({ message: "No prestations found for this owner" });
    }

    // Retourner les prestations trouvées
    res.json(prestations);
  } catch (error) {
    // Gérer les erreurs et retourner un message d'erreur au client
    console.error("Error fetching prestations by booking:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/upcoming-bookings/:prestataireId", async (req, res) => {
  try {
    const { prestataireId } = req.params;
    const today = new Date();

    // Récupérer les prestations appartenant au prestataire
    const prestations = await Prestation.find({ owner: prestataireId });

    if (prestations.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune prestation trouvée pour ce prestataire" });
    }

    // Extraire les IDs des prestations
    const prestationIds = prestations.map((p) => p._id);

    // Récupérer toutes les réservations futures pour les prestations du prestataire
    const upcomingBookings = await Booking.find({
      prestation: { $in: prestationIds },
      date: { $gte: today },
    }).populate("prestation");

    if (upcomingBookings.length === 0) {
      return res.status(404).json({
        message: "Aucune réservation à venir trouvée pour ce prestataire",
      });
    }

    res.json(upcomingBookings);
  } catch (error) {
    console.error("Error fetching upcoming bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/prestation/:prestationId", async (req, res) => {
  const { prestationId } = req.params;

  try {
    const prestation = await Prestation.findById(prestationId);

    if (!prestation) {
      return res.status(404).json({ message: "Prestation not found" });
    }

    res.json(prestation);
  } catch (error) {
    console.error("Error fetching prestation:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(4000);
