import { Router } from "express";
import {
  addImage,
  deleteImage,
  getAllImages,
  getImageById,
  updateImage,
} from "../controllers/image.controller";

const router = Router();

router.get("/", getAllImages);
router.get("/:id", getImageById);
router.post("/", addImage);
router.put("/:id", updateImage);
router.delete("/:id", deleteImage);

export default router;