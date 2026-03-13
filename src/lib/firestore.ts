import { collection, addDoc, getDocs, query, orderBy, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

// ─── B2B Inquiry ────────────────────────────────────────────────────────────

export interface InquiryData {
    name: string;
    email: string;
    company: string;
    message: string;
}

export async function saveInquiry(data: InquiryData): Promise<void> {
    await addDoc(collection(db, "b2b_inquiries"), {
        ...data,
        createdAt: serverTimestamp(),
    });
}

export async function getInquiries() {
    const q = query(collection(db, "b2b_inquiries"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// ─── Orders (Cart Checkout) ──────────────────────────────────────────────────

export interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export async function saveOrder(
    items: OrderItem[],
    totalPrice: number
): Promise<void> {
    await addDoc(collection(db, "orders"), {
        items,
        totalPrice,
        status: "pending",
        createdAt: serverTimestamp(),
    });
}

export async function updateOrderStatus(orderId: string, newStatus: string): Promise<void> {
    const { doc, updateDoc } = await import("firebase/firestore");
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
        status: newStatus
    });
}

export async function getOrders() {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
