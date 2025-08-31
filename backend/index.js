require("dotenv").config();

const express = require("express");
const app = express();
const flash = require("connect-flash");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const session = require("express-session");
const MongoStore = require("connect-mongo");

const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");
const { OrdersModel } = require("./model/OrdersModel");
const User = require("./schemas/user");

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

// Enable CORS for local development
app.use(cors({
 origin: [
  "trademate-frontend-jade.vercel.app",   //frontend url
  "trademate-dashboard.vercel.app",       //dashboard
], 
  credentials: true
}));

app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));


passport.serializeUser((user, done) => {
  done(null, user._id); // store user id in session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user); // attach full user to req.user
  } catch (err) {
    done(err);
  }
});


// Simplified local session (no `secure`, `sameSite`)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: uri,
    touchAfter: 24 * 3600
  }),
  cookie: {
    httpOnly: true,
    secure: false,       //  local = false
    sameSite: "lax",     //  works on localhost
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Local passport strategy
passport.use(User.createStrategy());


// Database connection
mongoose.connect(uri)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection failed:", err));


// Debug session info
app.use((req, res, next) => {
  console.log("Session:", req.session);
  console.log("Authenticated user:", req.user);
  next();
});

// ------------------- ROUTES ---------------------

//------signup-----
app.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const newUser = new User({ name, email });
    const registeredUser = await User.register(newUser, password);

    req.login(registeredUser, err => {
      if (err) return res.status(500).json({ message: "Signup succeeded, but login failed" });

      res.status(200).json({
        message: "Signup successful",
        redirectUrl: "trademate-dashboard.vercel.app", //  dashboard redirect
        user: { name: registeredUser.name, email: registeredUser.email }
      });
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Signup failed", error: err.message });
  }
});


//------Login------
app.post("/login", passport.authenticate("local"), (req, res) => {
  res.status(200).json({
    message: "Login successful",
    redirectUrl: "trademate-dashboard.vercel.app",
    user: { name: req.user.name, email: req.user.email }
  });
});


//----logout---------
app.post("/logout", (req, res) => {
  req.logout(err => {
    if (err) return res.status(500).json({ message: "Logout failed" });

     // Destroy session completely
    req.session.destroy(err => {
      if (err) return res.status(500).json({ message: "Session cleanup failed" });

       // Clear cookie in browser
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});


app.get("/currentUser", (req, res) => {
  if (req.isAuthenticated()) {
    const { name, email } = req.user;
    res.status(200).json({ user: { name, email } });
  } else {
    res.status(401).json({ message: "User not authenticated" });
  }
});

// ---- Sample trading routes (same as before) ----
app.get("/allHoldings", async (req, res) => {
  try {
    const holdings = await HoldingsModel.find({});
    res.status(200).json(holdings);
  } catch (err) {
    console.error("Error fetching holdings:", err.message);
    res.status(500).json({ message: "Error fetching holdings", error: err });
  }
});

app.get("/allPositions", async (req, res) => {
  try {
    const positions = await PositionsModel.find({});
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json({ message: "Error fetching positions", error: err });
  }
});

app.post("/newOrder", async (req, res) => {
  try {
    const { name, qty, price, mode } = req.body;

    const newOrder = new OrdersModel({ name, qty, price, action: mode, date: new Date() });
    await newOrder.save();

    const holding = await HoldingsModel.findOne({ name });
    if (mode === "BUY") {
      if (holding) {
        const totalQty = holding.qty + qty;
        holding.avg = (holding.avg * holding.qty + price * qty) / totalQty;
        holding.qty = totalQty;
        await holding.save();
      } else {
        await new HoldingsModel({ name, qty, avg: price }).save();
      }
    } else if (mode === "SELL" && holding) {
      holding.qty -= qty;
      holding.qty <= 0 ? await HoldingsModel.deleteOne({ name }) : await holding.save();
    }

    res.status(200).json({ message: "Order placed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err });
  }
});

app.get("/orders", async (req, res) => {
  try {
    const orders = await OrdersModel.find().sort({ date: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders", error: err });
  }
});

app.get("/api/summary", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  res.json({
    username: req.user.name,
    marginAvailable: 3.74,
    marginsUsed: 0,
    openingBalance: 3.74,
    holdingsCount: 13,
    profitLoss: 1.55,
    profitPercentage: 5.2,
    currentValue: 31.43,
    investment: 29.88
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});