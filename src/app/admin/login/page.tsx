"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { Lock } from "lucide-react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await signInWithEmailAndPassword(auth, email, password);
            router.push("/admin");
        } catch (err: any) {
            console.error(err);
            setError("Login gagal. Periksa kembali email dan password.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[70vh] flex flex-col justify-center items-center">
            <div className="w-full max-w-md p-8 md:p-12 bg-white border border-black/10">
                <div className="flex flex-col items-center mb-12">
                    <div className="w-12 h-12 bg-black text-white flex items-center justify-center mb-6">
                        <Lock className="w-5 h-5" />
                    </div>
                    <h1 className="text-3xl font-heading font-bold uppercase tracking-tighter">Admin Login</h1>
                    <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/40 mt-2">Restricted Access</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/60 block">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black transition-colors outline-none text-sm font-light rounded-none"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase font-bold tracking-[0.4em] text-black/60 block">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-transparent border-b border-black/20 py-3 focus:border-black transition-colors outline-none text-sm font-light rounded-none"
                            required
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-[10px] uppercase tracking-widest">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full btn bg-black text-white hover:invert border border-black disabled:opacity-40 mt-8"
                    >
                        {loading ? "AUTHENTICATING..." : "LOGIN"}
                    </button>
                </form>
            </div>
        </div>
    );
}
