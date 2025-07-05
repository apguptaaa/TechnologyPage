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

static async technoview(req, res) {
  try {
    const id = req.params.id;
    const tech = await TechnologyModel.findById(id);

    if (!tech) {
      return res.status(404).json({ message: "Technology not found" });
    }

    res.status(200).json({ success: true, data: tech });
  } catch (error) {
    console.error("❌ Error in technoview:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


//update technology
static async technoupdate(req, res) {
  try {
    const id = req.params.id;
    const { title, description } = req.body;

    const updatedData = { title, description };

    // Optional: update image if provided
    if (req.files && req.files.image) {
      const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        folder: "technologies",
      });
      updatedData.image = result.secure_url;
    }

    const updatedTech = await TechnologyModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!updatedTech) {
      return res.status(404).json({ message: "Technology not found" });
    }

    res.status(200).json({ success: true, data: updatedTech });
  } catch (error) {
    console.error("❌ Error in technoupdate:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}

// Delete technology
static async technodelete(req, res) {
  try {
    const id = req.params.id;
    const tech = await TechnologyModel.findByIdAndDelete(id);

    if (!tech) {
      return res.status(404).json({ message: "Technology not found" });
    }

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    console.error("❌ Error in technodelete:", error);
    res.status(500).json({ success: false, message: "Server Error" });
  }
}


}

module.exports = TechnologiesController;
