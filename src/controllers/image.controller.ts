import { Request, Response } from "express";
import { db } from "../config";
import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  arrayUnion,
} from "firebase/firestore";
import { getFormattedDateAndTime } from "../utilities/defaults";

const imageCollection = collection(db, "images");

interface Image {
  id: string;
  image: string;
  createdAt: string;
}

export const getAllImages = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const imagesQuery = query(imageCollection, orderBy("createdAt", "desc"));
    const images = await getDocs(imagesQuery);
    if (images.empty) {
      res.status(404).json({ message: "No images found" });
    } else {
      const imagesData = images.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Image;
      });
      res.status(200).json(imagesData);
    }
  } catch (error) {
    console.log(error);
  }
};

export const getImageById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const image = await getDoc(doc(imageCollection, id));
    if (!image.exists()) {
      res.status(404).json({ message: "No images found" });
    } else {
      res.status(200).json({ id: image.id, ...image.data() });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { image } = req.body;
    const newImage = { image, createdAt: getFormattedDateAndTime() };
    await addDoc(imageCollection, newImage).then(() => {
      res.status(201).json({ message: "Image created successfully" });
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { image } = req.body;
    const imageRef = doc(imageCollection, id);
    const imageDoc = await getDoc(imageRef);
    if (imageDoc.exists()) {
      await updateDoc(imageRef, { image }).then(() => {
        res.status(200).json({ message: "Image updated successfully" });
      });
    } else {
      res.status(404).json({ message: "No images found" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteImage = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const imageRef = doc(imageCollection, id);
    const imageDoc = await getDoc(imageRef);
    if (!imageDoc.exists()) {
      res.status(404).json({ message: "No images found" });
    } else {
      await deleteDoc(imageRef).then(() => {
        res.status(200).json({ message: "Image deleted successfully" });
      });
    }
  } catch (error) {
    console.log(error);
  }
};
