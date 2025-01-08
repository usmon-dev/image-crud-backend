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
import { log } from "console";
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
      res.status(404).send("No images found");
    } else {
      const imagesData = images.docs.map((doc) => {
        return { id: doc.id, ...doc.data() } as Image;
      });
      res.status(200).send(imagesData);
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
      res.status(404).send("Image not found");
    } else {
      res.status(200).send({ id: image.id, ...image.data() });
    }
  } catch (error) {
    console.log(error);
  }
};

export const addImage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { image } = req.body;
    const newImage = { image, createdAt: getFormattedDateAndTime };
    await addDoc(imageCollection, newImage);
    res.status(201).send("Image added successfully");
  } catch (error) {
    console.log(error);
  }
};
