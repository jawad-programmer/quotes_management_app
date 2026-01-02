import { Request, Response } from "express";
import Quote from "../models/quotesModel";

export const addQuote = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);
    const quotes = await Quote.create(req.body);
    return res.status(201).json(quotes);
  } catch (error: any) {
    console.error("Mongoose Error:", error.message);
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getQuotes = async (req: Request, res: Response) => {
  const quotes = await Quote.find();
  return res.status(200).json(quotes);
};
// export const getQuoteById = (req: Request, res: Response) => {}
// export const updateQuotePut = (req: Request, res: Response) => {}
export const updateQuotePatch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // quote ID
    const { quote, author } = req.body;

    // Find the quote by ID and update only the provided fields
    const updatedQuote = await Quote.findByIdAndUpdate(
      id,
      { quote, author },
      { new: true } // return the updated document
    );

    if (!updatedQuote) {
      return res.status(404).json({ message: "Quote not found" });
    }

    return res.status(200).json(updatedQuote);
  } catch (error: any) {
    console.error("Update quote error:", error.message);
    return res.status(500).json({ message: "Failed to update quote" });
  }
};
export const deleteQuote = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Quote.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Quote not found" });
    }

    return res.status(200).json({ message: "Quote deleted successfully" });
  } catch (error: any) {
    console.error("Delete quote error:", error.message);
    return res.status(500).json({ message: "Failed to delete quote" });
  }
};
