import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";

export default function NotFound() { return <main className="not-found"><p className="eyebrow">404 / Off menu</p><h1>Kitchen<br />closed.</h1><p>This plate is no longer being served.</p><Link href="/" className="button button-light">Back to SHEF <ArrowUpRight /></Link></main>; }
