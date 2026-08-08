import React, { createContext, useContext, useState, useEffect } from "react";
import { INITIAL_EXAMS } from "../data/exams";
import { INITIAL_NOTES } from "../data/notes";
import { INITIAL_ADVERTISEMENTS } from "../data/advertisements";
import { INITIAL_USERS } from "../data/users";
import { INITIAL_ORDERS } from "../data/orders";

const DataContext = createContext();

export function DataProvider({ children }) {
  // 1. Exams State
  const [exams, setExams] = useState(() => {
    const saved = localStorage.getItem("examvault_exams");
    return saved ? JSON.parse(saved) : INITIAL_EXAMS;
  });

  // 2. Notes State
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("examvault_notes");
    return saved ? JSON.parse(saved) : INITIAL_NOTES;
  });

  // 3. Advertisements State
  const [advertisements, setAdvertisements] = useState(() => {
    const saved = localStorage.getItem("examvault_ads");
    return saved ? JSON.parse(saved) : INITIAL_ADVERTISEMENTS;
  });

  // 4. Users State
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("examvault_users");
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  // 5. Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("examvault_orders");
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  // 6. User Purchases (Array of purchased noteIds for current user)
  const [purchasedNoteIds, setPurchasedNoteIds] = useState(() => {
    const saved = localStorage.getItem("examvault_purchases");
    return saved ? JSON.parse(saved) : ["mpsc-gs-complete", "upsc-indian-polity"];
  });

  // Save to LocalStorage on change
  useEffect(() => {
    localStorage.setItem("examvault_exams", JSON.stringify(exams));
  }, [exams]);

  useEffect(() => {
    localStorage.setItem("examvault_notes", JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem("examvault_ads", JSON.stringify(advertisements));
  }, [advertisements]);

  useEffect(() => {
    localStorage.setItem("examvault_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("examvault_orders", JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem("examvault_purchases", JSON.stringify(purchasedNoteIds));
  }, [purchasedNoteIds]);

  // Actions for Notes
  const addNote = (newNote) => {
    const noteWithId = {
      ...newNote,
      id: newNote.id || `note-${Date.now()}`,
      rating: 4.8,
      totalReviews: 1,
      isBestseller: false
    };
    setNotes((prev) => [noteWithId, ...prev]);
    return noteWithId;
  };

  const editNote = (updatedNote) => {
    setNotes((prev) => prev.map((n) => (n.id === updatedNote.id ? { ...n, ...updatedNote } : n)));
  };

  const deleteNote = (noteId) => {
    setNotes((prev) => prev.filter((n) => n.id !== noteId));
  };

  // Actions for Categories / Exams
  const addCategory = (newCat) => {
    const catWithId = {
      ...newCat,
      id: newCat.id || `cat-${Date.now()}`,
      notesCount: 0,
      popularity: 85
    };
    setExams((prev) => [...prev, catWithId]);
  };

  const editCategory = (updatedCat) => {
    setExams((prev) => prev.map((c) => (c.id === updatedCat.id ? { ...c, ...updatedCat } : c)));
  };

  const deleteCategory = (catId) => {
    setExams((prev) => prev.filter((c) => c.id !== catId));
  };

  // Actions for Advertisements
  const addAdvertisement = (newAd) => {
    const adWithId = {
      ...newAd,
      id: `ad-${Date.now()}`,
      impressions: 0,
      clicks: 0,
      ctr: "0.00%"
    };
    setAdvertisements((prev) => [adWithId, ...prev]);
  };

  const editAdvertisement = (updatedAd) => {
    setAdvertisements((prev) => prev.map((a) => (a.id === updatedAd.id ? { ...a, ...updatedAd } : a)));
  };

  const toggleAdStatus = (adId) => {
    setAdvertisements((prev) =>
      prev.map((a) => {
        if (a.id === adId) {
          const nextStatus = a.status === "Active" ? "Paused" : "Active";
          return { ...a, status: nextStatus };
        }
        return a;
      })
    );
  };

  const deleteAdvertisement = (adId) => {
    setAdvertisements((prev) => prev.filter((a) => a.id !== adId));
  };

  // Mock Purchase Processing
  const processPurchase = ({ note, customerName, customerEmail, customerMobile, paymentMethod }) => {
    const orderId = `EV-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(
      100 + Math.random() * 900
    )}`;

    const newOrder = {
      id: orderId,
      customerName: customerName || "Priya Sharma",
      customerEmail: customerEmail || "priya.sharma@example.com",
      customerMobile: customerMobile || "+91 98230 11234",
      noteId: note.id,
      noteTitle: note.title,
      amount: note.price,
      originalAmount: note.originalPrice || note.price * 1.5,
      discount: (note.originalPrice || note.price * 1.5) - note.price,
      paymentMethod: paymentMethod || "UPI",
      status: "Paid",
      transactionId: `TXN_${paymentMethod.toUpperCase().slice(0, 3)}_${Math.floor(100000000 + Math.random() * 900000000)}`,
      date: new Date().toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" })
    };

    // 1. Add order
    setOrders((prev) => [newOrder, ...prev]);

    // 2. Unlock download access
    setPurchasedNoteIds((prev) => (prev.includes(note.id) ? prev : [...prev, note.id]));

    return newOrder;
  };

  const isPurchased = (noteId) => purchasedNoteIds.includes(noteId);

  return (
    <DataContext.Provider
      value={{
        exams,
        notes,
        advertisements,
        users,
        orders,
        purchasedNoteIds,
        addNote,
        editNote,
        deleteNote,
        addCategory,
        editCategory,
        deleteCategory,
        addAdvertisement,
        editAdvertisement,
        toggleAdStatus,
        deleteAdvertisement,
        processPurchase,
        isPurchased
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
