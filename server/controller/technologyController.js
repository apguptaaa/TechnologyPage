// const cloudinary = require("cloudinary").v2;
// const TechnologyModel = require("../modal/techno");

// class TechnologiesController {
//   // Insert Technology
//   static async technoinsert(req, res) {
//     try {
//       const { title, description } = req.body;

//       // Check for image file
//       if (!req.files || !req.files.image) {
//         return res.status(400).json({ message: "Image is required" });
//       }

//       // Upload image to Cloudinary
//       const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
//         folder: "technologies",
//       });

//       // Save to DB
//       const technology = await TechnologyModel.create({
//         title,
//         description,
//         image: result.secure_url,
//       });

//       return res.status(201).json({
//         message: "Technology inserted successfully",
//         data: technology,
//       });
//     } catch (error) {
//       console.error("Error in technoinsert:", error);
//       return res.status(500).json({ message: "Server Error", error: error.message });
//     }
//   }
// }

// module.exports = TechnologiesController;



const cloudinary = require("cloudinary").v2;
const TechnologyModel = require("../modal/techno");

class TechnologiesController {
  static async technoinsert(req, res) {
    try {
      const { title, description } = req.body;

      if (!req.files || !req.files.image) {
        return res.status(400).json({ message: "Image is required" });
      }

      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: "technologies",
      });

      const technology = await TechnologyModel.create({
        title,
        description,
        image: result.secure_url,
      });

      res.status(201).json(technology);
    } catch (error) {
      console.error("❌ Error in technoinsert:", error);
      res.status(500).json({ message: "Server Error" });
    }
  }



//   // Display All Technologies
// static async technodisplay(req, res) {
//   try {
//     const technologies = await TechnologyModel.find().sort({ _id: -1 }); // latest first
//     res.status(200).json({ technologies });
//   } catch (error) {
//     console.error("❌ Error in technodisplay:", error);
//     res.status(500).json({ message: "Server Error" });
//   }
// }

// GET all technologies
static async technodisplay(req, res) {
  try {
    const data = await TechnologyModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("❌ Error in technodisplay:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


}

module.exports = TechnologiesController;
